"use client";

import { User } from "@prisma/client";
import { FC, useState } from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/app/hooks/use-toast";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import { Button } from "../ui/Button";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() =>
        toast({
          variant: "destructive",
          description: "Something went wrong",
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-slate-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Create a Group Chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Create a chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  disabled={isLoading}
                  errors={errors?.name?.message as string}
                  required
                />
              </div>
              <div>
                <Select
                  disabled={isLoading}
                  label="Members"
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  onChange={(value) =>
                    setValue("members", value, { shouldValidate: true })
                  }
                  value={members}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button variant="secondary" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-500/90"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
