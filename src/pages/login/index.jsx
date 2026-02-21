import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '../../components/common'

const CAROUSEL_SLIDES = [
  {
    title: 'Transform Your Body',
    subtitle: 'Premium programs designed for real results. Train with purpose.',
    gradient: 'from-orange-600/40 via-zinc-900 to-amber-900/30',
    icon: '💪',
  },
  {
    title: 'Expert Trainers',
    subtitle: 'Certified coaches who push you to break your limits safely.',
    gradient: 'from-amber-600/40 via-zinc-900 to-orange-900/30',
    icon: '🏋️',
  },
  {
    title: '24/7 Access',
    subtitle: 'Your prime zone is always open. Train on your schedule.',
    gradient: 'from-orange-500/30 via-zinc-900 to-zinc-800',
    icon: '⚡',
  },
]

const validateUsername = (value) => {
  if (!value?.trim()) return 'Required'
  const v = value.trim()
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const isNumber = /^[\d\s\-+()]+$/.test(v) && v.replace(/\D/g, '').length >= 6
  if (!isEmail && !isNumber) return 'Enter a valid email or phone number'
  return null
}

const Login = () => {
  const navigate = useNavigate()
  const [slideIndex, setSlideIndex] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)

  const goToSlide = useCallback((index) => {
    setSlideIndex((i) => (index + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % CAROUSEL_SLIDES.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = (e) => {
    // e.preventDefault()
    // const userError = validateUsername(username)
    // const passError = !password?.trim() ? 'Password is required' : null
    // setTouched({ username: true, password: true })
    // setErrors({ username: userError, password: passError })
    // if (userError || passError) return

    navigate('/dashboard')
    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 800)
  }

  const currentSlide = CAROUSEL_SLIDES[slideIndex]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-950 text-white">
      {/* Left: Carousel */}
      <div className="relative w-full lg:w-[55%] min-h-[280px] sm:min-h-[340px] lg:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-950 to-zinc-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-4 sm:inset-8 lg:inset-12 rounded-2xl bg-linear-to-br ${currentSlide.gradient} flex flex-col items-center justify-center text-center p-6 sm:p-10 border border-white/5`}
          >
            <motion.span
              className="text-5xl sm:text-6xl mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentSlide.icon}
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {currentSlide.title}
            </motion.h2>
            <motion.p
              className="text-zinc-300 text-sm sm:text-base max-w-sm"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentSlide.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {CAROUSEL_SLIDES.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className="h-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              style={{ width: slideIndex === i ? 24 : 8, backgroundColor: slideIndex === i ? 'rgb(249, 115, 22)' : 'rgba(255,255,255,0.3)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome back</h1>
            <p className="mt-1 text-zinc-400 text-sm">Sign in with your phone number or email</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="Username"
              placeholder="Phone number or email"
              value={username}
              onChange={(e) => {
                const value = e.target.value
                setUsername(value)
                if (touched.username) setErrors((prev) => ({ ...prev, username: validateUsername(value) }))
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, username: true }))
                setErrors((e) => ({ ...e, username: validateUsername(username) }))
              }}
              error={touched.username ? errors.username : undefined}
              required
              autoComplete="username"
              inputMode="email"
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                const value = e.target.value
                setPassword(value)
                if (touched.password) setErrors((prev) => ({ ...prev, password: value?.trim() ? null : 'Password is required' }))
              }}
              onBlur={() => {
                setTouched((t) => ({ ...t, password: true }))
                setErrors((e) => ({ ...e, password: password?.trim() ? null : 'Password is required' }))
              }}
              error={touched.password ? errors.password : undefined}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-zinc-500 text-sm">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              onClick={() => navigate('/')}
            >
              Back to home
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
