"use client";

import { signin_validation } from "@/libs/validation/signin_validation";
import { useFormik } from "formik";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FaInfinity } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineEye,
  HiOutlineMail
} from "react-icons/hi";
import { SiGmail } from "react-icons/si";
 

const Signin = () => {
  const formik = useFormik({
        initialValues: {
          
            email: '',
            password: '',
        },
        validate:signin_validation,
        onSubmit
    })

     async function onSubmit(values){
        console.log(values)
    }
  return (
    <div className="w-[95%] sm:w-[25rem]  bg-[#090f21] text-white px-3 py-5 rounded-md">
      <div className="flex flex-col items-center">
        <FaInfinity size={40} />
        <h3 className="text-2xl font-medium">Sign in</h3>
        <p className="text-gray-400 text-sm">Enter your information below</p>
      </div>
      <form className="mt-2 px-2 flex flex-col gap-y-2" onSubmit={formik.handleSubmit}>
        
        {/* Email------------ */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="input input-bordered w-full flex items-center justify-between">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full"
              {...formik.getFieldProps('email')}
            />
            <HiOutlineMail size={28} className=" text-gray-400" />
          </div>
        </div>
        {/* Password------------ */}
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="input input-bordered w-full flex items-center justify-between">
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent w-full"
              {...formik.getFieldProps('password')}
            />
            <HiOutlineEye size={28} className=" text-gray-400" />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#1e6fdf] mt-2 py-3 text-base font-[500] rounded-md"
        >
          Sign in
        </button>
        {/* other sign in option */}
        <div className="w-full flex flex-col items-center gap-y-3 mt-2">
        <p>-- or Sign in with --</p>
        <div className="flex items-center justify-between gap-4 ">
            <button className="py-2 px-4 border border-gray-500 rounded-md flex items-center gap-2">
                <FcGoogle size={20}/>
                Google
            </button>

             <button className="py-2 px-4 border border-gray-500 rounded-md flex items-center gap-2">
                <BsGithub size={20}/>
                Github
            </button>

             <button className="py-2 px-4 border border-gray-500 rounded-md flex items-center gap-2">
                <SiGmail size={20}/>
                Email
            </button>
            
        </div>
      </div>
      </form>
      
      <div className="text-center mt-4 px-2 mb-2">
        <p className="text-gray-400 text-xs font-[500]">
          By signing up, I agree to the{" "}
          <span className="text-blue-500">Terms & Conditions</span> and{" "}
          <span className="text-blue-500">Privacy Policy</span>
        </p>
        <p className="text-sm text-gray-500">
          Have no account yet?
          <Link href="/signup" className="text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
