import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="m-2" type="submit">
        Signin with Google
        <LogIn/>
      </Button>
    </form>
  );
}
