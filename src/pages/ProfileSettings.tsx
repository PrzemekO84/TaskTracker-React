import { Input } from "@/Components/ui/input";
import { ArrowDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Section = "username" | "password" | null;

function ProfileSettings() {
  const [openedSection, setOpendedSection] = useState<Section>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  function handleSection(section: Section) {
    setOpendedSection((prevSection) => {
      if (prevSection === section) {
        return null;
      }
      return section;
    });
  }

  return (
    <div className="flex flex-col gap-2 justify-center">
      <h1 className="text-3xl lg:text-4xl py-3 text-center">
        Profile Settings
      </h1>
      <div className="flex flex-col gap-3 p-1">
        <div className="border-2 rounded-md p-1">
          <button
            className="w-full p-2 flex items-center justify-between"
            onClick={() => {
              handleSection("username");
            }}
          >
            Change Username{" "}
            <ArrowDown
              className={cn(
                "transition-transform duration-300",
                openedSection === "username" && "rotate-180",
              )}
              size={18}
            />
          </button>
        </div>
        <div
          className={cn(
            "grid transition-all ease-in-out duration-300",
            openedSection === "username"
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-3 border-2 px-1 py-2 rounded-md">
              <Input className="p-5 border-black dark:border-border" placeholder="Enter your new Password" />
              <button className="p-2 border-2 bg-purple-950 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="border-2 rounded-md p-1">
          <button
            className="flex w-full justify-between items-center p-2"
            onClick={() => {
              handleSection("password");
            }}
          >
            Change Password
            <ArrowDown
              className={cn(
                "transition-transform duration-300",
                openedSection === "password" && "rotate-180",
              )}
              size={18}
            />
          </button>
        </div>
        <div
          className={cn(
            "grid transition-all ease-in-out duration-300",
            openedSection === "password"
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 border-2 px-1 py-2 rounded-md">
              <div className="flex justify-between items-center relative">
                <Input
                  className="p-5 border-black dark:border-border"
                  type={showPassword === false ? "password" : "text"}
                  placeholder="Enter your new Password"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword === false ? (
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" />
                  ) : (
                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white" />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center relative">
                <Input
                  className="p-5 border-black dark:border-border"
                  type={showConfirmPassword === false ? "password" : "text"}
                  placeholder="Confirm your new Password"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setConfirmShowPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword === false ? (
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"/>
                  ) : (
                    <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"/>
                  )}
                </div>
              </div>
              <button className="p-2 border-2 bg-purple-950 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
