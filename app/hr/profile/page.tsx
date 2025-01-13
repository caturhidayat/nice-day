import logout from "@/app/auth/logout";
import { getProfile } from "@/app/lib/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logout } from "./Logout";



type ProfileProps = {
  id: string;
  name: string;
  department: string;
  branches: string;
};

export default async function Page() {
  // const [profile, setProfile] = useState<ProfileProps>({
  //   id: "",
  //   name: "",
  //   departement: "",
  //   branch: "",
  // });

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getProfile();
  //     setProfile(res);
  //     console.log("res : ", res);
  //   };
  //   fetchData();
  // }, []);

  console.log("window type : ", typeof window);
  
  const profile = await getProfile();

  return (
    <div className="px-6 flow-root">
      <div className="grid grid-col-1 justify-center py-6 gap-2">
        <h1 className="flex justify-center text-center text-2xl font-bold tracking-tight sm:text-2xl">
          Profile
        </h1>
        <div className="flex items-center justify-center">
          <Avatar className="mx-auto">
            <AvatarImage src="/images/avatar.png" alt="avatar" />
            <AvatarFallback>
              <span className="text-xl font-bold">
                {profile.name ? profile.name.charAt(0) : "?"}
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium">Name</dt>
          <dd className="sm:col-span-2 text-lg">{profile.name}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium">Username</dt>
          <dd className="sm:col-span-2 text-lg">{profile.username}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium">Department</dt>
          <dd className="sm:col-span-2 text-lg">
            {profile.department ? profile.department : "--"}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium">Branch</dt>
          <dd className="sm:col-span-2 text-lg">
            {profile.branch ? profile.branch : "--"}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <Button variant={"outline"} asChild>
            <Link href="/hr/profile/change-password">Change Password</Link>
          </Button>
          <Logout />
        </div>
      </dl>
    </div>
  );
}
