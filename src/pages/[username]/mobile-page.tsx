import Layout from "@/components/mobile-layout";
import { supabase } from "@/lib/supabase-client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetTheme, useTheme } from "@/store/theme";
import { Avatar } from "@/components/avatar";
import "react-device-frameset/styles/marvel-devices.min.css";
import SocmedList from "@/components/socmed-list";
import Sidebar from "@/components/sidebar";
import { Menu, X, Sun, Moon, Undo2 } from "lucide-react";
import { OpenGraph } from "@/components/open-graph";
import whatsappIcon from "/assets/whatsapp.svg";
import instagramIcon from "/assets/instagram.svg";
import linkedinIcon from "/assets/linkedin.svg";
import githubIcon from "/assets/github.svg";
import gmailIcon from "/assets/gmail.svg";

const Mobile = () => {
  const [showSideBar, setShowSidebar] = useState(false);
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [publicImgUrl, setPublicImgUrl] = useState("");
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

  const username = useParams<{ username: string }>().username;
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();
      if (data === null) navigate("/");
      console.log(data);
      setUserData(data);
    }
    getProfile();
  }, [navigate, username]);

  useEffect(() => {
    async function getAvatar() {
      const { publicUrl } = supabase.storage.from("avatars").getPublicUrl(userData.avatar_url).data;
      setPublicImgUrl(publicUrl);
    }
    getAvatar();
  });

  useEffect(() => {
    document.title = userData.full_name || "MySocialLink";
  }, [userData.full_name]);

  useEffect(() => {
    const avatarBg = document.getElementById("avatar_url") as HTMLImageElement;
    if (showSideBar && theme === "dark") {
      avatarBg.classList.add("bg-deep-blue/100");
    } else {
      avatarBg.classList.remove("bg-deep-blue/100");
    }
  }, [showSideBar, theme]);

  const socialLink = [
    {
      logo: whatsappIcon,
      link: userData.whatsapp,
      width: "31px",
      height: "31px",
      text: "WhatsApp",
    },
    {
      logo: instagramIcon,
      link: userData.instagram,
      width: "30px",
      height: "30px",
      text: "Instagram",
    },
    {
      logo: linkedinIcon,
      link: userData.linkedin,
      width: "28px",
      height: "28px",
      text: "LinkedIn",
    },
    { logo: githubIcon, link: userData.github, width: "30px", height: "30px", text: "GitHub" },
    {
      logo: gmailIcon,
      link: `mailto:${userData.gmail}`,
      width: "30px",
      height: "30px",
      text: "Gmail",
    },
  ];

  return (
    <div className="flex w-screen bg-black">
      <OpenGraph username={userData.username} full_name={userData.full_name} image={publicImgUrl} />
      <div className="min-h-screen flex items-center mx-auto w-full">
        <div id="desktop" className="w-full">
          <Layout className="pointer-events-auto">
            <div id="divMenuIcon" className="mt-5 flex justify-between px-3">
              <Undo2
                className="cursor-pointer hover:bg-black hover:bg-opacity-[0.08]"
                onClick={() => navigate("/profile")}
              />
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
                mobileSidebar=" h-[93.5%] mt-[20px] w-[calc(50%+65px)] "
                userData={userData}
              />
            ) : null}

            <div className="mx-auto py-1">
              <button
                aria-label="Toggle Dark Mode"
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
                {socialLink.map((link, index) => (
                  <SocmedList
                    key={index}
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
