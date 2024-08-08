"use client";
import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useUserStore from "@/zustand/userStore";
import useApi from "@/hooks/useApi";
import Message from "@/components/Message";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormButton } from "@/components/ui/CustomForm";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo");

  const { user, updateUser } = useUserStore((state) => state);
  const [error, setError] = useState(null);

  const postApi = useApi({
    key: ["signup"],
    method: "POST",
    url: `auth/signup`,
  }, {
    onError: setError
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
    fullName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    setError(null);
    postApi?.mutateAsync(values);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-primary-md">
      <Form {...form}>
        {error && error.response.data?.errors?.global && <Message type={'error'} value={error.response.data?.errors?.global} />}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-16 space-y-4 bg-white rounded-lg shadow  min-w-[500px]"
        >

          <div className="p-6 space-y-3">
            <h1 className="text-2xl font-semibold text-slate-950">
              <div className="w-full flex items-center justify-center gap-x-2">
                Welcome to Hive
              </div>
            </h1>
            <p className="text-sm font-normal leading-tight text-center basis-0 text-slate-500">
              Create your account
            </p>
          </div>

          <CustomFormField
            form={form}
            name="fullName"
            label="Name"
            placeholder="Elon Musk"
          />
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
            label="Sign Up"
            className="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default Page;
