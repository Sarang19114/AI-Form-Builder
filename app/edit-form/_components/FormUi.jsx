import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FieldEdit from './FieldEdit';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import moment from 'moment';
import { toast } from 'sonner';
import { SignInButton, useUser } from '@clerk/nextjs';

function FormUi({
  jsonForm,
  selectedTheme,
  selectedStyle,
  selectedBackground,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId = 0,
  enabledSignIn = false,
}) {
  const [formData, setFormData] = useState({});
  let formRef = useRef();
  const { isSignedIn } = useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hadleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    if (enabledSignIn && !isSignedIn) {
      toast('Please sign in before submitting the form.');
      return;
    }

    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format('DD/MM/yyy'),
      formRef: formId,
    });

    if (result) {
      formRef.current?.reset();
      toast('Response Submitted Successfully!');
    } else {
      toast('Error while saving your form!');
    }
  };

  const handleCheckboxChange = (fieldName, itemName, checked) => {
    const currentList = formData[fieldName] || [];

    if (checked) {
      setFormData({
        ...formData,
        [fieldName]: [...currentList, itemName],
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: currentList.filter((item) => item !== itemName),
      });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className="border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
      data-background={selectedBackground}
      style={{
        boxShadow:
          selectedStyle?.key === 'boxshadow' && '5px 5px 0px black',
        border:
          selectedStyle?.key === 'border' && selectedStyle.value,
      }}
    >
      <h2 className="font-bold text-center text-2xl">
        {jsonForm?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm?.formHeading}
      </h2>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType === 'select' ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Select
                required={field?.required}
                onValueChange={(v) => hadleSelectChange(field.fieldName, v)}
              >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, optionIndex) => (
                    <SelectItem
                      key={`${field.fieldName}-${optionIndex}`}
                      value={item.value || item.text || item}
                    >
                      {item.text || item.value || item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === 'radio' ? (
            <div className="w-full my-3">
              <label className="text-xs text-gray-500">{field.label}</label>
              <RadioGroup required={field?.required}>
                {field.options.map((item, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={item.value || item.text || item}
                      id={`${field.fieldName}-${optionIndex}`}
                      onClick={() =>
                        hadleSelectChange(
                          field.fieldName,
                          item.value || item.text || item
                        )
                      }
                    />
                    <Label htmlFor={`${field.fieldName}-${optionIndex}`}>
                      {item.text || item.value || item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === 'checkbox' ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              {field?.options ? (
                field.options.map((item, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex gap-2 items-center"
                  >
                    <Checkbox
                      onCheckedChange={(v) =>
                        handleCheckboxChange(
                          field.label,
                          item.value || item.text || item,
                          v
                        )
                      }
                    />
                    <h2>{item.text || item.value || item}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field.required} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                placeholder={field.placeholder}
                name={field.fieldName}
                className="bg-transparent"
                required={field?.required}
                onChange={handleInputChange}
              />
            </div>
          )}

          {editable && (
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}

      {!enabledSignIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : isSignedIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : (
        <div>
          <SignInButton mode="modal">Sign In before Submit</SignInButton>
        </div>
      )}
    </form>
  );
}

export default FormUi;
