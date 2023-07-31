"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/Input";
import { z } from "zod";
import { Label } from "./ui/Label";
import { Button } from "./ui/button";
import AuthSocialButton from "./AuthSocialButton";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "SIGNIN" | "SIGNUP";
type AuthFormType = z.infer<typeof authFormSchema>;

const authFormSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Please enter valid email address",
      })
      .min(1, {
        message: "Required",
      }),
    password: z.string().min(1, {
      message: "Required",
    }),
  })
  .or(
    z.object({
      name: z
        .string()
        .min(1, {
          message: "Required",
        })
        .min(4, {
          message: "Minimum 4 characters required",
        })
        .max(40, {
          message: "Maximum 40 characters required",
        }),
      email: z
        .string()
        .email({
          message: "Please enter valid email address",
        })
        .min(1, {
          message: "Required",
        }),
      password: z.string().min(1, {
        message: "Required",
      }),
    })
  );

const AuthForm: FC = () => {
  const [variant, setVariant] = useState<Variant>("SIGNIN");
  const [loading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    if (variant === "SIGNIN") {
      setVariant("SIGNUP");
    } else {
      setVariant("SIGNIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "SIGNUP") {
      // mutate signup
    }

    if (variant === "SIGNIN") {
      // nextauth signin
    }

    // setIsLoading(false);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "SIGNUP" && (
            <div>
              <Label className="mb-1" htmlFor="name">
                Name
              </Label>
              <Input id="name" errors={errors} {...register("name")} />
            </div>
          )}
          <div>
            <Label className="mb-1" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              errors={errors}
              {...register("email")}
            />
          </div>
          <div>
            <Label className="mb-1" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              errors={errors}
              {...register("password")}
            />
          </div>
          <div>
            <Button
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-500/90"
              type="submit"
            >
              {variant === "SIGNIN" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              icon={BsFacebook}
              onClick={() => socialAction("facebook")}
            />
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-slate-500">
          <div>
            {variant === "SIGNIN"
              ? "New to Aghoonig?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "SIGNIN" ? "Create an account" : "Log In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
