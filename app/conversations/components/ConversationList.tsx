"use client";

import useConversation from "@/app/hooks/use-conversation";
import { FullConversation } from "@/app/types";
import clsx from "clsx";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "@/components/Sidebar/GroupChatModal";
import { User } from "@prisma/client";

interface ConversationListProps {
  initialItems: FullConversation[];
  users: User[];
}

const ConversationList: FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState<FullConversation[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-slate-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4 items-center">
            <div className="text-2xl font-bold text-slate-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-slate-100 text-slate-600 cursor-pointer hover:opacity-75 transition"
            >
              <UserPlus size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
