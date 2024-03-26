import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../utils/context/auth.context';
import threadService from '../utils/services/thread.service';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Thread {
   _id: string,
   author: {
      _id: string,
   }
}

export default function EditThreadComponent() {
   const { loggedInUser }: any = useContext(AuthContext)

   const [thread, setThread] = useState<Thread>()
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [errorMessage, setErrorMessage] = useState('')

   const router = useRouter()

   const searchParams = useSearchParams()
   const id: any = searchParams.get('id')

   const getThread = async () => {
      const response: any = await threadService.getOne(id)
      setThread(response.data.thread)
      setTitle(response.data.thread.title)
      setContent(response.data.thread.content)
   }

   useEffect(() => {
      getThread()
      // eslint-disable-next-line
   }, [])

   const handleChange = (newContent: any) => {
      setContent(newContent);
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      if (thread) {
         await threadService.editOne(id, { loggedInUser: loggedInUser._id, author: thread.author._id, title, content })
            .then((response: any) => {
               if (response) {
                  router.push(`/thread?id=${id}`)
               }
            })
            .catch((err: { response: { data: { message: string } } }) => {
               setErrorMessage(err.response.data.message)
            })
      }
   }

   return (
      <form className="flex flex-col justify-between h-full max-h-[calc(100%-96px)] gap-2" onSubmit={handleSubmit}>
         <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Thread Title' className='w-full p-2 border border-neutral-300 bg-opacity-50 bg-neutral-800' required />
         {ReactQuill && <ReactQuill value={content} onChange={handleChange} className='flex flex-col h-[calc(100%-116px)] max-h-[calc(100%-116px)] bg-opacity-50 bg-neutral-800' />}
         {errorMessage && <p className='mx-auto text-red-500'>{errorMessage}</p>}
         <button className='w-full border p-4 border-[#14b78f] text-[#14b78f] hover:bg-neutral-800 transition-all duration-200'>Update Thread</button>
      </form>
   );
}