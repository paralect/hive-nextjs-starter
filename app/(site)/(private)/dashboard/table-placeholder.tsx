import NoMessage from "./no-message.svg";
import { ReactNode } from "react";
import useUserStore from "@/zustand/userStore";

interface Props {
  action: ReactNode;
}

const TablePlaceholder = ({ action }: Props) => {
  const { user } = useUserStore((state) => state);

  return (
    <div className="flex-col justify-center items-center gap-6 inline-flex">
      <NoMessage />
      <div className="self-stretch h-14 flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-center text-black text-2xl font-bold  leading-normal">
          No projects yet
        </div>
        <div className="self-stretch text-center text-slate-500 text-sm font-normal  leading-normal">
          Add your first project and see the magic!
        </div>
      </div>
      {action}
    </div>
  );
};

export default TablePlaceholder;
