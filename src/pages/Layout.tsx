import NavBar from "@/components/NavBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <NavBar />

      {children}
      <div className="w-full h-[50px]"></div>
    </div>
  );
};

export default Layout;
