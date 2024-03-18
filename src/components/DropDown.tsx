import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Props {
  email: string;
  logout: () => void;
}

const DropDown = ({ email, logout }: Props) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropDown(!dropDown);

  //Close dropdown when clicking outside

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative md:hidden font-poppins" ref={dropdownRef}>
      {" "}
      {/* Make the parent div relative */}
      <button onClick={toggleDropdown} className="z-10">
        <IoMenu />
      </button>
      {dropDown && (
        <Card
          className={`absolute right-0 z-10 mt-2 w-48 shadow-md flex flex-col space-y-2 py-2`}
        >
          <a
            className="px-4 py-2 hover:text-blue-400 transition-colors duration-300 text-xs "
            onClick={() => {
              setDropDown(false);
            }}
          >
            {email ? email : "Log into your account"}
          </a>
          <div className="px-4 py-2 cursor-pointer">
            <div className=" items-center gap-2 flex">
              <ModeToggle />
              <Button
                onClick={logout}
                disabled={!localStorage.getItem("authToken")}
              >
                Logout
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DropDown;
