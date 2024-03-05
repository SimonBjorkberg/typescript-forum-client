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

   const handleChange = (newContent: any) => {
      setContent(newContent);
   };

   const handleSubmit = (e) => {
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
      <form onSubmit={(e) => handleSubmit(e)}>
         <input type='text' placeholder='Thread Title' onChange={(e) => setTitle(e.target.value)} className='w-full p-2 bg-opacity-50 bg-neutral-800 border border-neutral-300 mb-2' required />
         <div>
            {ReactQuill && <ReactQuill value={content} onChange={handleChange} className='bg-neutral-800 bg-opacity-50' />}
         </div>
         <button className='w-full border p-4 border-[#14b78f] text-[#14b78f] mt-2 hover:bg-neutral-800 transition-all duration-200'>Create Thread</button>
      </form>
   );
}