'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Itemcard from './Itemcard';

function InterviewList() {

    const {user} = useUser();
    const [InterviewList, setInterviewList] = useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    }, [user])

    const GetInterviewList=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id));
        console.log(result);
        setInterviewList(result);
    }
    console.log(InterviewList);

  return (
    <div>
        <h2 className='font-medium text-2xl'>Previous Mock Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {InterviewList && InterviewList.map((interview, index)=>(
                <Itemcard 
                    interview={interview}
                    key={index}
                />
            ))}
        </div>
    </div>
  )
}

export default InterviewList