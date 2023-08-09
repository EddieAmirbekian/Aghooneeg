import useActiveList from "@/app/hooks/use-active-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { User } from "@prisma/client";
import { FC } from "react";

interface UserAvatarProps {
  user: User;
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  const getFallback = () => {
    if (!user) {
      return '';
    }
    return user
      .name!.split(" ")
      .slice(0, 2)
      .map((curr) => curr.charAt(0).toUpperCase())
      .join();
  };
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src={user?.image!} alt={user?.name!} />
        <AvatarFallback>{getFallback()}</AvatarFallback>
      </Avatar>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white bottom-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default UserAvatar;
