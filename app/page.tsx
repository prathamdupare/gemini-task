import { auth } from "@/auth";
import ChatComponent from "@/components/chat";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <SignIn />
      </>
    );
  } else {
    return (
      <div className="">
        <SignOut />
        <div>
          <ChatComponent
            userName={session.user.name as string}
            userImage={session.user.image as string}
          />
        </div>
      </div>
    );
  }
}
