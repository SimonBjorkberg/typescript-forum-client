'use client'

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../utils/context/auth.context';
import { useRouter } from 'next/navigation';
import topics from '../utils/data/topics';
import threadService from '../utils/services/thread.service';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function MyEditor() {
   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");
   const { loggedInUser }: any = useContext(AuthContext)

   const router = useRouter()

   const searchParams = useSearchParams()
   const topicId: any = searchParams.get('topic')

   const link = topics.filter((topic) => {
      return topic.link.includes(topicId)
   })

   const handleContent = (newContent: any) => {
      setContent(newContent);
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      const response = await threadService.createThread({ title, content, parentTopic: link[0].link, author: loggedInUser._id })
      router.push(`/thread?id=${response.data._id}`)
   };

   return (
      <form className="flex flex-col justify-between h-full max-h-[calc(100%-96px)] gap-2" onSubmit={handleSubmit}>
         <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Thread Title' className='w-full p-2 border border-neutral-300 bg-opacity-50 bg-neutral-800' />
         {ReactQuill && <ReactQuill value={content} onChange={handleContent} className='flex flex-col h-[calc(100%-116px)] max-h-[calc(100%-116px)] bg-opacity-50 bg-neutral-800' />}
         <button className='w-full border p-4 border-[#14b78f] text-[#14b78f] hover:bg-neutral-800 transition-all duration-200'>Create Thread</button>
      </form>
   );
}