import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className='w-full h-full flex justify-center mt-20'>
      <SignIn/>
    </div>
  );
}