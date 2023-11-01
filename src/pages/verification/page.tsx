import { cn } from "@/lib/tailwind-merge";
import { useVerifyStore } from "@/store/verify";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectSession, useAuthStore } from "@/store/auth";
import { BellRing, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export default function Page({ className, ...props }: CardProps) {
  const [status, setStatus] = useState(false);
  const [temp, setTemp] = useState("");
  const id = useVerifyStore((state) => state.userId);
  const navigate = useNavigate();
  const session = useAuthStore(selectSession);
  const userEmail = session?.user.email;

  useEffect(() => {
    if (id !== "") {
      setTemp(id);
    } else if (temp === "") {
      navigate("/");
    }
    if (session) {
      setStatus(true);
    }
  }, [id, navigate, session, temp]);

  useEffect(() => {
    document.title = "Email Verification";
  }, []);

  return (
    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>
            <BellRing className="inline-block w-5 h-5" /> Notifications
          </CardTitle>
          <CardDescription>
            Email has been registered, check your email for the confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span
                className={`flex h-2 w-2 translate-y-1 rounded-full ${
                  !status ? "bg-yellow-500" : "bg-green-500"
                }`}
              />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Status Confirmed : {!status ? "Pending " : "All good "}
                  {!status ? (
                    <Clock className="inline-block text-yellow-500 h-5 w-5" />
                  ) : (
                    <Check className="inline-block mr-2 h-5 w-5 text-green-500" />
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {!status ? "confirm your email and back to here" : "now you can close this page"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Link
              to={`https://accounts.google.com/SignOutOptions?hl=en&continue=https://mail.google.com&service=mail&ec=GBRAFw/${userEmail}`}
              target="_blank"
            >
              <Button className="w-full">Open your email</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
