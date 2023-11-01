import { supabase } from "@/lib/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { formSchema, FormValues } from "@/validator/login-signup-form";
import { useVerifyStore } from "@/store/verify";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ShowPassword } from "./ui/show-password";
import { GoogleIcon } from "./ui/google-icon";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const userId = useVerifyStore();

  const onSubmit = async (values: FormValues) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "http://127.0.0.1:5173/email-confirm",
      },
    });
    if (data) {
      userId.setUserId(data.user!.id);
      setLoading(false);
      navigate(`/verif/${data.user?.id}}`);
    } else if (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <TabsContent value="signup">
      <Card className="min-h-[300px] shadow-[#fcc2ff] shadow-[2px_7px_60px_0_rgba(0,0,0,0.3)]  backdrop-blur-[4px] bg-[rgba(255,255,255,0.25)] rounded-lg">
        <CardContent className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div>
                      <FormLabel>Password</FormLabel>
                      <ShowPassword />
                      <FormControl>
                        <Input id="password" type="password" placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage className="absolute mt-1" />
                    </div>
                  </FormItem>
                )}
              />
              <div>
                <Button className="w-full bg-blue-500/40 mt-4" type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center">or</p>
          <Button
            className="w-full bg-cyan-400 mt-1 gap-1"
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                  },
                },
              })
            }
            disabled={loading}
          >
            <GoogleIcon />
            <span className="pb-[2px]">Sign Up with Google</span>
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
