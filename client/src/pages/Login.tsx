import React, { useState } from 'react'
import { heroSectionData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { BikeIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from 'lucide-react';

const Login = () => {

    const [isLoginState,setIsLoginState]= useState(true);
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [loading,setLoading]= useState(false);


    const handleSubmit = async(e:React.SubmitEvent)=>{
        e.preventDefault();
        setLoading(true);
        setTimeout(()=> window.location.href='/', 1000)

    };
  return (
    <div  className='min-h-screen flex'>
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img src={heroSectionData.hero_image} alt="login image"  className='absolute inset-0 object-cover h-full  bg-center opacity-40 '/>
        <div className="relative text-center px-12">
            <h2 className='text-3xl font-semibold text-white mb-2.5 tracking-tighter leading-relaxed'>Welcome back to Aniakor Grocery Store</h2>
        <p className='text-white/80 font-serif text-xl max-w-sm mx-auto tracking-tighter'>Fresh organic groceries produce delivered to your doorstep</p>
         </div>

            </div>
        {/* Right side */}
        <div className="px-3 py-5 flex-1 flex-center bg-app-cream">
            <div className="w-full max-w-md">
                {/* Form Header Message */}
                <div className="text-center mb-4">
                    <Link to='/' className='inline-flex gap-2 items-center mb-4'> 
                         <BikeIcon className='size-12 text-app-green'/>
                         <span className='text-2xl font-semibold text-app-green'>Aniakor Grocery Store</span>
                    </Link>
                    <h1 className='text-2xl font-semibold text-app-green mb-2'>{isLoginState? 'Login  to your account': 'Sign up for an account'}</h1>
                    <p className='text-sm text-app-text-light'> {isLoginState ? "Dont't have an account ?" : "Already have an account?"}
                         <button  onClick={()=>setIsLoginState(!isLoginState)}
                         className='text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors'>{isLoginState? 'Create one': 'Login'}
                         </button>
                    </p>
                </div>
                {/* Login/Register form */}
                <form  onSubmit={handleSubmit} className='space-y-5'>
                    {!isLoginState && (
                        <label  className='text-sm flex flex-col gap-1'
                        >Name
                        <div className="relative">
                            <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-8 text-app-text-light pr-3'/>
                            <input type="text" 
                            className='w-full pl-15 pr-4 py-2 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all ' 
                            required
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        </label>
                    ) }

                    <label  className='text-sm flex flex-col gap-1'
                        >Email Address
                        <div className="relative">
                            <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-8 text-app-text-light pr-3'/>
                            <input type="email" 
                            className='w-full pl-15 pr-4 py-2 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all ' 
                            required
                            placeholder='Yourexampleemail@gmail.com'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        </label>
                    <label  className='text-sm flex flex-col gap-1'
                        >Password
                        <div className="relative">
                            <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-8 text-app-text-light pr-3'/>
                            <input type="password" 
                            className='w-full pl-15 pr-4 py-2 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all ' 
                            required
                            placeholder='......'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        </label>
                        <button type='submit' disabled={loading}
                         className='w-full flex-center py-2 bg-green-900 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors diabled:opacity-50'> {loading? <Loader2Icon className='animate-spin'/> :
                         isLoginState? "Sign In" : "Sign Up" }</button>

                </form>
            </div>

        </div>

    </div>
  )
}

export default Login