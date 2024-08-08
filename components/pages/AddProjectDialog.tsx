import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { POST } from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input'

import {
  Dialog, DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
});

export default ({ isOpen, setIsOpen, onCreated = (p) => { } }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    const newProject = await POST(`projects`, { name });
    onCreated(newProject);
    setIsOpen(false);
    form.reset();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="gap-2 flex">

        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              {/* Upload your file or manually add Linkedln linkedInUrls. */}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-col justify-start items-start gap-1.5 flex">
                    <FormLabel>Project Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        autoFocus
                        className="text-sm font-medium leading-tight text-slate-950 placeholder:font-normal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="px-3 text-sm font-medium rounded-md"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
};

