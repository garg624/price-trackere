"use client"
import React, { FormEvent, useState } from 'react';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { toast } from 'sonner';
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { SiMinutemailer } from "react-icons/si";
import { addUserEmailToProduct } from '@/actions';

const Modal = ({productId}:{productId:string}) => {
  const [email, setEmail] = useState('');
  const [loading,setLoading]=useState(false);
  const handleSubmit =async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!email){
        toast.error("Please enter the email")
        return;
      }
      
      setLoading(true);

      await addUserEmailToProduct(productId,email);
      // Reset the form
      setEmail('');
      toast.success("Your Email is added to the notify list✅")
    } catch (error) {
      toast.error("Try later")
      console.log(error)
    }finally{
      setLoading(false)
    }
    // Add code here to handle form submission
  };

  return (
    <div className="container bg-slate-400 rounded-full flex gap-2 justify-center items-center">
      <MdOutlineMarkEmailUnread className="text-3xl ml-4" />
      <form onSubmit={handleSubmit} className="flex justify-center items-center gap-3 container text-black py-2 px-4">
        <input
          className="w-full  bg-slate-400 text-gray-950 placeholder-gray-800"
          type="email"
          required
          value={email}
          minLength={5}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter the email Address..."
        />
        <button type="submit" disabled={loading} className="shadow-stone-200  relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg">
          {loading?<CgSpinnerTwoAlt className='animate-spin ease-in text-xl' /> :<span className='flex'>Track <SiMinutemailer className='text-xl' /></span>}
        </button>
      </form>
    </div>
  );
};

export default Modal;