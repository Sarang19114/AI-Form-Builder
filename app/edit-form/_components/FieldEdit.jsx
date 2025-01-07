import { Delete, Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  
function FieldEdit({defaultValue,onUpdate,deleteField}) {

    const [label,setLabel]=useState(defaultValue?.label);
    const [placeholder,setPlaceholder]=useState(defaultValue?.placeholder);

  return (
    <div className='flex gap-2'>
       
       <Popover>
        <PopoverTrigger> <Edit className='h-5 w-5 text-gray-500'/></PopoverTrigger>
        <PopoverContent>
            <h2>Edit Fields</h2>
            <div>
                <label className='text-xs'>Label Name</label>
                <Input type="text" defaultValue={defaultValue.label}
                    onChange={(e)=>setLabel(e.target.value)}
                />
            </div>
            <div>
                <label className='text-xs'>Placeholder Name</label>
                <Input type="text" defaultValue={defaultValue.placeholder}
                    onChange={(e)=>setPlaceholder(e.target.value)}
                />
            </div>
            <Button size="sm"  className="mt-3"
            onClick={()=>onUpdate({
                label:label,
                placeholder:placeholder
            })}
            >Update</Button>
        </PopoverContent>
        </Popover>

      
        <AlertDialog>
  <AlertDialogTrigger>
  <Trash className='h-5 w-5 text-red-500'/>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this field?</AlertDialogTitle>
      <AlertDialogDescription>
      This action is permanent and cannot be undone. Deleting this field will 
      remove it from the form, and all data associated with this field will be lost.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteField()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      
    </div>
  )
}

export default FieldEdit