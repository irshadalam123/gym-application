import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Normalize options to { value, label }.
 * @param {Array<{ value: string|number, label: string }|string>} options
 */
function normalizeOptions(options) {
  return (options || []).map((opt) => {
    if (typeof opt === 'object' && opt !== null && 'value' in opt) {
      return { value: opt.value, label: opt.label ?? String(opt.value) }
    }
    return { value: opt, label: String(opt) }
  })
}

/**
 * Reusable dropdown with single select or multi select.
 * Styled to match the app's dark theme (zinc-900, orange accent).
 *
 * @param {Array<{ value, label }|string>} options - Options list
 * @param {string|number|Array<string|number>} [value] - Selected value(s). Array for multi.
 * @param {function(value|value[]): void} [onChange] - Called with selected value or array of values
 * @param {boolean} [multiple=false] - Multi select mode
 * @param {string} [placeholder] - Placeholder when nothing selected
 * @param {string} [label] - Label above the dropdown
 * @param {string} [error] - Error message below
 * @param {boolean} [disabled]
 * @param {string} [className] - Wrapper class
 * @param {string} [id] - Id for label association
 */
export default function Dropdown({
  options = [],
  value,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  label,
  error,
  disabled = false,
  className = '',
  id,
}) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(multiple ? [] : null)
  const isControlled = value !== undefined && value !== null
  const normalized = normalizeOptions(options)
  const ref = useRef(null)

  const selected = isControlled
    ? multiple
      ? Array.isArray(value)
        ? value
        : [value].filter(Boolean)
      : value
    : internalValue

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selectOne = (optValue) => {
    if (multiple) {
      const next = selected.includes(optValue)
        ? selected.filter((v) => v !== optValue)
        : [...selected, optValue]
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    } else {
      if (!isControlled) setInternalValue(optValue)
      onChange?.(optValue)
      setOpen(false)
    }
  }

  const displayLabel = () => {
    if (multiple && selected.length > 0) {
      const labels = selected
        .map((v) => normalized.find((o) => o.value === v)?.label ?? v)
        .join(', ')
      return labels
    }
    if (!multiple && selected != null) {
      return normalized.find((o) => o.value === selected)?.label ?? selected
    }
    return placeholder
  }

  const hasSelection = multiple ? selected.length > 0 : selected != null
  const baseTrigger =
    'w-full rounded-lg border bg-zinc-900/80 px-3 py-2.5 text-left text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-zinc-800/50 flex items-center justify-between gap-2 min-h-[42px]'
  const borderClass = error
    ? 'border-red-500/60 focus:ring-red-500/40'
    : 'border-zinc-700 hover:border-zinc-600'

  const generatedId = id || (label ? `dropdown-${label.replaceAll(/\s+/g, '-').toLowerCase()}` : undefined)

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <motion.label
          htmlFor={generatedId}
          className="mb-1.5 block text-sm font-medium text-zinc-400 cursor-pointer select-none"
          animate={{
            color: open || hasSelection ? 'rgba(251, 146, 60, 0.95)' : 'rgba(161, 161, 170, 1)',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      <motion.button
        id={generatedId}
        type="button"
        disabled={disabled}
        onClick={() => (disabled ? undefined : setOpen((o) => !o))}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-describedby={error ? `${generatedId}-error` : undefined}
        className={`${baseTrigger} ${borderClass} ${!hasSelection ? 'text-zinc-500' : ''}`}
        whileHover={disabled ? undefined : { scale: 1.01 }}
        whileTap={disabled ? undefined : { scale: 0.995 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className="truncate">{displayLabel()}</span>
        <motion.span
          className="shrink-0 text-zinc-500"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence mode="wait">
        {open && (
          <motion.ul
            role="listbox"
            aria-multiselectable={multiple}
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-xl"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {normalized.length === 0 ? (
              <li className="px-3 py-2 text-sm text-zinc-500">No options</li>
            ) : (
              normalized.map((opt, i) => {
                const isSelected = multiple ? selected.includes(opt.value) : selected === opt.value
                return (
                  <motion.li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onClick={() => selectOne(opt.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        selectOne(opt.value)
                      }
                    }}
                    className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                      isSelected ? 'bg-orange-500/20 text-orange-400' : 'text-zinc-300'
                    }`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.02 * i, duration: 0.2 }}
                    whileHover={{
                      backgroundColor: isSelected ? 'rgba(249, 115, 22, 0.3)' : 'rgba(39, 39, 42, 0.8)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {multiple && (
                      <motion.span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          isSelected ? 'border-orange-500 bg-orange-500' : 'border-zinc-600'
                        }`}
                        aria-hidden
                        animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 0.25 }}
                      >
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </motion.span>
                    )}
                    {opt.label}
                  </motion.li>
                )
              })
            )}
          </motion.ul>
        )}
      </AnimatePresence>

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
    </motion.div>
  )
}
