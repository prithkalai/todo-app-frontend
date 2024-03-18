import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";
import { SiReact } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import DropDown from "./DropDown";

const NavBar = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const logout = () => {
    localStorage.removeItem("authToken");
    toast({
      title: "Logged Out",
      description: "The user was logged out succesfully",
    });
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      setEmail("");
      return;
    }

    apiClient.userInfo().then((res) => {
      console.log(res);
      setEmail(res.data.email);
    });
  }, []);

  return (
    <>
      <nav className="w-screen h-[80px]  flex items-center pl-5 pr-5 justify-between">
        <p className="font-semibold text-3xl flex items-center gap-3 font-poppins">
          <SiReact className="text-5xl animate-spin duration-5000 hover:duration-1000 transition-none" />{" "}
          Todo App
        </p>
        <div className=" items-center gap-2 hidden md:flex">
          <p className="font-poppins text-sm">{email}</p>
          <ModeToggle />
          <Button
            onClick={logout}
            disabled={!localStorage.getItem("authToken")}
          >
            Logout
          </Button>
        </div>
        <DropDown email={email} logout={logout} />
      </nav>
      <Toaster />
    </>
  );
};

export default NavBar;
