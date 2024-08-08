
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
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
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const AddUserButtonDialog = ({ onCreated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ fullName, email, password }: z.infer<typeof formSchema>) => {
    const user = await POST(`users`, { fullName, email, password });
    setIsOpen(false);
    onCreated(user);
  };

  return (<Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild className="gap-2 flex">
      <Button
        variant="ghost"
        className="py-1 text-sm font-medium leading-normal rounded-md text-primary-foreground"
      >
        Create User
      </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create User</DialogTitle>
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
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex-col justify-start items-start gap-1.5 flex">
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    className="text-sm font-medium leading-tight text-slate-950 placeholder:font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-col justify-start items-start gap-1.5 flex">
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className="text-sm font-medium leading-tight text-slate-950 placeholder:font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-col justify-start items-start gap-1.5 flex">
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    {...field}
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
              Create User
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>)
};

