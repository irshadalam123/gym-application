import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './header'
import Sidebar from './sidebar'

const MOBILE_BREAKPOINT = 1024

export default function AppLayout({ children, title = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-white antialiased flex overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        isMobile={isMobile}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex-1 min-h-0 p-4 lg:p-6 overflow-auto"
        >
          <div className="mx-auto">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  )
}
