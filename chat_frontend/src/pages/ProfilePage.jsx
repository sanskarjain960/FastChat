import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Settings,
  LogOut,
  User,
  Zap,
  Camera,
  Mail,
  Calendar,
  Shield,
  ChevronLeft,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ThemeSettings from "../components/ThemeSwitch/ThemeSettings";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfilePic } from "@/redux/userFunctions";

const ProfilePage = () => {
  const authUser = useSelector((state) => state.user.authUser);

  const isUpdatingProfile = useSelector(
    (state) => state.user.isUpdatingProfile
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: authUser.fullName,
    email: authUser.email,
    memberSince: authUser.createdAt.slice(0, 10),
    accountStatus: "Active",
    profilePic: authUser.profilePic,
  });

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // If profilePic is a File object, create a URL for it
    if (profileData.profilePic instanceof File) {
      const url = URL.createObjectURL(profileData.profilePic);
      setImageUrl(url);

      // Clean up the URL when component unmounts or profilePic changes
      return () => URL.revokeObjectURL(url);
    } else if (typeof profileData.profilePic === "string") {
      // If it's already a string URL, use it directly
      setImageUrl(profileData.profilePic);
    }
  }, [profileData.profilePic]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePicChange = (e) => {
    const pic = e.target?.files[0];
    setProfileData({ ...profileData, profilePic: pic });
  };

  const handleSave = () => {
    updateProfilePic(profileData.profilePic, dispatch);
  };

  const HandleBack = () => {
    // Handle back navigation
    navigate("/chat");
  };

  const HandleLogout = () => {
    logout(dispatch, navigate);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-background text-foreground">
      {/* Navbar - using your exact navbar code with theme variables */}
      <div className="flex justify-between items-center p-3 border-b border-zinc-700/30 dark:border-zinc-700/30 bg-background shrink-0">
        {/* Logo and back*/}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2 p-1 h-8 w-8 flex-shrink-0"
            onClick={HandleBack}
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Keeping the original green color for the logo */}
          <Zap className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
          <h1 className="text-xl md:text-2xl font-black ml-2 tracking-tight">
            Fast
            <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
              Chat
            </span>
          </h1>
        </div>

        {/* Top-right icons with labels */}
        <div className="flex items-center space-x-4">
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Settings className="h-5 w-5" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className={"text-2xl  text-black dark:text-white"}>
                  Theme Settings
                </DialogTitle>
              </DialogHeader>
              <ThemeSettings />
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Profile</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={HandleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="container max-w-3xl mx-auto">
          <Card className="border-zinc-200/30 dark:border-zinc-700/30">
            <CardHeader className="border-b border-zinc-200/30 dark:border-zinc-700/30 pb-6">
              <CardTitle className="text-2xl font-bold">Profile</CardTitle>
              <CardDescription>Your profile information</CardDescription>
            </CardHeader>

            <CardContent className="py-6">
              {/* Profile Photo Section - INCREASED SIZE */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-38 h-38 rounded-full bg-muted flex items-center justify-center border-2 border-zinc-200/30 dark:border-zinc-700/30">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-38 h-38 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>

                  <label className="absolute bottom-0 right-0 bg-secondary rounded-full p-2 border-2 border-background cursor-pointer hover:bg-secondary/80 transition-colors">
                    <Camera className="w-5 h-5 text-secondary-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePicChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="text-muted-foreground text-sm mt-5">
                  Click the camera icon to update your photo
                </p>
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Label htmlFor="fullName">Full Name</Label>
                  </div>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    className="border-zinc-200/30 dark:border-zinc-700/30"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Label htmlFor="email">Email Address</Label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    className="border-zinc-200/30 dark:border-zinc-700/30"
                    disabled
                  />
                </div>

                {/* Account Information Section */}
                <div className="pt-4 border-t border-zinc-200/30 dark:border-zinc-700/30">
                  <h3 className="text-lg font-medium mb-4">
                    Account Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Member Since</span>
                      </div>
                      <span className="text-muted-foreground">
                        {profileData.memberSince}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Account Status</span>
                      </div>
                      <span className="text-green-500">
                        {profileData.accountStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t border-zinc-200/30 dark:border-zinc-700/30 pt-6 flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-medium"
              >
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="size-3 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
