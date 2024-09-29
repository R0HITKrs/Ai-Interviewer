"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

  

function AddNewInterview() {

    const [opendialog, setOpenDialog] = useState(false);
    const[jobPosition, setJobPosition] = useState();
    const[jobDesc, setJobDesc] = useState();
    const[jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState();
    const router=useRouter();
    const {user} = useUser();

    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = "Job Position: "+jobPosition+" Job Desciption: "+jobDesc+" Year of Experience: "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+". Depends on this job description and year of experience give us 5 interview question with answer in JSON format. Give question and answer field in JSON"; 

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(result){
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp:MockJsonResp,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createBy: user?.primaryEmailAddress?.emailAddress,
                createAt: moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview.mockId})
    
            console.log("inserted id", resp);

            if(resp){
                setOpenDialog(false);
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        }else{
            console.log("error");
        }
        
        setLoading(false);

    }

  return (
    <div>
        <div className='p-10 border rounded bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all'
          onClick={()=>setOpenDialog(true)}  
        >
            <h2 className='font-bold text-lg'>+ Add New</h2>
        </div>
        <Dialog open={opendialog}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className='font-bold text-2xl text-white text-left'>Tell us more about your Job Interview</DialogTitle>
                <DialogDescription>
                    <form onSubmit={onSubmit}>
                        <div>
                            <h2 className='text-white text-left font-semibold'>Add details about Job Role</h2>
                            <div className='mt-7 my-2 text-left text-white'>
                                <label htmlFor="">Job Role</label>
                                <Input placeholder="Eg. Full Stack Developer" onChange={(event)=>setJobPosition(event.target.value)} required/>
                            </div>
                            <div className='mt-7 my-2 text-left text-white'>
                                <label htmlFor="">Job Description/ Tech Stack</label>
                                <Textarea placeholder="Eg. React, HTML, CSS, MySQL, etc." onChange={(event)=>setJobDesc(event.target.value)} required/>
                            </div>
                            <div className='mt-7 my-2 text-left text-white'>
                                <label htmlFor="">Experience</label>
                                <Input type="number" placeholder="Eg. 5" max="50" onChange={(event)=>setJobExperience(event.target.value)} required/>
                            </div>
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading? 
                                <>
                                <LoaderCircle className='animate-spin' />Generating AI Questions    
                                </>: 'Start Interview'}
                            </Button>
                        </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewInterview