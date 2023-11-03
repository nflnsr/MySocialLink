import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formSchema, FormValues } from "@/validator/login-signup-form";
import { useVerifyStore } from "@/store/verify";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/APIs/auth-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ShowPassword } from "./ui/show-password";
import { GoogleIcon } from "./ui/google-icon";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
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
  const [error, setError] = useState<string | null>(null);
  const userId = useVerifyStore();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error)
      toast({
        description: error,
        className:
          "border-red-500 text-red-500 w-fit text-center fixed top-[12%] left-[52%] -translate-x-1/2 py-2",
        duration: 1500,
      });
  }, [error]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await authAPI.signUpWithPassword(values).then((data) => {
        userId.setUserId(data.user!.id);
        navigate(`/verif/${data.user?.id}}`);
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      await authAPI.signInWithGoogle();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
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
                  {loading ? "loading ..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center">or</p>
          <Button
            className="w-full bg-cyan-400 mt-1 gap-1"
            onClick={() => googleSignIn()}
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
