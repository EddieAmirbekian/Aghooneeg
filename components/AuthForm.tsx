"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/Input";
import { z } from "zod";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { useToast } from "@/app/hooks/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "SIGNIN" | "SIGNUP";
type SignInFormType = z.infer<typeof signInSchema>;
type SignUpFormType = z.infer<typeof signUpSchema>;

const signInSchema = z.object({
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
});

const signUpSchema = z.object({
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
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

const SignInForm: FC<{
  loading: boolean;
  onSubmit: SubmitHandler<FieldValues>;
}> = ({ loading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label className="mb-1" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          errors={errors?.email?.message}
          disabled={loading}
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
          errors={errors?.password?.message}
          disabled={loading}
          {...register("password")}
        />
      </div>
      <div>
        <Button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-500/90"
          type="submit"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

const SignUpForm: FC<{
  loading: boolean;
  onSubmit: SubmitHandler<FieldValues>;
}> = ({ loading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label className="mb-1" htmlFor="name">
          Name
        </Label>
        <Input
          id="name"
          type="name"
          errors={errors?.name?.message}
          disabled={loading}
          {...register("name")}
        />
      </div>
      <div>
        <Label className="mb-1" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          errors={errors?.email?.message}
          disabled={loading}
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
          errors={errors?.password?.message}
          disabled={loading}
          {...register("password")}
        />
      </div>
      <div>
        <Button
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-500/90"
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

const AuthForm: FC = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<Variant>("SIGNIN");
  const { toast } = useToast();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "SIGNIN") {
      setVariant("SIGNUP");
    } else {
      setVariant("SIGNIN");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "SIGNUP") {
      axios
        .post("/api/register", data)
        .then(() => signIn('credentials', data))
        .catch(() => {
          toast({
            description: "Something went wrong!",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (variant === "SIGNIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              description: "Invalid credentials!",
              variant: "destructive",
            });
          } else if (callback?.ok) {
            toast({
              title: "Success",
              description: "Logged in successfully!",
            });
            router.push('/users');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            description: "Invalid credentials!",
            variant: "destructive",
          });
        } else if (callback?.ok) {
          toast({
            title: "Success",
            description: "Logged in successfully!",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        {variant === "SIGNIN" ? (
          <SignInForm loading={isLoading} onSubmit={onSubmit} />
        ) : (
          <SignUpForm loading={isLoading} onSubmit={onSubmit} />
        )}
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
              disabled={isLoading}
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
            <AuthSocialButton
              disabled={isLoading}
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-slate-500">
          <div>
            {variant === "SIGNIN"
              ? "New to Aghooneeg?"
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
