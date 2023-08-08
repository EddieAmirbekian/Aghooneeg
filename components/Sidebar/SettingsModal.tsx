"use client";

import { useToast } from "@/app/hooks/use-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "../Modal";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "../ui/Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() =>
        toast({
          description: "Something went wrong!",
          variant: "destructive",
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-slate-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Edit your public information
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  disabled={isLoading}
                  id="name"
                  errors={errors?.name?.message as string}
                  {...register("name")}
                />
              </div>
              <div>
                <Label>Photo</Label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={image || currentUser?.image || "placeholder.jpg"}
                    alt="avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="dbjrktmq"
                  >
                    <Button disabled={isLoading} variant="secondary">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={onClose}
              className="bg-cyan-500 hover:bg-cyan-500/90"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
