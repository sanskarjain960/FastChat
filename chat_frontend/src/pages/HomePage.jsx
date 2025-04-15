import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessagesSquare,
  Zap,
  Users,
  Palette,
  Bot,
  Eye,
  EyeOff,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { login, signup } from "@/redux/userFunctions";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

export default function ChatAppHomepage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignupPasswordVisibility = () => {
    setShowSignupPassword(!showSignupPassword);
  };

  const isSigningUp = useSelector((state) => state.user.isSigningUp);
  const [LoginData, setLoginData] = useState({ email: "", password: "" });
  const [SignupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    signUpemail: "",
    signUppassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!SignupData.firstName.trim())
      return toast.error("First name is required");
    if (!SignupData.signUpemail.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(SignupData.signUpemail))
      return toast.error("Invalid email format");
    if (!SignupData.signUppassword) return toast.error("Password is required");
    if (SignupData.signUppassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;

    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;

    setSignupData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async () => {
    if (!LoginData.email || !LoginData.password) {
      toast.error("Invalid Credentials");
      return;
    }

    login(LoginData, dispatch, navigate);
  };

  const handleSignUp = async () => {
    const success = validateForm(SignupData);
    if (success === true) signup(SignupData, dispatch, navigate);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-green-400 font-sans overflow-auto">
      {/* Background gradients - Fixed to cover entire viewport */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(74,222,128,0.05),transparent_60%)]"></div>
        <div className="absolute right-0 inset-y-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.03),transparent_70%)]"></div>
      </div>

      {/* Left side - App Info */}
      <div className="w-full lg:flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center relative">
        <div className="max-w-lg mx-auto relative z-10 py-8 lg:py-0">
          <div className="flex items-center mb-4 md:mb-6">
            <Zap className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
            <h1 className="text-xl md:text-2xl font-black ml-2 text-white tracking-tight">
              Fast
              <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
                Chat
              </span>
            </h1>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 md:mb-4 text-white leading-tight tracking-tight">
            Chat instantly with <br />
            <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
              anyone, anywhere
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg mb-6 text-zinc-300 max-w-lg font-medium leading-relaxed">
            Lightning-fast messaging designed for secure, direct communication.
            Join thousands enjoying seamless conversations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-start p-3 bg-zinc-900/70 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-green-500/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/10">
              <div className="bg-black p-2 rounded-lg border border-green-500/20">
                <MessagesSquare className="h-4 w-4 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  1-to-1 Chat
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm font-medium">
                  Direct messaging that delivers instantly
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-zinc-900/70 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-green-500/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/10">
              <div className="bg-black p-2 rounded-lg border border-green-500/20">
                <Users className="h-4 w-4 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Group Chats
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm font-medium">
                  Create rooms for teams or friends
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-zinc-900/70 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-green-500/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/10">
              <div className="bg-black p-2 rounded-lg border border-green-500/20">
                <Palette className="h-4 w-4 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Themes
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm font-medium">
                  Personalize your chat experience
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-zinc-900/70 backdrop-blur-sm rounded-xl border border-zinc-800 hover:border-green-500/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/10">
              <div className="bg-black p-2 rounded-lg border border-green-500/20">
                <Bot className="h-4 w-4 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  AI Chatbot
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm font-medium">
                  Get instant responses with our assistant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider between sections - Only visible on desktop */}
      <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent z-10"></div>

      {/* Right side - Login */}
      <div className="w-full lg:w-2/5 xl:w-1/3 bg-black/0 flex flex-col justify-center p-4 md:p-6 py-8 lg:py-0 relative">
        <Card className="w-full max-w-md mx-auto bg-zinc-900/30 backdrop-blur-sm border-zinc-800 border shadow-xl relative z-10 overflow-hidden">
          {/* Login card glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/5 rounded-full blur-xl"></div>

          <CardHeader className="pb-1 space-y-1">
            <CardTitle className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Welcome
            </CardTitle>
            <CardDescription className="text-zinc-400 text-sm font-medium">
              Sign in to continue to FastChat
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-black/50 p-1 rounded-lg">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-black data-[state=active]:font-bold rounded-md font-medium text-zinc-400 text-sm"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-black data-[state=active]:font-bold rounded-md font-medium text-zinc-400 text-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <GoogleAuth text="signin" />

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-zinc-900/30 px-2 text-zinc-500 font-medium">
                      or
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-green-500/50 rounded-lg h-9 text-sm"
                      value={LoginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-green-500/50 rounded-lg h-9 text-sm pr-10"
                      value={LoginData.password}
                      onChange={handleLoginChange}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-9 w-9 p-0 flex items-center justify-center text-zinc-400 hover:text-green-400 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </button>
                  </div>

                  <Button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-bold rounded-lg h-9 shadow-lg shadow-green-500/20 transition-all duration-300 text-sm transform hover:scale-105 mt-2"
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <div className="w-full items-center">
                  <GoogleAuth text="signup" />
                </div>

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-zinc-900/30 px-2 text-zinc-500 font-medium">
                      or
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-green-500/50 rounded-lg h-9 text-sm"
                      value={SignupData.firstName}
                      onChange={handleSignupChange}
                    />
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-green-500/50 rounded-lg h-9 text-sm"
                      value={SignupData.lastName}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <Input
                    id="signUpemail"
                    type="email"
                    placeholder="Email address"
                    className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-green-500/50 rounded-lg h-9 text-sm"
                    value={SignupData.email}
                    onChange={handleSignupChange}
                  />

                  <div className="relative">
                    <Input
                      id="signUppassword"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="bg-black/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-green-500/50 rounded-lg h-9 text-sm pr-10"
                      value={SignupData.password}
                      onChange={handleSignupChange}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-9 w-9 p-0 flex items-center justify-center text-zinc-400 hover:text-green-400 focus:outline-none"
                      onClick={toggleSignupPasswordVisibility}
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showSignupPassword ? "Hide password" : "Show password"}
                      </span>
                    </button>
                  </div>

                  <Button
                    onClick={handleSignUp}
                    disabled={isSigningUp}
                    className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-bold rounded-lg h-9 shadow-lg shadow-green-500/20 transition-all duration-300 text-sm transform hover:scale-105 mt-2"
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
