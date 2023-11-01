import { Button } from "./ui/button";
import { cn } from "@/lib/tailwind-merge";

export function ChangeTheme({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto flex flex-col items-center mt-16", className)}>
      <h1 className="text-center pb-4 text-xl">Let's Custom Your Theme!</h1>
      <div className="flex gap-4">
        <div className="flex flex-col w-40 h-52 border-2 gap-3 border-slate-400 dark:border-slate-200">
          <p className="text-center">Solid Color</p>
          <div className="flex mx-auto gap-2">
            <label htmlFor="">full color</label>
            <input id="solid" type="color" defaultValue="#fff" />
          </div>
        </div>
        <div className="flex flex-col w-40 h-52 border-2 gap-3 border-slate-400 dark:border-slate-200">
          <p className="text-center">Gradient Color</p>
          <div className="flex gap-2 justify-between px-4">
            <label htmlFor="">direction</label>
            <select name="" className="w-12 ring-2 ring-slate-400 dark:text-black" defaultValue="">
              <option value=" "> </option>
              <option value="">top to bottom</option>
              <option value="">bottom to top</option>
              <option value="">right to left</option>
              <option value="">left to right</option>
              <option value="">top-left to bottom-right</option>
              <option value="">top-right to bottom left</option>
              <option value="">bottom-right to top-left</option>
              <option value="">bottom-left to top-right</option>
            </select>
          </div>
          <div className="flex gap-2 justify-between px-4">
            <label htmlFor="">from</label>
            <input id="solid" type="color" defaultValue="#D9F99D" />
          </div>
          <div className="flex gap-2 justify-between px-4">
            <label htmlFor="">via</label>
            <input id="solid" type="color" defaultValue="#A5F3FC" />
          </div>
          <div className="flex gap-2 justify-between px-4">
            <label htmlFor="">to</label>
            <input id="solid" type="color" defaultValue="#62E9E6" />
          </div>
        </div>
      </div>
      <Button className="mt-4 w-[335px] bg-slate-500 dark:bg-slate-200 dark:text-black hover:bg-slate-400">
        Apply
      </Button>
    </div>
  );
}
