'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { AwardIcon, CircleStop, Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {

  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((results)=>{
      setUserAnswer(prevAns=>prevAns+results?.transcript)
    })
  }, [results])

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10){
      UpdateUserAnswer();
    }
  }, [userAnswer])

  const StartStopRecording=async()=>{
    if(isRecording){
        stopSpeechToText()
      }else{
      startSpeechToText();
    }
  }

  const UpdateUserAnswer=async()=>{
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question + 
        ", user Answer: " + userAnswer + 
        ", Depends on the question and user answer for the given interview question. " + 
        "Please give us a rating for the answer and feedback as areas of improvement, if any, in just 3 to 5 lines in JSON format with 'rating' field and 'feedback' field.";

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(mockJsonResp);
        const jsonFeedbackResp = JSON.parse(mockJsonResp);
          
        const resp = await db.insert(UserAnswer).values({
          mockIdREf: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: jsonFeedbackResp?.feedback,
          rating: jsonFeedbackResp?.rating,
          eserEmail: user?.primaryEmailAddress?.emailAddress,
          createAt: moment().format('DD-MM-yyyy')
        })

        if(resp){
          toast('User Answer Added Successfully')
          setUserAnswer('');
          setResults([]);
        }
        setResults([]);
        setLoading(false);
  }
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-gray-500 rounded-lg p-5'>
        <Image className='absolute' src={'/Webcam.png'} width={200} height={200} />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>
      <Button 
        disabled={loading}
        className='my-10' variant="outline" onClick={StartStopRecording}>
      {isRecording ? 
          <h2 className='text-red-600 flex items-center gap-2 animate-pulse'>
            <CircleStop size={18} className='text-red-700'/> Stop Recording...
          </h2> 
        :  
          <>
            <h2 className='flex items-center gap-2'><Mic className='text-blue-700' size={18}/> Record Answer</h2>
          </>  
        }
      </Button>      
    </div>
  )
}

export default RecordAnswerSection