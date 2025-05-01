"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Gavel, Search, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileModal from "@/components/ProfileModal";

// Define props
interface HeaderProps {
  currentUser?: {
    id: string;
    avatarUrl?: string;
    [key: string]: any;
  };
}

export default function Header({ currentUser }: HeaderProps) {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // future mobile menu
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock notification count
  useEffect(() => {
    setNotificationCount(3); // TODO: Replace with real API call
  }, []);

  // Mock search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      setSuggestions(["Sample Contract A", "Sample Contract B", "Sample User X"]);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/login");
  };

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all ${isScrolled ? "bg-zinc-800 shadow-lg backdrop-blur-md" : "bg-zinc-900"} text-white`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Left: Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-wide text-yellow-500 hover:text-yellow-400">
            Obli
          </Link>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 mx-8 relative">
            <input
              type="text"
              placeholder="Search contracts, users..."
              className="w-full rounded-full bg-zinc-700 text-white placeholder-gray-400 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />

            {suggestions.length > 0 && (
              <div className="absolute top-12 w-full bg-zinc-800 rounded-lg shadow-md p-2 animate-fadeIn z-50">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-zinc-700 rounded-md cursor-pointer"
                    onClick={() => {
                      console.log(`You selected: ${item}`);
                      setSuggestions([]);
                      setSearchQuery(item);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 relative">

            {/* Search Icon for Small Screens */}
            <div className="md:hidden">
              <button
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="text-white hover:text-yellow-400"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>

            {/* Notification Icon */}
            <button className="relative group hover:text-yellow-400">
              <Gavel className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-bounce">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Avatar and Dropdown */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <img
                  src={currentUser.avatarUrl || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500 cursor-pointer hover:animate-pulse"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-xl shadow-md p-2 animate-fadeInUp z-50">
                    <button
                      onClick={() => {
                        setProfileOpen(true);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-zinc-700 rounded-md"
                    >
                      <User className="w-4 h-4 mr-2" /> Profile
                    </button>
                    <button
                      onClick={() => {
                        router.push("/settings");
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-zinc-700 rounded-md"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 hover:bg-zinc-700 rounded-md text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-sm hover:text-yellow-400">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearchInput && (
          <div className="md:hidden px-6 py-2 bg-zinc-800 animate-slideDown">
            <input
              type="text"
              placeholder="Search contracts, users..."
              className="w-full rounded-full bg-zinc-700 text-white placeholder-gray-400 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute top-3 left-9 h-5 w-5 text-gray-400" />
          </div>
        )}
      </header>

      {/* Profile Modal */}
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}