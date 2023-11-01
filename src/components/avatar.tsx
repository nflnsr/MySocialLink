import defaultPicture from "/assets/default-pp.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AvatarProps = {
  url: string;
  isEdit: boolean;
  onUpload?: (event: React.ChangeEvent<HTMLInputElement>, filePath: string) => void;
  username?: string;
};

export function Avatar({ url, onUpload, isEdit, username }: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from("avatars").download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: unknown) {
      setAvatarUrl(defaultPicture);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      if (onUpload) {
        onUpload(event, filePath);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  async function deleteAvatar(username: string) {
    try {
      await supabase.rpc("delete_avatar", {
        avatar_url: url,
      });

      await supabase.from("profiles").update({ avatar_url: "" }).eq("username", username);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center space-x-2 w-fit mx-auto">
            <img
              id="avatar_url"
              src={avatarUrl || defaultPicture}
              alt="Avatar"
              className="hover:shadow-[inset_-3px_6px_10px_rgba(0,0,0,0.60)] transition-shadow duration-700 rounded-full w-28 h-28 bg-opacity-[21%] bg-black shadow-[inset_6px_8px_6px_rgba(0,0,0,0.25)] z-20 bg-blend-multiply outline-none"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <img src={avatarUrl || defaultPicture} alt="Avatar" className="rounded-full border-2" />
          </div>
        </DialogContent>
      </Dialog>
      {isEdit && (
        <div className="text-center py-2 space-x-2">
          <label className="bg-blue-400/50 px-2 rounded-lg pb-1 cursor-pointer" htmlFor="single">
            {uploading ? "Uploading ..." : "Change"}
          </label>
          <input
            className="hidden absolute"
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <label
            className="bg-red-500/70 px-2 rounded-lg pb-1 cursor-pointer"
            onClick={() => deleteAvatar(username as string)}
          >
            Delete
          </label>
        </div>
      )}
    </div>
  );
}
