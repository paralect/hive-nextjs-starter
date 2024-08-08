"use client"
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import _ from 'lodash';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import formatDollars from "@/lib/formatDollars";
import plans from '@/lib/constants/plans';

const Billing = () => {
  return (
    <DialogContent className="p-6 min-w-[666px]">
      <DialogHeader>
        <DialogTitle className="text-center">Upgrade your account</DialogTitle>
        <DialogDescription className="text-center">
          Talk to igor@paralect.com for more details
        </DialogDescription>
      </DialogHeader>

      <Tabs
        defaultValue="monthly"
        className="flex flex-col items-center"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        {['monthly', 'yearly'].map((payPer) => {
          return (<TabsContent
            key={payPer}
            value={payPer}
            className="w-full"
          >
            <div className="grid grid-cols-2 w-full">
              <div className="flex mr-4 flex-col justify-between flex-grow bg-white border rounded-lg shadow border-slate-200">
                <div>
                  <div className="p-6 text-sm font-semibold leading-tight text-slate-950">
                    Trial
                  </div>
                  <div className="p-6 border-t border-slate-200">
                    <div className="text-2xl font-bold leading-normal text-slate-950">
                      $0.00
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-xs font-normal leading-tight text-slate-500">
                        ✔️ some basic feature
                      </div>
                      <div className="text-xs font-normal leading-tight text-slate-500">
                        ✔️ another feature
                      </div>
                      <div className="text-xs font-normal leading-tight text-slate-500">
                        ✔️ and another feature
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="m-4 block text-sm font-medium leading-normal text-center rounded-md " disabled>
                  Buy
                </Button>
              </div>

              <div className="flex flex-col justify-between flex-grow bg-white border rounded-lg shadow border-slate-200">
                <div>
                  <div className="p-6 text-sm font-semibold leading-tight text-slate-950">
                    {_.capitalize(payPer)}
                  </div>
                  <div className="p-6 border-t border-slate-200 bg-primary/10">
                    <div className="text-2xl font-bold leading-normal text-slate-950">
                      {formatDollars(plans.find(p => p.payPer === payPer).price)}
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-xs font-normal leading-tight text-slate-500">
                        ✔️ awesome feature
                      </div>
                      <div className="text-xs font-normal leading-tight text-slate-500">
                        ✔️ great feature
                      </div>
                      <div className="text-xs font-normal leading-tight text-slate-500">
                        ✔️ another feature
                      </div>
                    </div>
                  </div>
                </div>
                <Link className="m-4 block" target="_blank" href={plans.find(p => p.payPer === payPer).url}>
                  <Button className="text-sm font-medium leading-normal text-center rounded-md w-full" >
                    Buy
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>)
        })}

      </Tabs>
    </DialogContent>
  );
};

export default Billing;
