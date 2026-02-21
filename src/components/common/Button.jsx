import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variantStyles = {
  primary:
    'bg-orange-500 text-white shadow-lg shadow-orange-500/25 hover:bg-orange-400 hover:shadow-orange-500/35 active:bg-orange-600',
  secondary:
    'bg-zinc-700 text-zinc-100 hover:bg-zinc-600 active:bg-zinc-800 border border-zinc-600',
  outline:
    'bg-transparent text-orange-400 border-2 border-orange-500/70 hover:bg-orange-500/15 hover:border-orange-500 active:bg-orange-500/25',
  ghost:
    'bg-transparent text-zinc-300 hover:bg-zinc-800/80 hover:text-white active:bg-zinc-800',
  danger:
    'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 shadow-lg shadow-red-500/20',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-lg shadow-emerald-500/20',
  link:
    'bg-transparent text-orange-400 hover:text-orange-300 hover:underline underline-offset-2',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-3',
}

/**
 * Interactive button with framer-motion and multiple variants.
 *
 * @param {string} [variant='primary'] - primary | secondary | outline | ghost | danger | success | link
 * @param {string} [size='md'] - sm | md | lg
 * @param {boolean} [disabled]
 * @param {boolean} [loading] - Shows spinner and disables click
 * @param {React.ReactNode} [leftIcon] - Icon or element before label
 * @param {React.ReactNode} [rightIcon] - Icon or element after label
 * @param {string} [className] - Extra classes for the button
 * @param {boolean} [fullWidth] - w-full
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    className = '',
    fullWidth = false,
    children,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:pointer-events-none disabled:opacity-60 select-none'

  return (
    <motion.button
      ref={ref}
      type={rest.type ?? 'button'}
      disabled={isDisabled}
      className={`${base} ${variantStyles[variant] ?? variantStyles.primary} ${sizeStyles[size] ?? sizeStyles.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      whileHover={isDisabled ? undefined : { scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...rest}
    >
      {loading ? (
        <motion.span
          className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        />
      ) : (
        <>
          {leftIcon && (
            <motion.span
              className="shrink-0"
              initial={false}
              animate={{ scale: 1, opacity: 1 }}
            >
              {leftIcon}
            </motion.span>
          )}
          {children}
          {rightIcon && (
            <motion.span
              className="shrink-0"
              initial={false}
              animate={{ scale: 1, opacity: 1 }}
            >
              {rightIcon}
            </motion.span>
          )}
        </>
      )}
    </motion.button>
  )
})

export default Button
