import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon, end: true },
  { path: '/members', label: 'Members', icon: UsersIcon, end: false },
  { path: '/new-member', label: 'New Member', icon: NewMemberIcon, end: true },
  { path: '/expired-members', label: 'Expired Members', icon: ExpiredMembersIcon, end: true },
  { path: '/member-enquiry', label: 'Member Enquiry', icon: MemberEnquiryIcon, end: true },
  { path: '/programs', label: 'Programs', icon: ProgramIcon, end: false },
  { path: '/trainers', label: 'Trainers', icon: TrainerIcon, end: false },
  { path: '/schedule', label: 'Schedule', icon: CalendarIcon, end: false },
  { path: '/settings', label: 'Settings', icon: SettingsIcon, end: false },
]

function DashboardIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}
function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}
function NewMemberIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  )
}
function ExpiredMembersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function MemberEnquiryIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function ProgramIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  )
}
function TrainerIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
function SettingsIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse, isMobile }) {
  const location = useLocation()

  const sidebarContent = (
    <>
      <div className={`flex items-center h-16 px-4 border-b border-zinc-800 shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 group"
          >
            <Link
              to="/dashboard"
              className="flex items-center gap-2 group"
            >
            <span className="text-xl font-black tracking-tighter text-white">
              PRIME<span className="text-orange-500">ZONE</span>
            </span>
            <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-widest">Fitness</span>
            </Link>
          </motion.div>
        )}
        {!isMobile && (
          <motion.button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-zinc-400 hover:text-orange-500 hover:bg-zinc-800/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
              )}
            </svg>
          </motion.button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = item.end
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path)
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.02 * i }}
            >
              <Link
                to={item.path}
                onClick={() => isMobile && onClose?.()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-500'
                    : 'text-zinc-400 hover:text-orange-500 hover:bg-zinc-800/80'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-orange-500' : ''}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-3 border-t border-zinc-800">
          <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent p-3 border border-orange-500/20">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Pro Member</p>
            <p className="text-zinc-400 text-xs">Unlock all programs & analytics.</p>
          </div>
        </div>
      )}
    </>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-zinc-900 border-r border-zinc-800 shadow-xl shadow-black/50 z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="hidden lg:flex flex-col bg-zinc-900 border-r border-zinc-800 shrink-0 overflow-hidden"
    >
      {sidebarContent}
    </motion.aside>
  )
}
