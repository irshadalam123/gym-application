import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick, title = "Dashboard" }) {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotificationsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      text: "New member joined the 6-week challenge",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Class starting in 15 minutes",
      time: "15m ago",
      unread: true,
    },
    {
      id: 3,
      text: "Your progress report is ready",
      time: "1h ago",
      unread: false,
    },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-6 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 shrink-0"
    >
      <div className="flex items-center gap-4 min-w-0">
        <motion.button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-orange-500 hover:bg-zinc-800/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>

        <h1 className="text-lg font-bold text-white truncate uppercase tracking-tight">
          {title}
        </h1>

        <div
          className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
            searchFocused
              ? "border-orange-500/50 bg-orange-500/5 ring-1 ring-orange-500/20"
              : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
          }`}
        >
          <svg
            className="w-4 h-4 text-zinc-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-40 xl:w-56 bg-transparent text-sm text-white placeholder-zinc-500 outline-none border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="relative" ref={notifRef}>
          <motion.button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUserMenuOpen(false);
            }}
            className="relative p-2 rounded-lg text-zinc-400 hover:text-orange-500 hover:bg-zinc-800/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Notifications"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
          </motion.button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl shadow-black/50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    Notifications
                  </p>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      className={`w-full text-left px-4 py-3 hover:bg-zinc-800/80 transition-colors border-b border-zinc-800/50 last:border-0 ${
                        n.unread ? "bg-orange-500/5" : ""
                      }`}
                    >
                      <p className="text-sm text-zinc-300">{n.text}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{n.time}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={userMenuRef}>
          <motion.button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 pr-2 rounded-xl hover:bg-zinc-800/80 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-white leading-tight">
                John Doe
              </p>
              <p className="text-xs text-zinc-500">Pro Member</p>
            </div>
            <svg
              className={`w-4 h-4 text-zinc-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl shadow-black/50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-orange-500">Pro Member</p>
                </div>
                <a
                  href="#profile"
                  className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-orange-500 transition-colors"
                >
                  Profile
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-orange-500 transition-colors"
                >
                  Settings
                </a>
                <a
                  href="#billing"
                  className="block px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800/80 hover:text-orange-500 transition-colors"
                >
                  Billing
                </a>
                <div className="border-t border-zinc-800">
                  <span
                    onClick={() => navigate("/login")}
                    className="block px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800/80 hover:text-red-400 transition-colors"
                  >
                    Sign out
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
