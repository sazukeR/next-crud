'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewPage({ params }) {
 const router = useRouter();
 const [form, setForm] = useState({
  title: '',
  description: '',
 });

 useEffect(() => {
  if (params.id) {
   fetch(`/api/tasks/${params.id}`)
    .then((res) => res.json())
    .then((data) => {
     setForm({
      title: data.title,
      description: data.description,
     });
    });
  }
 }, []);

 const onChange = (value, field) => {
  setForm({
   ...form,
   [field]: value,
  });
 };

 const onSubmit = async (e) => {
  e.preventDefault();

  if (form.title === '' || form.description === '') return;
  if (params.id) {
   const resp = await fetch(`/api/tasks/${params.id}`, {
    method: 'PUT',
    body: JSON.stringify(form),
    headers: {
     'Content-Type': 'application/json',
    },
   });

   const data = await resp.json();
  } else {
   const resp = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
     'Content-Type': 'application/json',
    },
   });

   const data = await resp.json();
  }

  router.refresh();
  router.push('/');
 };

 return (
  <div className='h-screen flex justify-center items-center'>
   <form onSubmit={onSubmit} className='bg-slate-800 p-10 w-2/4'>
    <label htmlFor='title' className='font-bold text-sm'>
     Task Title
    </label>

    <input
     onChange={({ target }) => onChange(target.value, 'title')}
     name='title'
     value={form.title}
     type='text'
     id='title'
     className='border border-gray-400 p-2 mb-4 w-full text-black'
     placeholder='Title'
    />
    <label htmlFor='description' className='font-bold text-sm'>
     Task Description
    </label>
    <textarea
     onChange={({ target }) => onChange(target.value, 'description')}
     name='description'
     id='description'
     value={form.description}
     placeholder='Describe your task'
     className='border border-gray-400 p-2 mb-4 w-full text-black'
    ></textarea>
    <div className='flex justify-between'>
     <button
      type='submit'
      className='bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded'
     >
      {params.id ? 'Update Task' : 'Create Task'}
     </button>

     {params.id && (
      <button
       type='button'
       className='bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded'
       onClick={async () => {
        const resp = await fetch(`/api/tasks/${params.id}`, {
         method: 'DELETE',
        });
        const data = await resp.json();
        router.refresh();
        router.push('/');
       }}
      >
       Delete
      </button>
     )}
    </div>
   </form>
  </div>
 );
}
