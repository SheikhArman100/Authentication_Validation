"use client";

import { useFormik } from "formik";
import Link from "next/link";

import { signup_validation } from "@/libs/validation/signup_validation";
import { FaInfinity } from "react-icons/fa";
import {
  HiOutlineEye,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";


const Signup = () => {
  
     const formik = useFormik({
        initialValues: {
            username:"",
            email: '',
            password: '',
            confirmPassword:""
        },
        validate:signup_validation,
        onSubmit
    })

     async function onSubmit(values){
        //console.log(values)
        const req = await fetch("http://localhost:3000/api/signup",{
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
  //       const {user} = await res.json();
  // //       if (user) {
  // //           redirect('/login');
  // // }
  //       console.log(`user---> ${user}`)

        
    }
  return (
    <div className="w-[95%] sm:w-[25rem]  bg-[#090f21] text-white px-3 py-5 rounded-md">
      <div className="flex flex-col items-center">
        <FaInfinity size={40} />
        <h3 className="text-2xl font-medium">Register</h3>
        <p className="text-gray-400 text-sm">Enter your information below</p>
      </div>
      <form className="mt-2 px-2 flex flex-col gap-y-2" onSubmit={formik.handleSubmit}>
        {/* Username------------ */}
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <div className="input input-bordered w-full flex items-center gap-x-2 justify-between ">
            <input
              type="text"
              placeholder="Enter your username"
              className="bg-transparent w-full"
             {...formik.getFieldProps('username')}
              
            />
            <HiOutlineUserCircle size={28}  />
          </div>
        </div>
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
        {/* Confirm Password------------ */}
        <div>
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <div className="input input-bordered w-full flex items-center justify-between">
            <input
              type="password"
              placeholder="Enter your password again"
              className="bg-transparent w-full"
              {...formik.getFieldProps('confirmPassword')}
            />
            <HiOutlineEye size={28} className=" text-gray-400" />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#1e6fdf] mt-2 py-3 text-base font-[500] rounded-md"
        >
          Sign up
        </button>
      </form>
      <div className="text-center mt-4 px-2 mb-2">
        <p className="text-gray-400 text-xs font-[500]">
          By signing up, I agree to the{" "}
          <span className="text-blue-500">Terms & Conditions</span> and{" "}
          <span className="text-blue-500">Privacy Policy</span>
        </p>
        <p className="text-sm text-gray-500">
          Already have an account?
          <Link href="" className="text-blue-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
