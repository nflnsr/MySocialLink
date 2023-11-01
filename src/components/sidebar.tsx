type SidebarProps = {
  userData: {
    full_name: string;
    about: string;
    greeting: string;
  };
  mobileSidebar?: string;
  desktopSideBar?: string;
};

const Sidebar = ({ userData, mobileSidebar, desktopSideBar }: SidebarProps) => {
  return (
    <div
      id="sideBar"
      className={` ${mobileSidebar} ${desktopSideBar} self-end opacity-100 absolute rounded-tl-[4rem] bg-gradient-to-b from-[#D2F19C] via-[#7EFEFB] to-[#A5F3FC] dark:from-[#B4E5FF] dark:via-[#9DF1FF] dark:to-[#9DF1FF]`}
    >
      <div className="py-10 dark:text-slate-600">
        <p className={`text-black text-2xl font-semibold ${desktopSideBar ? "mt-2 me-0 text-center" : "-mt-1 text-center"}`}>
          {userData.full_name}
        </p>
        <div className="flex items-center justify-center h-[130px] my-auto mb-2">
          <p className="my-auto w-20 leading-tight ml-auto me-7 text-xl whitespace-break-spaces">
            {userData.greeting ? userData.greeting.replace(/ /g, "\n") : ""}
          </p>
        </div>
        <p className="px-6 text-justify whitespace-pre-line">{userData.about}</p>
      </div>
    </div>
  );
};

export default Sidebar;
