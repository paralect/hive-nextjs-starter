"use client";

import moment from "moment";
import useUserStore from "@/zustand/userStore";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Billing from "@/components/pages/Billing";
import { LogOut, Trash2 } from "lucide-react";
import Cookies from 'js-cookie';
import { useState } from "react";

import { POST, PUT } from "@/lib/api";

const Settings = () => {
  const { user } = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const [inviteEmail, setInviteEmail] = useState('');

  return (
    <section className="flex-col justify-start items-start flex">
      <header className="w-full p-8 flex justify-between items-start">
        <div className="flex-col justify-start items-start gap-1.5 flex grow">
          <div className="flex justify-center items-center">
            <h1 className="text-slate-950 text-2xl font-semibold  leading-normal">
              Settings
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <p className="grow text-slate-500 text-sm font-normal  leading-tight">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
        </div>
      </header>
      <section className="p-8 rounded-lg flex-col justify-start items-start gap-6 flex w-full">
        <div className="w-full pr-32 pb-6 flex justify-start items-start gap-8">
          <div className="flex-col justify-start items-start gap-8 flex grow">
            <div className="w-full flex-col justify-start items-start gap-6 flex">
              <div className="w-full flex justify-between items-start">
                <div className="flex-col justify-start items-start gap-6 flex grow">
                  <h2 className="text-slate-950 text-base font-medium  leading-tight">
                    Your subscription
                  </h2>
                  <div className="flex justify-between items-center gap-16">
                    <div className="flex-col justify-start items-start gap-1 flex w-[158px]">
                      <h3 className="text-slate-950 text-xl font-semibold  leading-7">
                        {user.subscription?.planName || 'Free trial'}
                      </h3>
                      {user.subscription && (
                        <p className="text-slate-500 text-sm font-normal  leading-tight">
                          {moment(user.subscription.subscribedOn).add('4', 'months').format('MMM DD, YYYY')}
                        </p>)}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild className="gap-2 flex">
                        <Button
                          variant="outline"
                          className="px-4 py-2 border-slate-200"
                        >
                          Manage billing
                        </Button>
                      </DialogTrigger>
                      <Billing></Billing>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="w-full bg-primary-md h-px" />
            </div>
            <div className="w-full flex-col justify-start items-start gap-6 flex pb-6 border-b border-slate-200">
              <div className="w-full flex-col justify-start items-start gap-1 flex">
                <h2 className="text-slate-950 text-base font-medium  leading-tight">
                  Team
                </h2>
                <p className="text-slate-500 text-sm font-normal  leading-tight">
                  Add emails of your team members
                </p>
              </div>
              <div className="w-full flex-col gap-2 flex">
                <div className="w-full flex justify-start items-start gap-3">
                  <Input
                    placeholder="igor@paralect.com"
                    className="text-slate-950 text-sm font-normal leading-tight shadow-sm"
                    value={inviteEmail}
                    onChange={(e) => { setInviteEmail(e.target.value); }}
                  />
                  <Button
                    variant="outline"
                    className="px-4 py-2 border-slate-200 w-[69px]"
                    onClick={async () => {
                      setInviteEmail('');
                    }}
                  >
                    Invite
                  </Button>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="text-slate-950 text-sm font-medium leading-normal gap-2.5 mt-16"
              onClick={() => {
                const cookies = Cookies.get();
                for (const cookieName in cookies) {
                  Cookies.remove(cookieName);
                }
                setUser(null);
                router.push('/auth/login');
              }}
            >
              Log out
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Settings;
