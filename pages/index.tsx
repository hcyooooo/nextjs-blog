"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>home page</h1>
      <Link href={'login'}>to login</Link>
    </>
  );
}
