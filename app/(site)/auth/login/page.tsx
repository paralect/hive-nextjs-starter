"use client";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useUserStore from "@/zustand/userStore";
import useApi from "@/hooks/useApi";
import Message from "@/components/Message";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormButton } from "@/components/ui/CustomForm";
import Logo from "./hive.png";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo");

  const { user, updateUser } = useUserStore((state) => state);
  const [error, setError] = useState(null);

  const postApi = useApi({
    key: ["login"],
    method: "POST",
    url: `auth/login`,
  }, {
    onError: (error) => {
      return setError(error)
    }
  })?.post;

  useEffect(() => {
    if (postApi?.isSuccess) {
      const { accessToken, user } = postApi.data;

      document.cookie = `access_token=${accessToken}; path=/; secure; SameSite=None`;

      updateUser(user);

      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess]);

  useEffect(() => {
    user && router.push((redirectTo as string) || "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user?._id]);

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    setError(null);
    postApi?.mutateAsync(values);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-primary-md min-w-[450px]">
      {error && error.response.data?.errors?.global && <Message type="error" value={error.response.data?.errors?.global} />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-16 py-16 space-y-4 bg-white rounded-lg shadow"
        >

          <div className="p-6 space-y-3">
            <h1 className="text-2xl font-semibold text-slate-950">
              <div className="w-full flex items-center justify-center gap-x-2">
                Welcome to   <div className="flex items-center gap-x-2">
                  <Image src={Logo} alt="Logo" className="w-[20px]"></Image>
                  <div className="text-sm font-semibold leading-normal text-black">
                    Hive
                  </div></div>
              </div>
            </h1>
            <p className="text-sm font-normal leading-tight text-center basis-0 text-slate-500">
              Enter your email below to log into your account
            </p>
          </div>

          <CustomFormField
            form={form}
            name="email"
            label="Email"
            placeholder="elon@tesla.com"
          />
          <CustomFormField
            form={form}
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
          />

          <FormButton
            loading={postApi?.isPending}
            label="Log in"
            className="w-full"
          />
          <div className="w-full text-xs text-center">Don't have account yet? <Link href="/auth/signup">Sign Up</Link></div>
          {/* <FormButton
            label="Sign up"
            className="w-full"
            type="button"
            variant="outline"
            onClick={() => router.push("/auth/register")}
          /> */}
        </form>
      </Form>
    </div>
  );
};

export default Page;
