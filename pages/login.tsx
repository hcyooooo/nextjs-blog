"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    //fetch
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white w-full rounded-lg shadow p-6 space-y-4 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  email
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg ring-0 focus:text-gray-600 focus:border-gray-600 w-full p-2.5 "
                  placeholder="input your email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className=" block mb-2 text-sm font-medium text-gray-900">
                  password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg ring-0 focus:text-gray-600 focus:border-gray-600 w-full p-2.5 "
                  placeholder="input your password"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={handleClick}
                type="submit"
                className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
