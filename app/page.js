import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className='bg-gradient-to-r from-bg to-black flex gap-10 w-full justify-between items-center'>
      <div className='ml-10 '>
       <h2 className='font-bold font-serif text-5xl text-pink-100 gap-5 font'>WELCOME TO AI INTERVIEW</h2> 
       <h2 className='font-medium font-serif text-cyan-100 text-2xl'>Your personal AI powered interviewer</h2>
       <Link href={'/dashboard'}>
        <Button className='bg-slate-500 hover:bg-blue-500 mt-5'>Let's Begin</Button>
       </Link>
      </div>
      <div>
        <img src="/image.jpeg" width={650} alt="" />
      </div>
    </div>
  );
}
