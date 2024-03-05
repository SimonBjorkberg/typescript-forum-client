import axios from 'axios';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React, { useContext, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/auth.context';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function MyEditor() {
   const [content, setContent] = useState('');
   const [title, setTitle] = useState('');

   const { loggedInUser }: any = useContext(AuthContext)

   const pathName = usePathname();

   const handleContent = (newContent: any) => {
      setContent(newContent);
   };
   const handleTitle = (newContent: any) => {
      setTitle(newContent);
   };

   const handleSubmit = (e: any) => {
      e.preventDefault()
      axios.post('http://localhost:5005/thread/create', { title, content, parentTopic: pathName.slice(1), author: loggedInUser._id })
         .then(response => {
            console.log('Thread created successfully:', response.data);
         })
         .catch(error => {
            console.error('Error creating thread:', error);
         });
   };

   return (
      <form className="flex flex-col justify-between h-full max-h-[calc(100%-96px)] gap-2" onSubmit={handleSubmit}>
         <input type='text' placeholder='Thread Title' onChange={handleTitle} className='w-full p-2 border border-neutral-300 bg-opacity-50 bg-neutral-800' required />
            {ReactQuill && <ReactQuill value={content} onChange={handleContent} className='flex flex-col h-[calc(100%-116px)] max-h-[calc(100%-116px)] bg-opacity-50 bg-neutral-800' />}
         <button className='w-full border p-4 border-[#14b78f] text-[#14b78f] hover:bg-neutral-800 transition-all duration-200'>Create Thread</button>
      </form>
   );
}