'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

    const [interviewData, setInterviewData] = useState();
    const [webcamEnable, setWebcamEnable] = useState(false);


    useEffect(()=>{
        console.log(params)
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log(result);
        setInterviewData(result[0]);
    }

    console.log("interview data", interviewData);

  return (
    <div className='flex flex-col my-10'>
        <h2 className='font-bold text-2xl'>Lets get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col my-5 mt-10 gap-5'>
                <div className=''>
                    {/* {interviewData.jobPosition} */}
                    <h2 className='text-lg'><strong>Job Role/Position: </strong> {interviewData.jobPosition} </h2> 
                    {/* {interviewData.jobDesc} */}
                    <h2 className='text-lg'><strong>Job Description/ Tech Stack: </strong> {interviewData.jobDesc} </h2>
                    {/* {interviewData.jobExperience} */}
                    <h2 className='text-lg'><strong>Year of Experience: </strong> {interviewData.jobExperience} </h2>
                </div>
                <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                    <h2 className='flex items-center gap-2 text-yellow-500'><Lightbulb /><strong>INFORMATION</strong></h2>
                    <h2 className='mt-3 text-yellow-500 text-sm'>
                        To begin the interview, please ensure that your microphone and webcam are turned on. This will allow the interview process to proceed smoothly, enabling clear communication and interaction.
                        <br />Disclaimer: Please note that we do not record any video or audio during the interview session. Your privacy is important to us, and no personal data related to video or audio will be stored or shared.
                    </h2>
                </div>
            </div>
            <div className='flex flex-col'>
                {webcamEnable? 
                    <Webcam 
                        mirrored={true}
                        onUserMedia={()=>setWebcamEnable(true)}
                        onUserMediaError={()=>setWebcamEnable(false)}
                        style={{
                            height:300,
                            width: 300
                        }}
                    />
                :   <>
                        <WebcamIcon className='h-72 w-full my-7 bg-secondary p-20 rounded border'/>
                        <Button className='bg-green-500 hover:bg-green-700' onClick={()=>setWebcamEnable(true)}>Enable Webcam & Microphone</Button>
                    </>
                }
            </div>
        </div>
        <div className='flex justify-end items-end mt-5'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'} >
                <Button className='bg-gray-400 hover:bg-blue-600 text-white'>Start Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview