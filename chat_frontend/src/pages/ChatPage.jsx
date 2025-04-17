import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Paperclip,
  X,
  Settings,
  LogOut,
  User,
  Zap,
  Menu,
  ChevronLeft,
  Users,
  Check,
  Image,
  Mail,
  Smile,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ThemeSettings from "../components/ThemeSwitch/ThemeSettings";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/userFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  getUsers,
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "@/redux/chatFunctions";
import { setselectedUser } from "@/redux/chatSlice";
import { formatMessageTime } from "../lib/formatMessagetime";
import { toast } from "sonner";
import { SidebarLoadingSkeleton } from "@/components/Skeletons/SidebarSkeleton";
import { MessagesLoadingSkeleton } from "@/components/Skeletons/MessageSkeleton";
import EmojiPicker from 'emoji-picker-react';



export default function FastChat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOnlineOnly, setshowOnlineOnly] = useState(false);

  const users = useSelector((state) => state.chat.users);
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const isUsersLoading = useSelector((state) => state.chat.isUsersLoading);
  const isMessagesLoading = useSelector(
    (state) => state.chat.isMessagesLoading
  );

  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const authUser = useSelector((state) => state.user.authUser);
  const messages = useSelector((state) => state.chat.messages);

  const [File, setFile] = useState(null);
  const fileInputRef = useRef("");

  const [previewUrl, setPreviewUrl] = useState(null);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!File) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(File);
    setPreviewUrl(url);
  }, [File]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;


    const toggleEmojiPicker = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };

  const handleSendMessage = async () => {
    if (!text.trim() && !File) return;

    toggleEmojiPicker();

    const formData = new FormData();
    formData.append("image", File);
    formData.append("text", text.trim());

    await sendMessage(formData);
    setText("");
    setFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const HandleProfile = () => {
    navigate("/profile");
  };

  const HandleLogout = async () => {
    await logout(dispatch, navigate);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setFile(file);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };



  const handleEmojiClick = (emojiData) => {
    setText(currentText => currentText + emojiData.emoji);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden text-foreground bg-background">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-3 border-b-2 border-muted bg-background shrink-0">
        {/* Logo and Toggle */}
        <div className="flex items-center">
          {sidebarOpen ? (
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 p-1 h-8 w-8 flex-shrink-0"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          ) : null}
          <div className="flex items-center">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 p-1 h-8 w-8 flex-shrink-0"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            {/* Keeping the original green color for the logo */}
            <Zap className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
            <h1 className="text-xl md:text-2xl font-black ml-2 tracking-tight">
              Fast
              <span className="bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
                Chat
              </span>
            </h1>
          </div>
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
            onClick={HandleProfile}
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

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Contacts (collapsible) */}
        <div
          className={` border-r border-border flex flex-col overflow-hidden shrink-0 transition-all duration-300 ease-in-out text-sidebar-primary-foreground bg-sidebar-primary ${
            sidebarOpen ? "w-[30vw] min-w-[200px] max-w-[400px] opacity-100" : "w-0 opacity-0"
          }
          
          ${selectedUser ? "rounded-r-0": "rounded-r-xl"}
          `}
          
        >
          {sidebarOpen && (
            <>
              <div className="border-b-3 border-border shrink-0">
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 " />
                    <span className="text-md font-medium">Contacts</span>
                    <span className="text-xs opacity-75">
                      ({onlineUsers?.length - 1} online)
                    </span>
                  </div>
                </div>

                <div className="px-4 pb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={showOnlineOnly}
                        onChange={() => setshowOnlineOnly(!showOnlineOnly)}
                      />
                      <div className="w-4 h-4 border rounded-full border-muted-foreground peer-checked:border-primary-foreground peer-checked:border-2 transition-all"></div>
                      <div
                        className={`absolute w-2 h-2 rounded-full bg-primary-foreground top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                          showOnlineOnly
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                      ></div>
                    </div>
                    <span className="text-xs ">
                      Show online only
                    </span>
                  </label>
                </div>
              </div>

              {/* Scrollable contacts list */}

              {isUsersLoading ? (
                <SidebarLoadingSkeleton />
              ) : (
                <ScrollArea className="flex-1 h-64">
                  <div className="space-y-1 py-1">
                    {filteredUsers?.map((user) => (
                      <div
                        key={user._id}
                        className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                          selectedUser?._id === user._id
                            ? "bg-background text-foreground"
                            : "hover:bg-muted hover:text-foreground"
                        }`}
                        onClick={() => dispatch(setselectedUser(user))}
                      >
                        <div className="relative">
                          <Avatar className="h-8 w-8 shrink-0" onClick={() => setShowModal(true)}>
                            <AvatarImage
                              src={user.profilePic}
                              alt={user.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-muted">
                              {user.fullName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          {/* Online status indicator */}

                          {onlineUsers.includes(user._id) && (
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-1 ring-white" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">
                            {user.fullName}
                          </div>
                          <div className="text-xs opacity-75 truncate">
                            {onlineUsers.includes(user._id)
                              ? "Online"
                              : "Offline"}
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredUsers?.length === 0 && (
                      <div className="text-center text-zinc-500 py-4">
                        No online users
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
            </>
          )}
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-primary">
          {selectedUser ? (
            <>
              {/* Chat Header */}

              <div className="p-3 border-b border-border flex items-center justify-between shrink-0 ">
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage
                      src={selectedUser.profilePic}
                      alt={selectedUser.fullName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-muted">
                      {selectedUser.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate text-primary-foreground">
                      {selectedUser.fullName}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {selectedUser.status}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                  onClick={() => dispatch(setselectedUser(null))}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Profile Modal */}
                <Dialog open={showModal} onOpenChange={setShowModal}>
                  <DialogContent className="max-w-sm gap-y-4">
                    <DialogHeader>
                      <DialogTitle className="text-start text-foreground">
                        Profile Details
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 p-4">
                      <Avatar className="h-44 w-44 ">
                        <AvatarImage
                          src={selectedUser.profilePic}
                          alt={selectedUser.fullName}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl">
                          {selectedUser.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center space-y-3">
                        <h3 className="font-bold text-2xl text-foreground">
                          {selectedUser.fullName}
                        </h3>
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{selectedUser.email}</span>
                        </div>
                        <div className="text-sm">
                          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2">
                          
                          </span>
                          <span className="text-foreground">{onlineUsers.includes(selectedUser._id)
                            ? "Online"
                            : "Offline"}</span>
                        </div>
                      </div>
                      <div className="flex justify-end w-full pt-4 text-foreground">
                        <Button
                          variant="outline"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-hidden relative bg-background">
                {isMessagesLoading ? (
                  <MessagesLoadingSkeleton />
                ) : (
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {messages?.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.senderId === authUser._id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {!(message.senderId === authUser._id) && (
                            <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                              <AvatarImage
                                src={selectedUser.profilePic}
                                alt={selectedUser.fullName}
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-muted">
                                {selectedUser.fullName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-md px-3 py-2 rounded-lg ${
                              message.senderId === authUser._id
                                ? "bg-primary text-primary-foreground"
                                : "bg-accent text-primary"
                            }`}
                          >
                            {message.image && (
                              <img
                                src={message.image}
                                alt="Attachment"
                                className="sm:max-w-[200px] rounded-md mb-2"
                              />
                            )}
                            {message.text && (
                              <div className="font-medium">{message.text}</div>
                            )}

                            <div
                              className={`${
                                message.senderId === authUser._id
                                  ? "text-primary-foreground"
                                  : "text-accent-foreground"
                              } text-xs opacity-70 text-right mt-1`}
                            >
                              {formatMessageTime(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                )}
              </div>

              {/* Message Input */}
              <div className="relative">
      {/* Message input container */}
      <div className="p-3 border-t border-border flex items-center space-x-2 shrink-0 bg-secondary">
        {previewUrl && (
          <div className="absolute -top-32 inline-block">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 w-auto max-w-xs object-cover rounded"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 h-5 w-5 bg-black rounded-full flex items-center justify-center"
              aria-label="Remove image"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        )}

        {/* Emoji Button */}
        <button
          onClick={toggleEmojiPicker}
          className="h-9 w-9 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer"
          aria-label="Add emoji"
        >
          <Smile className="h-5 w-5 text-gray-500" />
        </button>

        <Input
          placeholder="Type a message..."
          className="bg-background border-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />

        <label
          htmlFor="image-upload"
          className={`h-9 w-9 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer ${
            previewUrl ? "bg-blue-100" : ""
          }`}
        >
          <Image
            className={`h-5 w-5 ${
              previewUrl ? "text-blue-500" : "text-gray-500"
            }`}
          />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>

        <Button
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={handleSendMessage}
          disabled={!text.trim() && !previewUrl}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Emoji Picker - Displayed as an overlay when active */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-0 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} width={370} height={350} theme="light" skinTonesDisabled={true} emojiStyle="apple"/>
        </div>
      )}
    </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
              {/* Keeping the original green color for the welcome screen */}
              <Zap className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Welcome to FastChat</h2>
              <p className="text-muted-foreground text-center max-w-md font-medium">
                {sidebarOpen
                  ? "Select a conversation from the sidebar to start chatting"
                  : "Open the contacts menu to start chatting"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
