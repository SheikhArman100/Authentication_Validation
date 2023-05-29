"use client";

import { useFormik } from "formik";
import Link from "next/link";

import { signup_validation } from "@/libs/validation/signup_validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaInfinity } from "react-icons/fa";
import {
  HiOutlineEye,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";


const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [focused, setFocused] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: signup_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    //

    const data = await res.json();
    console.log(data.message);
    setError(data.message);
    if (data.message === "New user created......") {
      router.push("http://localhost:3000");
    }
  }
  return (
    <div className="w-[95%] sm:w-[25rem]  bg-[#090f21] text-white px-4 py-5 rounded-lg">
      <div className="flex flex-col items-center">
        <FaInfinity size={40} />
        <h3 className="text-2xl font-medium">Register</h3>
        <p className="text-gray-400 text-sm">Enter your information below</p>
      </div>
      <form
        className="mt-2 px-2 flex flex-col gap-y-2"
        onSubmit={formik.handleSubmit}
      >
        
        
        {/* //!Username------------ */}
        <div>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <div
            className={`input input-bordered w-full flex items-center gap-x-2 justify-between ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : focused.username
                ? "border-blue-600"
                : ""
            }`}
          >
            <input
              type="text"
              placeholder="Enter your username"
              className="bg-transparent w-full"
              onFocus={() =>
                setFocused({
                  username: true,
                  email: false,
                  password: false,
                  confirmPassword: false,
                })
              }
              {...formik.getFieldProps("username")}
            />
            <HiOutlineUserCircle
              size={28}
              className={`${
                formik.errors.username && formik.touched.username
                  ? "text-rose-600"
                  : focused.username
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            />
          </div>
          {formik.errors.username && formik.touched.username ? (
            <span className="text-rose-500 text-xs">
              {formik.errors.username}
            </span>
          ) : (
            ""
          )}
          {error === "Username Already Used...!" ? (
            <span className="text-rose-500 text-xs">
              Username Already Used...!
            </span>
          ) : (
            ""
          )}
        </div>




        {/* //!Email------------ */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div
            className={`input input-bordered w-full flex items-center gap-x-2 justify-between ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : focused.email
                ? "border-blue-600"
                : ""
            }`}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full"
              onFocus={() =>
                setFocused({
                  username: false,
                  email: true,
                  password: false,
                  confirmPassword: false,
                })
              }
              {...formik.getFieldProps("email")}
            />
            <HiOutlineMail
              size={28}
              className={`${
                formik.errors.email && formik.touched.email
                  ? "text-rose-600"
                  : focused.email
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            />
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500 text-xs">{formik.errors.email}</span>
          ) : (
            ""
          )}
          {error === "Email Already Used...!" ? (
            <span className="text-rose-500 text-xs">
              Email Already Used...!
            </span>
          ) : (
            ""
          )}
        </div>




        {/* //!Password------------ */}
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div
            className={`input input-bordered w-full flex items-center gap-x-2 justify-between  ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : focused.password
                ? "border-blue-600"
                : ""
            }`}
          >
            <input
              type={showPassword.password ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-transparent w-full "
              onFocus={() =>
                setFocused({
                  username: false,
                  email: false,
                  password: true,
                  confirmPassword: false,
                })
              }
              {...formik.getFieldProps("password")}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                })
              }
            >
              {showPassword.password ? (
                <HiOutlineEye
                  size={28}
                  className={`${
                    formik.errors.password && formik.touched.password
                      ? "text-rose-600"
                      : focused.password
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
              ) : (
                <BiHide
                  size={28}
                  className={`${
                    formik.errors.password && formik.touched.password
                      ? "text-rose-600"
                      : focused.password
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
              )}
            </button>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500 text-xs">
              {formik.errors.password}
            </span>
          ) : (
            ""
          )}
        </div>

        
        
        
        {/* //!Confirm Password------------ */}
        <div>
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <div
            className={`input input-bordered w-full flex items-center gap-x-2 justify-between ${
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? "border-rose-600"
                : focused.confirmPassword
                ? "border-blue-600"
                : ""
            }`}
          >
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Enter your password again"
              className="bg-transparent w-full"
              onFocus={() =>
                setFocused({
                  username: false,
                  email: false,
                  password: false,
                  confirmPassword: true,
                })
              }
              {...formik.getFieldProps("confirmPassword")}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword,
                })
              }
            >
              {showPassword.confirmPassword ? (
                <HiOutlineEye
                  size={28}
                  className={`${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "text-rose-600"
                      : focused.confirmPassword
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
              ) : (
                <BiHide
                  size={28}
                  className={`${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "text-rose-600"
                      : focused.confirmPassword
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
              )}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <span className="text-rose-500 text-xs">
              {formik.errors.confirmPassword}
            </span>
          ) : (
            ""
          )}
        </div>

        {/* //!sign Up Button */}
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
