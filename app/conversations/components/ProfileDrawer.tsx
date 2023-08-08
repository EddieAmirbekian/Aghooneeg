"use client";

import useOtherUser from "@/app/hooks/use-other-user";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useMemo, useState } from "react";
import { Trash2, X } from "lucide-react";
import UserAvatar from "@/app/users/components/UserAvatar";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/Modal";
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const joinedDate = useMemo(
    () => format(new Date(otherUser.createdAt), "PP"),
    [otherUser.createdAt]
  );
  const title = useMemo(
    () => data.name || otherUser.name,
    [data.name, otherUser.name]
  );
  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              onClick={onClose}
                              className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">Close Panel</span>
                              <X size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <UserAvatar user={otherUser} />
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-slate-500">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <Button
                              variant="destructive"
                              onClick={() => setConfirmOpen(true)}
                            >
                              <Trash2 size={20} className="mr-2" />
                              <span className="text-sm">Delete</span>
                            </Button>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-slate-500 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-slate-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-slate-500 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-slate-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
