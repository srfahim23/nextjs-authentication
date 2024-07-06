"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserInfo } from "../models/user.model";
import Notify, { showToast } from "@/components/notify";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm<UserInfo>();

  const onSubmit = async (data: UserInfo) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_PATH}user`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const res: any = await fetch(endpoint, options);
      const regMsg = await res.json();

      if (res.status == 202) {
        showToast(regMsg.msg, "success");
        reset();
      } else showToast(regMsg, "error");
    } catch (e: any) {
      showToast(e, "error");
    }
  };

  return (
    <>
      <Notify />

      <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
        <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-25">
          <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
            <h1 className="text-center text-black font-light text-4xl bg-yellow rounded-t-xl m-0 py-4">
              Sign Up
            </h1>
            <form className="p-6">
              <input
                type="text"
                placeholder="Full Name"
                className="py-2 px-3 w-full text-black text-lg font-light outline-none"
                {...register("fullName", { required: true })}
              />
              <input
                type="email"
                placeholder="E-mail"
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mt-3"
                {...register("email", { required: true })}
              />
              <input
                type="password"
                placeholder="Password"
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mt-3"
                {...register("password", { required: true })}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mt-3"
                {...register("confirmPassword", { required: true })}
              />
              <div className="flex mt-5 justify-between items-center">
                <Link
                  href="/"
                  className="text-white cursor-pointer transition hover:text-black"
                >
                  Already Registered?
                </Link>
                <button
                  type="submit"
                  className="bg-black text-yellow font-medium py-2 px-8 transition hover:text-white"
                  onClick={handleSubmit(onSubmit)}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
};

export default SignUp;
