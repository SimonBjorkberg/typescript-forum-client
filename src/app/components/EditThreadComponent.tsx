import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditThreadComponent({ thread }: any) {

   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')

   useEffect(() => {
      setTitle(thread.title)
      setContent(thread.content)
   }, [thread])

   const handleChange = (newContent: any) => {
      setContent(newContent);
   };

   const handleTitle = (newContent: any) => {
      setTitle(newContent);
   };

   return (
      <form className="flex flex-col justify-between h-full max-h-[calc(100%-96px)] gap-2">
         <input value={title} onChange={handleTitle} type='text' placeholder='Thread Title' className='w-full p-2 border border-neutral-300 bg-opacity-50 bg-neutral-800' required />
         {ReactQuill && <ReactQuill value={content} onChange={handleChange} className='flex flex-col h-[calc(100%-116px)] max-h-[calc(100%-116px)] bg-opacity-50 bg-neutral-800' />}
         <button className='w-full border p-4 border-[#14b78f] text-[#14b78f] hover:bg-neutral-800 transition-all duration-200'>Update Thread</button>
      </form>
   );
}