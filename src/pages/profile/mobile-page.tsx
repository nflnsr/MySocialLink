import Layout from "@/components/mobile-layout";
import { selectSession, useAuthStore } from "@/store/auth";
import { Session } from "@supabase/supabase-js";
import { Menu, X, Sun, Moon, UserCog } from "lucide-react";
import { useState, useEffect } from "react";
import { useSetTheme, useTheme } from "@/store/theme";
import { userDataAPI } from "@/APIs/userdata-api";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/avatar";
import { toast } from "@/components/ui/use-toast";
import "react-device-frameset/styles/marvel-devices.min.css";
import SocmedList from "@/components/socmed-list";
import whatsappIcon from "/assets/whatsapp.svg";
import instagramIcon from "/assets/instagram.svg";
import linkedinIcon from "/assets/linkedin.svg";
import githubIcon from "/assets/github.svg";
import gmailIcon from "/assets/gmail.svg";
import Sidebar from "@/components/sidebar";

const Mobile = () => {
  const [error, setError] = useState<string | null>(null);
  const [showSideBar, setShowSidebar] = useState(false);
  const session: Session = useAuthStore(selectSession) as Session;
  const theme = useTheme();
  const setTheme = useSetTheme();
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
    const avatarBg = document.getElementById("avatar_url") as HTMLImageElement;
    if (showSideBar && theme === "dark") {
      avatarBg.classList.add("bg-deep-blue/100");
    } else {
      avatarBg.classList.remove("bg-deep-blue/100");
    }
  }, [showSideBar, theme]);

  useEffect(() => {
    document.title = userData.full_name || "MySocialLink - Profile";
  }, [userData.full_name]);

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
          "border-red-500 text-red-500 w-fit text-center fixed top-[12%] left-[52%] -translate-x-1/2 py-2",
        duration: 1500,
      });
  }, [error]);

  const socialLink = [
    {
      id: 1,
      logo: whatsappIcon,
      link: "https://api.whatsapp.com/send?phone=" + userData.whatsapp,
      width: "31px",
      height: "31px",
      text: "WhatsApp",
    },
    {
      id: 2,
      logo: instagramIcon,
      link: "https://www.instagram.com/" + userData.instagram,
      width: "30px",
      height: "30px",
      text: "Instagram",
    },
    {
      id: 3,
      logo: linkedinIcon,
      link: "https://www.linkedin.com/in/" + userData.linkedin,
      width: "28px",
      height: "28px",
      text: "LinkedIn",
    },
    {
      id: 4,
      logo: githubIcon,
      link: "https://github.com/" + userData.github,
      width: "30px",
      height: "30px",
      text: "GitHub",
    },
    {
      id: 5,
      logo: gmailIcon,
      link: `mailto:${userData.gmail}`,
      width: "30px",
      height: "30px",
      text: "Gmail",
    },
  ];

  return (
    <div className="flex w-screen bg-black">
      <div className="min-h-screen flex items-center mx-auto w-full">
        <div className="w-full">
          <Layout className="pointer-events-auto">
            <div id="divMenuIcon" className="mt-5 flex justify-between px-3">
              <div className="">
                <Link to="/settings">
                  <button className="block">
                    <UserCog className="hover:bg-black hover:bg-opacity-[0.08] w-6 h-fit" />
                  </button>
                </Link>
              </div>
              <div className="z-20">
                <button
                  className="block"
                  onClick={() => {
                    setShowSidebar(!showSideBar);
                  }}
                >
                  {!showSideBar ? (
                    <Menu
                      id="menuIcon"
                      className={`hover:bg-black hover:bg-opacity-[0.08] w-fit h-fit`}
                    />
                  ) : (
                    <X className={`w-[23px] dark:text-slate-600`} />
                  )}
                </button>
              </div>
            </div>

            {showSideBar ? (
              <Sidebar
                mobileSidebar=" h-[93.5%] mt-[15px] w-[calc(50%+65px)] "
                userData={userData}
              />
            ) : null}

            <div className="mx-auto py-1">
              <button
                className="block hover:animate-spin dark:hover:animate-bounce focus:animate-spin dark:focus:animate-bounce focus:bg-black focus:bg-opacity-10 dark:focus:bg-opacity-20 rounded-full delay-200 duration-500 ease-in text-slate-600 dark:text-slate-200"
                onClick={setTheme}
              >
                {theme === "light" ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
              </button>
            </div>
            <div id="photoProfile" className="w-fit mx-auto py-3 z-20">
              <Avatar url={userData.avatar_url} isEdit={false} />
            </div>
            <div className="py-4">
              <div className="w-fit m-auto gap-[16px] grid">
                {socialLink.map((link) => (
                  <SocmedList
                    key={link.id}
                    gambar={link.logo}
                    width={link.width}
                    height={link.height}
                    text={link.text}
                    link={link.link}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-inter whitespace-nowrap text-[12px] text-[#737373] bottom-2 absolute -translate-x-1/2 left-1/2 dark:text-[#dfdfdf]">
                Copyright © 2023 Naufal Nasrullah ∙ All Rights Reserved
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
