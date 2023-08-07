"use client";

import useConversation from "@/app/hooks/use-conversation";
import axios from "axios";
import { Camera, SendHorizonal } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { Button } from "@/components/ui/Button";

const ConversationForm: FC = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", { ...data, conversationId });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    });
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="dbjrktmq"
      >
        <Camera size={30} className="text-cyan-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <Button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 rounded-full p-2"
        >
          <SendHorizonal />
        </Button>
      </form>
    </div>
  );
};

export default ConversationForm;
