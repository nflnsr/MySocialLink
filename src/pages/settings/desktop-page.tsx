import Layout from "@/components/desktop-layout";
import { supabase } from "@/lib/supabase-client";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectSession, useAuthStore } from "@/store/auth";
import { Session } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { FormValues, formSchema } from "@/validator/settings-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Undo2 } from "lucide-react";
import { Logout } from "@/pages/settings/components/logout";
import { Avatar } from "@/components/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userDataAPI } from "@/APIs/userdata-api";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const session: Session = useAuthStore(selectSession) as Session;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    full_name: "",
    username: "",
    greeting: "",
    about: "",
    whatsapp: "",
    instagram: "",
    linkedin: "",
    github: "",
    gmail: "",
    avatar_url: "",
  });

  useEffect(() => {
    document.title = "Settings";
  }, []);

  useEffect(() => {
    function getProfile() {
      setError(null);
      const userData = session as Session;
      try {
        userDataAPI.getUserData(userData.user.id).then((data) => {
          setUserData((prevUserData) => ({
            ...prevUserData,
            ...data,
          }));
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
    return () => getProfile();
  }, [session]);

  useEffect(() => {
    if (error)
      toast({
        description: error,
        className:
          "max-w-[300px] border-red-500 text-red-500 w-fit text-center fixed top-[12%] left-[50%] -translate-x-1/2 py-2",
        duration: 1500,
      });
  }, [error]);

  async function updateProfile(event: React.FormEvent<HTMLFormElement>, avatar_url: string) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username: userData.username,
      full_name: userData.full_name,
      greeting: userData.greeting,
      about: userData.about,
      whatsapp: userData.whatsapp,
      instagram: userData.instagram,
      linkedin: userData.linkedin,
      github: userData.github,
      gmail: userData.gmail,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setUserData((userData) => ({ ...userData, avatar_url }));
    }
    setLoading(false);
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      full_name: userData.full_name,
      username: userData.username,
      greeting: userData.greeting,
      about: userData.about,
      whatsapp: userData.whatsapp,
      instagram: userData.instagram,
      linkedin: userData.linkedin,
      github: userData.github,
      gmail: userData.gmail,
      avatar_url: userData.avatar_url,
    },
    defaultValues: {
      full_name: "",
      username: "",
      greeting: "",
      about: "",
      whatsapp: "",
      instagram: "",
      linkedin: "",
      github: "",
      gmail: "",
      avatar_url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    const { user } = session;

    const updates = {
      id: user.id,
      username: data.username,
      full_name: data.full_name,
      greeting: data.greeting,
      about: data.about,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      linkedin: data.linkedin,
      github: data.github,
      gmail: data.gmail,
      avatar_url: data.avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      setError(error.message);
    } else {
      setUserData((userData) => ({ ...userData, avatar_url: data.avatar_url as string }));
      navigate(0);
    }
    setLoading(false);
  };

  const copy = (text: string) => {
    if (text === "" || text === null) {
      toast({
        description: "set your username fisrt",
        className:
          "border-red-500 text-red-500 w-fit text-center fixed top-[12%] left-1/2 -translate-x-1/2 py-2",
        duration: 2500,
      });
      return;
    }
    navigator.clipboard.writeText(`https://mysociallink.vercel.app/${text}`);
    setIsCopied(true);
    toast({
      description: "link has been copied",
      className:
        "border-sky-500 text-sky-500 w-fit text-center fixed top-[12%] left-1/2 -translate-x-1/2 py-2",
      duration: 1000,
    });
  };

  return (
    <div>
      <div>
        <Layout className="pointer-events-auto overflow-y-scroll [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          <Toaster />
          <div className="mt-5 flex justify-between px-3">
            <Undo2
              className="cursor-pointer hover:bg-black hover:bg-opacity-[0.08]"
              onClick={() => navigate("/profile")}
            />
            <Logout />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 text-center">
              <Avatar
                url={userData.avatar_url}
                isEdit
                onUpload={(event, url) => {
                  updateProfile(event as unknown as React.FormEvent<HTMLFormElement>, url);
                }}
                username={userData.username}
              />
              <div className="flex bg-white dark:bg-slate-600 w-fit rounded-md mx-auto items-center my-2">
                <div className="pl-4 pr-3 pb-[2px]">
                  your-link/{userData.username ? userData.username : "<username>"}
                </div>
                <div
                  className="w-7 h-7 rounded-e-md bg-slate-300 relative cursor-pointer"
                  onClick={() => copy(userData.username)}
                >
                  {!isCopied ? (
                    <Copy className="w-5 h-5 my-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  ) : (
                    <Check className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <fieldset className="px-3 border-2 border-slate-400 dark:border-slate-200 pb-4">
                  <legend className="text-left px-2">Profile</legend>
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="Your Name"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="username123"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="greeting"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Greeting</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="Hello there, I'm Jhon!"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={`I'm an Informatic's Student at Harvard University. My passion is being a Fullstack Developer.\nI love to work with Modern JavaScript and TypeScript ecosystem, especially React and Next JS.\nI'm still looking for great opportunity. If you have any interesting, feels free to contact me anytime.`}
                            className="resize-none h-28 dark:bg-gray-800"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                </fieldset>
                <fieldset className="px-3 border-2 border-slate-400 dark:border-slate-200 pb-4">
                  <legend className="text-left px-2">Social Links</legend>
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="whatsapp link"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="instagram link"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="linkedin link"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="github link"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gmail"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Gmail</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:bg-gray-800"
                            type="text"
                            placeholder="gmail account"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-left" />
                      </FormItem>
                    )}
                  />
                </fieldset>
              </div>
              <div className="py-4 w-full">
                <Button
                  className="w-full bg-slate-700 hover:bg-slate-600 dark:text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </Layout>
      </div>
    </div>
  );
}
