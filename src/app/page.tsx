'use client'

import { useContext, useEffect, useState } from "react";
import authService from "./utils/services/auth.service";
import { AuthContext } from "./utils/context/auth.context";
import { useRouter } from "next/navigation";

export default function Home() {
  const [active, setActive] = useState("")

  const { storeToken, authenticateUser, isLoggedIn, isLoading }: any = useContext(AuthContext)
  const router = useRouter()

  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [signupUsername, setSignupUsername] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupRepeatPassword, setSignupRepeatPassword] = useState("")

  const handleSignupUsername = (e: any) => {
    setSignupUsername(e.target.value)
  }
  const handleSignupEmail = (e: any) => {
    setSignupEmail(e.target.value)
  }
  const handleSignupPassword = (e: any) => {
    setSignupPassword(e.target.value)
  }
  const handleSignupRepeatPassword = (e: any) => {
    setSignupRepeatPassword(e.target.value)
  }

  const handleLoginUsername = (e: any) => {
    setLoginUsername(e.target.value)
  }
  const handleLoginPassword = (e: any) => {
    setLoginPassword(e.target.value)
  }
  const handleLogin = (e: any) => {
    e.preventDefault()
    authService.login(
      { username: loginUsername, password: loginPassword }
    )
      .then((response: any) => {
        storeToken(response.data.authToken);
        authenticateUser();
        router.push("/dashboard")
      })
      .catch((err: any) => {
        console.log(err)
        setErrorMessage(err.response.data.message)
      })
  }

  const handleSignup = (e: any) => {
    e.preventDefault()

    if (signupPassword !== signupRepeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    authService.signup({ email: signupEmail, password: signupPassword, username: signupUsername })
      .then((response: any) => {
        setActive("login")
      })
      .catch((err: any) => {
        setErrorMessage(err.response.data.message)
      })
  }

  useEffect(() => {
    setErrorMessage("")
  }, [active])

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/news&announcements')
    }
  }, [isLoggedIn, router])

  if (!isLoading && !isLoggedIn) {
    return (
      <main className="flex flex-col w-[80%] mx-auto items-center text-center h-screen">
        <div className="my-auto flex flex-col gap-3 w-[400px] h-fit">
          {!active && <h1 className="text-3xl mb-10 font-light">To access this page <br /> you need to <span className="text-[#14b78f]">Log In</span>!</h1>}

          <div className={`${active === "login" ? "flex" : "hidden"} mx-auto w-full`}>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleLogin}>
              <input className="p-3 text-xl text-black" type="name" placeholder="Username" onChange={handleLoginUsername} required />
              <input className="p-3 text-xl text-black" type="password" placeholder="Password" onChange={handleLoginPassword} required />
              {errorMessage && <p className="text-red-500 font-normal">{errorMessage}</p>}
              <button className="border py-4 hover:bg-neutral-800 text-[#14b78f] border-[#14b78f]">Log In</button>
            </form>
          </div>

          <div className={`${active === "signup" ? "flex" : "hidden"} mx-auto w-full`}>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSignup}>
              <input className="p-3 text-xl text-black" type="name" placeholder="Username" onChange={handleSignupUsername} required />
              <input className="p-3 text-xl text-black mb-4" type="email" placeholder="Email" required onChange={handleSignupEmail} />
              <input className="p-3 text-xl text-black" type="password" placeholder="Password" required onChange={handleSignupPassword} />
              <input className="p-3 text-xl text-black" type="password" placeholder="Repeat Password" required onChange={handleSignupRepeatPassword} />
              {errorMessage && <p className="text-red-500 font-normal">{errorMessage}</p>}
              <button className="border py-4 hover:bg-neutral-800 text-[#14b78f] border-[#14b78f]">Sign Up</button>
            </form>
          </div>

          {!active && <button className="border py-4 border-[#14b78f] text-[#14b78f] hover:bg-neutral-800" onClick={() => setActive("login")}>Log In</button>}
          {!active && <button className="border py-4 hover:bg-neutral-800" onClick={() => setActive("signup")}>Sign Up</button>}
          {active && <button className="border py-4 hover:bg-neutral-800" onClick={() => setActive("")}>Back</button>}
        </div>
      </main>
    );
  }
}
