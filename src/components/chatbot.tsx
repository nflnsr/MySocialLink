import Markdown from "react-markdown";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema } from "@/validator/chatbot-form";
import { useForm } from "react-hook-form";
import { selectIsAuth, useAuthStore } from "@/store/auth";
import { selectChatAnswer, useChatbotStore, selectIsLoading } from "@/store/chatbot";
import { cn } from "@/lib/tailwind-merge";
import { openai } from "@/lib/openai-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function Chatbot({ className }: { className?: string }) {
  const chatAnswer = useChatbotStore(selectChatAnswer);
  const isLoading = useChatbotStore(selectIsLoading);
  const chatbot = useChatbotStore();
  const isAuth = useAuthStore(selectIsAuth);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    chatbot.setLoading(true);
    await openai.chat.completions
      .create({
        messages: [{ role: "user", content: data.input }],
        model: "gpt-3.5-turbo",
        max_tokens: 200,
      })
      .then((response) => {
        chatbot.setChatAnswer(response.choices[0].message.content as string);
        chatbot.setLoading(false);
      });
  };

  return (
    <div>
      <h1 className={cn("text-3xl text-center mb-3 font-semibold font-mono bg-gradient-to-tl from-cyan-300 via-emerald-300 to-sky-300 dark:from-blue-500 dark:via-cyan-400 dark:to-sky-500 text-transparent bg-clip-text px-2 pb-1 cursor-default select-none", className)}>
        Ask AI
      </h1>
      <div
        className={cn(
          "bg-gradient-to-br from-emerald-300 via-cyan-300 to-lime-200 dark:bg-gradient-to-br dark:from-sky-900 dark:via-sky-900 dark:to-sky-900 h-[480px] w-[380px] rounded-lg overflow-y-auto [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700",
          className
        )}
      >
        <div className="px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem className="mt-5 space-y-5">
                    <FormLabel className="">
                      <h2 className="ring-2 dark:ring-0 ring-black dark:bg-slate-800 px-5 py-2 mx-5 rounded-md leading-relaxed text-justify">
                        <InfoIcon className="inline-block w-4 pb-[2px]" /> Ask AI how to branding
                        yourself, how to promote yourself with your social media and why you need
                        it, or generate the good colors pallet for your profile theme.
                      </h2>
                    </FormLabel>
                    <FormControl className="">
                      <Textarea
                        className="border-gray-300 h-20"
                        placeholder="for example... why i should use a branding app?"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading || !isAuth}
                className={`mt-4 w-full bg-slate-600 dark:bg-slate-200 ${
                  !isAuth
                    ? "disabled:opacity-100 disabled:pointer-events-auto dark:disabled:hover:bg-opacity-80"
                    : "disabled:opacity-50"
                }`}
                type="submit"
              >
                {!isAuth ? "Login First" : "Submit"}
              </Button>
            </form>
          </Form>
          <div className="mt-5">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : (
              <div className="text-justify mb-6">
                <Markdown>{chatAnswer}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
