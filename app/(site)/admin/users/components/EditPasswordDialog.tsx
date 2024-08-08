
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { PUT } from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
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
  password: z.string().nullable(),
});

export const EditPasswordDialog = ({ user, isOpen, setIsOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ''
    }
  },
  );

  if (!user) {
    return null;
  }

  if (user.subscription?.subscribedOn) {
    user.subscription.subscribedOn = new Date(user.subscription.subscribedOn);
  }

  const onSubmit = async ({ password }: z.infer<typeof formSchema>) => {
    await PUT(`users/password`, { password, userId: user._id });
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="gap-2 flex">

        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Password</DialogTitle>
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
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-col justify-start items-start gap-1.5 flex">
                    <FormLabel>Password</FormLabel>

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
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
};

