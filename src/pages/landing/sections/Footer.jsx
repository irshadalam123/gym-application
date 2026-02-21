import { motion } from 'framer-motion'

const links = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'App Download', href: '#' },
    { label: 'Integrations', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-block">
              <span className="text-2xl font-black tracking-tighter text-white">
                PRIME<span className="text-orange-500">ZONE</span>
              </span>
            </a>
            <p className="text-zinc-500 text-sm mt-3 max-w-[200px]">
              Your prime zone starts here. Train smarter, live stronger.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-zinc-400 font-semibold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-zinc-500 hover:text-orange-500 text-sm transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Prime Zone Fitness. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'YouTube'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="text-zinc-500 hover:text-orange-500 text-sm font-medium transition-colors"
                whileHover={{ y: -2 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
