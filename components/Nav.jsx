"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const isLoggedInUser = true;

  const [provider, setProvider] = useState(null);
  const [togglerDropdown, setTogglerDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const res = await getProviders();

      setProvider(res);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isLoggedInUser ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src="/assets/images/logo.svg" width={30} height={30} />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relation">
        {isLoggedInUser ? (
          <>
            <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              onClick={() => setTogglerDropdown((prev) => !prev)}
            />
            {togglerDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={()=>setTogglerDropdown(false)}>My Profile</Link>
              </div>
            )}
            </div>
          </>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
