"use client";
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';
import { use } from 'react'; // Importing use to unwrap params

function EditForm({ params }) {
  const { user } = useUser();
  const router = useRouter();

  // States
  const [jsonForm, setJsonForm] = useState([]);
  const [record, setRecord] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  // Unwrap params using React.use
  const { formid } = use(params); // Use React.use() to unwrap params

  // Fetch Form Data on Mount
  useEffect(() => {
    if (user && formid) {
      GetFormData(formid); // Pass formid to the function
    }
  }, [user, formid]);

  const GetFormData = async (formid) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
  
    if (!formid || !userEmail) {
      console.error('Form ID or User Email is missing');
      return;
    }
  
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(and(
          eq(JsonForms.id, formid),  // Make sure formid is passed correctly
          eq(JsonForms.createdBy, userEmail)
        ));
  
      // Check if result contains any data
      if (result.length === 0) {
        console.warn('No data found for the given form ID and user email');
        return;
      }
  
      // Proceed with extracting and setting the data
      const formData = result[0];
      setRecord(formData);
      console.log(formData);
      setJsonForm(JSON.parse(formData.jsonform));
      setSelectedBackground(formData.background);
      setSelectedTheme(formData.theme);
      setSelectedStyle(JSON.parse(formData.style));
  
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };
  

  // Update Form JSON in Database
  useEffect(() => {
    if (updateTrigger) {
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const updateJsonFormInDb = async () => {
    try {
      const result = await db
        .update(JsonForms)
        .set({ jsonform: jsonForm })
        .where(
          and(
            eq(JsonForms.id, record.id),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        )
        .returning({ id: JsonForms.id });

      toast('Updated!!!');
      console.log('Update Result:', result);
    } catch (error) {
      console.error('Error updating form JSON:', error);
    }
  };

  // Handlers for Field Updates
  const onFieldUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const deleteField = (indexToRemove) => {
    jsonForm.fields = jsonForm.fields.filter((_, index) => index !== indexToRemove);
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, columnName) => {
    try {
      const result = await db
        .update(JsonForms)
        .set({ [columnName]: value })
        .where(
          and(
            eq(JsonForms.id, record.id),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        )
        .returning({ id: JsonForms.id });

      toast('Updated!!!');
    } catch (error) {
      console.error(`Error updating ${columnName}:`, error);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={'/aiform/' + record?.id} target="_blank">
            <Button className="flex gap-2">
              <SquareArrowOutUpRight className="h-5 w-5" /> Live Preview
            </Button>
          </Link>
          <RWebShare
            data={{
              text: `${jsonForm?.formHeading}, Build your form in seconds with AI form Builder`,
              url: process.env.NEXT_PUBLIC_BASE_URL + '/aiform/' + record?.id,
              title: jsonForm?.formTitle,
            }}
            onClick={() => console.log('Shared successfully!')}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
              <Share2 /> Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, 'theme');
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, 'background');
              setSelectedBackground(value);
            }}
            selectedStyle={(value) => {
              updateControllerFields(value, 'style');
              setSelectedStyle(value);
            }}
            setSignInEnable={(value) => {
              updateControllerFields(value, 'enabledSignIn');
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center"
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onFieldUpdate={onFieldUpdate}
            deleteField={deleteField}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
