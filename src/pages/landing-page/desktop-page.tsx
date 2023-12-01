import Layout from "@/components/desktop-layout";
import { useEffect } from "react";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sun, Moon } from "lucide-react";
import { useSetTheme, useTheme } from "@/store/theme";
import { Toaster } from "@/components/ui/toaster";

export default function Page() {
  const theme = useTheme();
  const setTheme = useSetTheme();

  useEffect(() => {
    document.title = "MySocialLink";
  }, []);

  return (
    <Layout>
      <Toaster />
      <div className="mx-auto pointer-events-auto z-20 group py-8">
        <button
          aria-label="Toggle Dark Mode"
          className="block hover:animate-spin dark:hover:animate-bounce focus:animate-spin dark:focus:animate-bounce focus:bg-black focus:bg-opacity-10 dark:focus:bg-opacity-20 rounded-full delay-200 duration-500 ease-in text-slate-600 dark:text-slate-200"
          onClick={setTheme}
        >
          {theme === "light" ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
        </button>
      </div>
      <div className="backdrop-blur-sm absolute h-full flex justify-center items-center pointer-events-auto w-full">
        <div className="max-w-[435px] w-full absolute -translate-x-1/2 -translate-y-1/2 top-[50%] left-1/2 px-4">
          <Tabs defaultValue="login" className="">
            <div className="flex mb-2 p-2 rounded-md justify-between bg-gradient-to-bl from-cyan-300 via-emerald-300 to-sky-300">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent data-[state=active]:ring-2 data-[state=active]:underline ring-white hover:underline dark:data-[state=active]:text-black"
                >
                  <h1>Login</h1>
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent data-[state=active]:ring-2 data-[state=active]:underline ring-white hover:underline dark:data-[state=active]:text-black"
                >
                  <h1>Sign Up</h1>
                </TabsTrigger>
              </TabsList>
            </div>
            <Login />
            <SignUp />
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
