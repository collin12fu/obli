"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbWritingSign } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { Menu, X, Gavel, Search, LogOut, Settings, User } from "lucide-react";

// Mock currentUser for demonstration
const currentUser = {
  id: "user123",
  avatarUrl: "/default-avatar.png",
};

export default function Dashboard() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showCreateContract, setShowCreateContract] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setSuggestions(["Sample Contract A", "Sample Contract B", "Sample User X"]);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1a1a1a] text-white relative overflow-hidden">

      {/* HEADER */}
      <header className={`fixed top-0 z-50 w-full transition-all ${isScrolled ? "bg-zinc-800 shadow-lg backdrop-blur-md" : "bg-zinc-900"} text-white`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="text-2xl font-extrabold tracking-wide text-yellow-500 hover:text-yellow-400">
            Obli
          </Link>

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

          <div className="flex items-center gap-4 relative">
            <div className="md:hidden">
              <button
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="text-white hover:text-yellow-400"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>

            <button className="relative group hover:text-yellow-400">
              <Gavel className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-bounce">
                  {notificationCount}
                </span>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <img
                src={currentUser.avatarUrl || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500 cursor-pointer hover:animate-pulse"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-xl shadow-md p-2 animate-fadeInUp z-50">
                  <button onClick={() => { setProfileOpen(true); setDropdownOpen(false); }} className="flex items-center w-full px-4 py-2 hover:bg-zinc-700 rounded-md">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </button>
                  <button onClick={() => { setDropdownOpen(false); setShowSettings(true); }} className="flex items-center w-full px-4 py-2 hover:bg-zinc-700 rounded-md">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </button>
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 hover:bg-zinc-700 rounded-md text-red-400">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

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

      <main className="flex-1 pt-20 pb-20 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">Contract 1</div>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">Contract 2</div>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">Contract 3</div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-md flex items-center justify-around px-4 z-50">
        <button onClick={() => setShowSettings(true)} className="hover:text-[#CBAA6F] transition" title="Settings">
          <FiSettings size={28} />
        </button>

        <button onClick={() => setShowCreateContract(true)} className="relative group active:scale-95 transition-transform duration-300 w-16 h-16 rounded-full overflow-hidden" title="Create Contract">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#CBAA6F] via-white to-[#CBAA6F] opacity-30 blur-2xl animate-glow" />
          </div>
          <div className="relative flex items-center justify-center w-full h-full bg-[#CBAA6F] rounded-full group-hover:bg-[#9E7A44] transition-all duration-300 shadow-lg overflow-hidden">
            <TbWritingSign size={30} className="text-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
          </div>
        </button>

        <div className="w-6" />
      </footer>

      {/* Create Contract Modal */}
      {showCreateContract && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/90 text-black rounded-2xl p-6 sm:p-8 max-w-lg w-full relative">
            <button
              onClick={() => setShowCreateContract(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black"
            >×</button>
            <h2 className="text-2xl font-bold mb-4">Create New Contract</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const contract = {
                  title: formData.get("title") as string,
                  details: formData.get("details") as string,
                  parties: (formData.get("parties") as string).split(",").map(s => s.trim()),
                  expiration: formData.get("expiration") as string,
                };
                console.log("New contract:", contract);
                setShowCreateContract(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-800">Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter a contract title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Details</label>
                <textarea
                  name="details"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Describe the terms of the agreement..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Parties Involved</label>
                <input
                  name="parties"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter usernames or emails, comma-separated"
                />
              </div>
              <div>
               <label className="block text-sm font-medium text-gray-800">Expiration Date & Time</label>
               <input
                type="datetime-local"
                name="expiration"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
               />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-[#CBAA6F] hover:bg-[#9E7A44] text-black px-4 py-2 rounded-full font-semibold">
                  Create Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/90 text-black rounded-2xl p-6 sm:p-8 max-w-lg w-full relative">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black">×</button>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-700">Settings options coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
}
