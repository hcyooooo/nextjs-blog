"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import type { Link as LinkType } from "@prisma/client";

const AllLinksQuery = gql`
  query {
    links {
      id
      title
      url
      description
      imageUrl
      category
    }
  }
`;

const MeQuery = gql`
  query {
    me {
      email
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const { data, loading, error } = useQuery(AllLinksQuery);
  const { data: meData } = useQuery(MeQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const user = meData ? meData.me : null;
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.refresh();
  };

  return (
    <>
      <h1 className=" text-center">home page</h1>

      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            {user ? (
              <h1>hello {user.email}!</h1>
            ) : (
              <Link href="login">log in</Link>
            )}
            {user && (
              <a className="cursor-pointer" onClick={handleLogout}>
                log out
              </a>
            )}
          </div>
        </div>
      </nav>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {localStorage.getItem("token") ? (
          data.links.map((link: LinkType) => (
            <li key={link.id} className="shadow  max-w-md  rounded">
              <img className="shadow-sm" src={link.imageUrl} />
              <div className="p-5 flex flex-col space-y-2">
                <p className="text-sm text-blue-500">{link.category}</p>
                <p className="text-lg font-medium">{link.title}</p>
                <p className="text-gray-600">{link.description}</p>
                <a href={link.url} className="flex hover:text-blue-500">
                  {link.url.replace(/(^\w+:|^)\/\//, "")}
                  <svg
                    className="w-4 h-4 my-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </li>
          ))
        ) : (
          <h1 className=" text-center">please login to view contents!!!</h1>
        )}
      </ul>
    </>
  );
}
