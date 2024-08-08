import Image from "next/image";

interface Props {
  url: string;
}

export const Avatar = () => {
  return (
    <div className="w-9 h-9 justify-center items-center inline-flex">
      <img
        className="w-9 h-9 rounded-full"
        src="https://momentumpage.b-cdn.net/1722349117370-image.png"
        alt="Avatar"
        width={36}
        height={36}
      />
    </div>
  );
};
