"use client";

import FormUi from '@/app/edit-form/_components/FormUi';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, use } from 'react';
import { SignIn, SignInButton } from '@clerk/nextjs'

function LiveAiForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);
  const { formid } = use(params);

  useEffect(() => {
    if (formid) {
      GetFormData(formid);
    }
  }, [formid]);

  const GetFormData = async (formid) => {
    if (!formid) {
      console.error("Form ID is missing");
      return;
    }

    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, Number(formid)));

      if (result.length > 0) {
        const formData = result[0];
        setRecord(formData);
        setJsonForm(JSON.parse(formData.jsonform));
        console.log(result);
      } else {
        console.warn("No form found with the given ID");
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  return (
    <div
      className="p-10 flex justify-center items-center"
      style={{
        backgroundImage: record?.background,
      }}
    >
      {record && (
        <FormUi
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log('Field updated')}
          deleteField={() => console.log('Field deleted')}
          selectedStyle={JSON.parse(record?.style)}
          selectedTheme={record?.theme}
          editable={false}
          formId={record.id}
          enabledSignIn={record?.enabledSignIn}
        />
      )}
      <Link
        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
        href={'/'}
      >
        <Image src={'/logo.png'} width={26} height={26} alt="Logo" />
        Build your Own AI form
      </Link>
    </div>
  );
}

export default LiveAiForm;
