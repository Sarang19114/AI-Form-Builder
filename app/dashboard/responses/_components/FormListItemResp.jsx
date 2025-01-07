import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { userResponses } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

function FormListItemResp({ jsonForm, formRecord }) {
    const [loading, setLoading] = useState(false);
    const [responseCount, setResponseCount] = useState(0);

    // Fetch response count when component mounts
    React.useEffect(() => {
        const fetchResponseCount = async () => {
            const result = await db.select().from(userResponses)
                .where(eq(userResponses.formRef, formRecord.id));
            setResponseCount(result.length);
        };
        fetchResponseCount();
    }, [formRecord.id]);

    const ExportData = async () => {
        let jsonData = [];
        setLoading(true);
        
        const result = await db.select().from(userResponses)
            .where(eq(userResponses.formRef, formRecord.id));

        console.log(result);
        if (result) {
            result.forEach((item) => {
                const jsonItem = JSON.parse(item.jsonResponse);
                jsonData.push(jsonItem);
            });
            setLoading(false);
        }
        console.log(jsonData);
        exportToExcel(jsonData);
    }

    /**
     * Convert Json to Excel and then Download it
     */
    const exportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        
        XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
    }

    return (
        <div className="bg-white/60 p-4 border rounded-lg shadow-sm m-5">
            <h2 className="text-xl font-bold mb-2">{jsonForm?.formTitle}</h2>
            <p className="text-gray-600 mb-4">{jsonForm?.formHeading}</p>
            
            <div className="flex items-center justify-between">
                <span className="font-semibold">{responseCount} Responses</span>
                <Button
                    onClick={() => ExportData()}
                    disabled={loading}
                >
                    {loading ? 
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...</> : 
                        'Export'
                    }
                </Button>
            </div>
        </div>
    );
}

export default FormListItemResp;