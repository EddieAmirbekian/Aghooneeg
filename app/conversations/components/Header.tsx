"use client";

import useOtherUser from "@/app/hooks/use-other-user";
import UserAvatar from "@/app/users/components/UserAvatar";
import { Conversation, User } from "@prisma/client";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
import UserAvatarGroup from "@/app/users/components/UserAvatarGroup";
import useActiveList from "@/app/hooks/use-active-list";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const {members} = useActiveList();
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return members.indexOf(otherUser?.email!) === -1 ? "Active" : "Offline";
  }, [conversation, members, otherUser]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-cyan-500 hover:text-cyan-600 transition cursor-pointer"
          >
            <ChevronLeft />
          </Link>
          {conversation.isGroup ? (
            <UserAvatarGroup users={conversation.users} />
          ) : (
            <UserAvatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-slate-500">
              {statusText}
            </div>
          </div>
        </div>
        <MoreHorizontal
          onClick={() => setDrawerOpen(true)}
          className="text-cyan-500 hover:text-cyan-600 cursor-pointer transition"
        />
      </div>
    </>
  );
};

export default Header;
