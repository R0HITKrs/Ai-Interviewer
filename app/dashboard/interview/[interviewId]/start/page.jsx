'use client'

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuesitonIndex] = useState(0);

    useEffect(()=>{
        GetInterviewDetails();
        console.log(params);
    }, [])

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);

    }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* question */}
            <QuestionSection mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex={activeQuestionIndex}
            />


            {/* video/audio recording */}
            <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
                />
        </div>
        <div className='flex justify-end gap-6'>
           {
                activeQuestionIndex > 0 &&  
                <Button onClick={()=>setActiveQuesitonIndex(activeQuestionIndex-1)} className='bg-secondary text-black hover:bg-gray-200 hover:text-black' >Previous</Button>
            }
            
            {
                activeQuestionIndex != mockInterviewQuestion?.length - 1 && 
                <Button onClick={()=>setActiveQuesitonIndex(activeQuestionIndex+1)} className='bg-secondary text-black hover:bg-gray-200 hover:text-black' >Next</Button> 
            }
            {
                activeQuestionIndex == mockInterviewQuestion?.length - 1 && 
                <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                    <Button className='bg-red-600 hover:bg-red-500'>End Interview</Button>
                </Link>
            }
        </div>
    </div>
  )
}

export default StartInterview