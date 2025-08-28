"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderSpinner from "@/components/LoaderSpinner";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";
import { useState } from "react";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signInAsGuest = async () => {
    setIsLoading(true);

    let email = "guest@gmail.com";
    let password = "11111111";
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await userCredential.user.getIdToken();
    if (!idToken) {
      toast.error("Sign in Failed. Please try again.");
      return;
    }

    await signIn({
      email,
      idToken,
    });
    toast.success("Signed in as Guest.");
    router.push("/");
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          setIsLoading(false);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
        setIsLoading(false);
      } else {
        let { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          setIsLoading(false);
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      let message = "Something went wrong. Please try again.";
      // Check if the error is a FirebaseError
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            message = "This email is already registered.";
            break;
          case "auth/invalid-credential":
            message = "Please enter a valid email address or password.";
            break;
          case "auth/user-not-found":
            message = "No account found with this email.";
            break;
          case "auth/weak-password":
            message = "Password should be at least 6 characters.";
            break;
          default:
            message = "Authentication failed. Please try again later.";
        }
      } else if (error.message) {
        // in case it's not a FirebaseError
        message = error.message;
      }
      console.error("error:", error);
      toast.error(message);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <h2 className="text-n-2">Brainiac AI</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            {isLoading ? (
              <LoaderSpinner />
            ) : (
              <button
                className={`btn ${isLoading} ? bg-gray-800`}
                type="submit"
                disabled={isLoading}
              >
                {isSignIn ? "Sign In" : "Create an Account"}
              </button>
            )}
          </form>
        </Form>
        <button
          className="btn-secondary"
          onClick={signInAsGuest}
          disabled={isLoading}
        >
          {isLoading ? <LoaderSpinner /> : <p>Or sign in as guest</p>}
        </button>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
