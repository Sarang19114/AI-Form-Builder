"use client";
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AiChatSession } from '@/configs/AIModal';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/index';
import { JsonForms } from '@/configs/schema';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { desc, eq } from 'drizzle-orm';

const AI_PROMPT = `Create a JSON form with the following structure:
- formTitle
- formHeading
- fields array containing objects with:
  - fieldName
  - fieldTitle
  - fieldType
  - placeholder
  - label
  - required
  - options (array, only for checkbox and select types)
Response must be valid JSON format.`;

const CreateForm = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formDescription, setFormDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formList, setFormList] = useState([]);

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            GetFormList();
        }
    }, [user]);

    const GetFormList = async () => {
        const result = await db
            .select()
            .from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));

        setFormList(result);
    };

    const validateUserInput = (input) => {
        if (!input?.trim()) {
            throw new Error('Please enter a form description');
        }
        if (input.length < 10) {
            throw new Error('Description too short. Please provide more details.');
        }
    };

    const handleCreateForm = async () => {
        try {
            if (formList?.length >= 3) {
                toast.error('Upgrade to Pro for unlimited forms');
                return;
            }
            validateUserInput(formDescription);
            setIsSubmitting(true);

            const aiResponse = await AiChatSession.sendMessage(
                `Description: ${formDescription}\n${AI_PROMPT}`
            );
            const responseText = aiResponse.response.text();

            if (!responseText) {
                throw new Error('No response received from AI');
            }

            const parsedJson = JSON.parse(responseText);
            if (!parsedJson.formTitle || !parsedJson.fields) {
                throw new Error('Invalid form structure received');
            }

            const [newForm] = await db
                .insert(JsonForms)
                .values({
                    jsonform: responseText,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/YYYY'),
                    theme: 'light',
                    background: '',
                    style: '{}',
                    enabledSignIn: false,
                })
                .returning({ id: JsonForms.id });

            if (!newForm?.id) {
                throw new Error('Failed to create form');
            }

            toast.success('Form created successfully');
            handleCloseDialog();

            // Navigate to edit form page
            await new Promise((resolve) => setTimeout(resolve, 500));
            router.push(`/edit-form/${newForm.id}`);
        } catch (error) {
            console.error('Form creation error:', error);
            toast.error(error.message || 'Failed to create form');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setFormDescription('');
    };

    return (
        <div>
            <Button onClick={() => setDialogOpen(true)}>
                + Create Form
            </Button>

            <Dialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Form</DialogTitle>
                    </DialogHeader>

                    <div className="mt-4">
                        <DialogDescription asChild>
                            <div>
                                <Textarea
                                    className="my-2 min-h-[100px]"
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="Describe your form in detail (e.g., 'Create a contact form with name, email, phone number, and message fields')"
                                    disabled={isSubmitting}
                                />
                                <div className="flex gap-2 my-3 justify-end">
                                    <Button
                                        variant="destructive"
                                        onClick={handleCloseDialog}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreateForm}
                                        disabled={isSubmitting}
                                        type="button"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : 'Create'}
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateForm;
