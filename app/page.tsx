"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
} from "firebase/auth";
import { auth, provider, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
// import { FaFacebook, FaMicrosoft } from 'react-icons/fa';
import { NotebookPen,CalendarCheck2,ChartNoAxesCombined, Rocket } from 'lucide-react';
import Image from "next/image";

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const actionCodeSettings = {
    url: "http://localhost:3000/auth", // ✅ Replace with your deployed URL
    handleCodeInApp: true,
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) router.push("/dashboard");
    });
    return () => unsub();
  }, [router]);

  // Handle Email Link Sign-In on Page Load
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(async (result) => {
            const user = result.user;
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              photo: user.photoURL,
            });
            window.localStorage.removeItem("emailForSignIn");
            router.push("/dashboard");
          })
          .catch((error) => {
            console.error("Error signing in with email link:", error);
          });
      }
    }
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailLogin = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    try {
      const res = await fetch("/api/sendSignInLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("emailForSignIn", email);
        alert("Check your inbox!");
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    }
  };

  const iconStyle = "p-4 bg-white shadow-md rounded-2xl hover:scale-105 transition-transform duration-300";

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#6c63ff] flex flex-col justify-center items-center p-10 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" />
         <div className="grid grid-cols-2 gap-6 relative z-10 w-full max-w-sm mx-auto">
      <div className={`animate-float ${iconStyle}`}>
        <NotebookPen className="text-indigo-600 w-8 h-8 mx-auto" />
      </div>
      <div className={`animate-float delay-100 ${iconStyle}`}>
        <CalendarCheck2 className="text-pink-500 w-8 h-8 mx-auto" />
      </div>
      <div className={`animate-float delay-200 ${iconStyle}`}>
        <ChartNoAxesCombined className="text-green-500 w-8 h-8 mx-auto" />
      </div>
      <div className={`animate-float delay-300 ${iconStyle}`}>
        <Rocket className="text-yellow-500 w-8 h-8 mx-auto" />
      </div>
    </div>
        <h2 className="text-[40px] font-clover tracking-wide text-white font-bold mt-10 text-center">
          No More Procrastination,
          <br /> <span className="text-black">Do It</span> Now
        </h2>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-10">
          <div className="text-center mb-6">
          <div className="inline-block p-3 rounded-full mb-3">
  <Image
    src="/user/duoph-icon.png"
    alt="Duoph icon"
    width={80}
    height={80}
    className="block"
  />
</div>
            <h2 className="text-xl text-black font-bold">Nice to see you!</h2>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-red-300 text-red-500 flex items-center justify-center gap-2 py-2 rounded-md mb-3 hover:bg-red-50 transition"
          >
            <FcGoogle className="text-xl" /> Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            className="w-full border text-black border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <button
            onClick={handleEmailLogin}
            className="w-full bg-[#6c63ff] text-white py-2 rounded-md hover:bg-[#554bdf] transition"
          >
            Continue
          </button>

          <p className="text-xs text-center text-gray-400 mt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-500">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500">
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-sm text-center mt-4 text-black">
            Existing member?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
