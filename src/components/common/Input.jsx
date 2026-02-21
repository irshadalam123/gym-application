import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable input for text, number, date, email, etc.
 * Styled to match the app's dark theme (zinc-900, orange accent).
 * Label appears above the box; interactive with framer-motion (focus, hover, tap).
 *
 * @param {string} [type='text'] - Input type: text, number, email, date, datetime-local, time, tel, url, password, search
 * @param {string} [label] - Label above the input
 * @param {string} [placeholder]
 * @param {string} [error] - Error message (shows below input, red styling)
 * @param {string} [hint] - Hint text below input (muted)
 * @param {boolean} [disabled]
 * @param {boolean} [required]
 * @param {string} [className] - Extra classes for the wrapper
 * @param {string} [inputClassName] - Extra classes for the input element
 */
const Input = forwardRef(function Input(
  {
    type = 'text',
    label,
    placeholder,
    error,
    hint,
    disabled = false,
    required = false,
    className = '',
    inputClassName = '',
    id,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(rest.value != null && rest.value !== '')

  const generatedId = id || (label ? `input-${label.replaceAll(/\s+/g, '-').toLowerCase()}` : undefined)
  const baseInput =
    'w-full rounded-lg border bg-zinc-900/80 px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-zinc-800/50'

  const borderClass = error
    ? 'border-red-500/60 focus:ring-red-500/40 focus:border-red-500/50'
    : 'border-zinc-700 hover:border-zinc-600'

  const handleChange = (e) => {
    setHasValue(e.target.value !== '')
    rest.onChange?.(e)
  }
  const handleBlur = (e) => {
    setFocused(false)
    setHasValue(e.target.value !== '')
    rest.onBlur?.(e)
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <motion.label
          htmlFor={generatedId}
          className="mb-1.5 block text-sm font-medium text-zinc-400 cursor-pointer select-none"
          animate={{
            color: focused || hasValue ? 'rgba(251, 146, 60, 0.95)' : 'rgba(161, 161, 170, 1)',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="ml-0.5 text-red-400" aria-hidden>*</span>}
        </motion.label>
      )}
      <motion.div
        className="relative rounded-lg"
        whileHover={disabled ? undefined : { scale: 1.01 }}
        whileTap={disabled ? undefined : { scale: 0.995 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <input
          ref={ref}
          id={generatedId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            [error && `${generatedId}-error`, hint && `${generatedId}-hint`].filter(Boolean).join(' ') || undefined
          }
          className={`${baseInput} ${borderClass} ${inputClassName}`}
          {...rest}
          onFocus={(e) => {
            setFocused(true)
            rest.onFocus?.(e)
          }}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </motion.div>
      {error && (
        <motion.p
          id={generatedId ? `${generatedId}-error` : undefined}
          className="mt-1.5 text-sm text-red-400"
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <p id={generatedId ? `${generatedId}-hint` : undefined} className="mt-1.5 text-sm text-zinc-500">
          {hint}
        </p>
      )}
    </motion.div>
  )
})

export default Input
