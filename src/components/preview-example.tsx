import { BadgeInfo } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ViewExample() {
  return (
    <div>
      <div className="mt-8 text-center font-sans text-lg mb-1">Dekstop Auto Display</div>
      <div className="flex justify-between px-3 bg-gradient-to-br from-emerald-300 via-cyan-300 to-lime-200 dark:bg-gradient-to-br dark:from-sky-800 dark:via-sky-800 dark:to-sky-800 pb-5 mx-5 rounded-md">
        <Dialog>
          <DialogTrigger asChild>
            <div className="text-center">
              <label htmlFor="dekstop-light">Light Mode</label>
              <img
                id="desktop-light"
                className="w-[230px] mt-1"
                src="/assets/desktop-light.png"
                alt=""
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Preview Desktop Light Mode</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <img src="/assets/desktop-light.png" alt="Avatar" className="border-2" />
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <div className="text-center">
              <label htmlFor="desktop-dark">Dark Mode</label>
              <img
                id="desktop-dark"
                className="w-[230px] mt-1"
                src="/assets/desktop-dark.png"
                alt=""
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Preview Desktop Dark Mode</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <img src="/assets/desktop-dark.png" alt="Avatar" className="border-2" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-5 text-center font-sans text-lg mb-1">Mobile Auto Display</div>
      <div className="flex justify-evenly max-w-[320px] mx-auto bg-gradient-to-tr from-emerald-300 via-cyan-300 to-lime-200 dark:bg-gradient-to-br dark:from-sky-800 dark:via-sky-800 dark:to-sky-800 pb-5 rounded-md">
        <Dialog>
          <DialogTrigger asChild>
            <div className="text-center">
              <label htmlFor="dekstop-light">Light Mode</label>
              <img
                id="desktop-light"
                className="h-[210px] mt-1"
                src="/assets/mobile-light.png"
                alt=""
              />
            </div>
          </DialogTrigger>
          <DialogContent className="top-[50%] left-[52%] max-w-[580px] ">
            <DialogHeader>
              <DialogTitle>Preview Mobile Light Mode</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 px-32">
              <img src="/assets/mobile-light.png" alt="Avatar" className="border-2" />
            </div>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <div className="text-center">
              <label htmlFor="desktop-dark">Dark Mode</label>
              <img
                id="desktop-dark"
                className="h-[210px] mt-1"
                src="/assets/mobile-dark.png"
                alt=""
              />
            </div>
          </DialogTrigger>
          <DialogContent className="top-[50%] left-[52%] max-w-[580px] ">
            <DialogHeader>
              <DialogTitle>Preview Mobile Dark Mode</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 px-32">
              <img src="/assets/mobile-dark.png" alt="Avatar" className="border-2" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto text-center mt-5 bg-gradient-to-br from-emerald-300 via-cyan-300 to-lime-200 dark:bg-gradient-to-br dark:from-sky-800 dark:via-sky-800 dark:to-sky-800 w-fit px-2 rounded-lg">
        <BadgeInfo className="inline-block pb-1" /> click the image to preview
      </div>
      <div>
        <h2></h2>
      </div>
    </div>
  );
}
