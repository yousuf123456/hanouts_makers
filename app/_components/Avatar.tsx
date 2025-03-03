import Image from "next/image";
import React from "react";

interface AvatarProps {
  imageUrl: string;
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  return (
    <div className="w-full h-full relative rounded-full overflow-hidden">
      <Image
        src={imageUrl || "/placeHolders/placeholder.jpg"}
        alt="Avatar Photo"
        className=" object-cover"
        fill
      />
    </div>
  );
};
