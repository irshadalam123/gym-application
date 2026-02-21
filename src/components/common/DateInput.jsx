import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toDate(value) {
  if (value == null || value === '') return null
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function toYYYYMMDD(date) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDisplay(date, placeholder = 'Select date') {
  if (!date) return placeholder
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function getDaysInMonth(year, month) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const days = last.getDate()
  const startOffset = first.getDay()
  return { days, startOffset }
}

function isSameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isDisabled(day, min, max) {
  if (!day) return true
  if (min && day < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true
  if (max && day > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true
  return false
}

/**
 * Interactive date picker with calendar popover.
 * Styled to match the app's dark theme (zinc-900, orange accent).
 * Uses framer-motion for open/close, hover, and tap animations.
 *
 * @param {Date|string} [value] - Selected date (Date or YYYY-MM-DD)
 * @param {function(Date): void} [onChange] - Called with selected Date
 * @param {Date|string} [min] - Minimum selectable date
 * @param {Date|string} [max] - Maximum selectable date
 * @param {string} [label] - Label above the field
 * @param {string} [placeholder] - Placeholder when no date selected
 * @param {string} [error] - Error message below
 * @param {string} [hint] - Hint text below
 * @param {boolean} [disabled]
 * @param {boolean} [required]
 * @param {string} [className] - Wrapper class
 * @param {string} [id] - Id for label association
 */
export default function DateInput({
  value,
  onChange,
  min,
  max,
  label = 'Date',
  placeholder = 'Select date',
  error,
  hint,
  disabled = false,
  required = false,
  className = '',
  id,
}) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => toDate(value) || new Date())
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)

  const selectedDate = toDate(value)
  const minDate = toDate(min)
  const maxDate = toDate(max)
  const hasValue = selectedDate != null

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    const v = toDate(value)
    if (v) setViewDate(v)
  }, [value])

  const handleSelect = (d) => {
    if (isDisabled(d, minDate, maxDate)) return
    onChange?.(d)
    setOpen(false)
  }

  const goPrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }
  const goNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const { days, startOffset } = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth())
  const totalSlots = startOffset + days
  const rows = Math.ceil(totalSlots / 7)

  const generatedId = id || (label ? `date-${label.replaceAll(/\s+/g, '-').toLowerCase()}` : undefined)
  const baseTrigger =
    'w-full rounded-lg border bg-zinc-900/80 px-3 py-2.5 text-left text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-zinc-800/50 flex items-center justify-between gap-2 min-h-[42px]'
  const borderClass = error
    ? 'border-red-500/60 focus:ring-red-500/40'
    : 'border-zinc-700 hover:border-zinc-600'

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
            color: focused || open || hasValue ? 'rgba(251, 146, 60, 0.95)' : 'rgba(161, 161, 170, 1)',
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="ml-0.5 text-red-400" aria-hidden>*</span>}
        </motion.label>
      )}
      <motion.button
        id={generatedId}
        type="button"
        disabled={disabled}
        onClick={() => (disabled ? undefined : setOpen((o) => !o))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={error ? `${generatedId}-error` : undefined}
        className={`${baseTrigger} ${borderClass} ${hasValue ? '' : 'text-zinc-500'}`}
        whileHover={disabled ? undefined : { scale: 1.01 }}
        whileTap={disabled ? undefined : { scale: 0.995 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className="truncate">{formatDisplay(selectedDate, placeholder)}</span>
        <motion.span
          className="shrink-0 text-zinc-500 flex items-center"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <CalendarIcon />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose date"
            className="absolute z-20 mt-2 w-full min-w-[280px] max-w-[320px] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Month/Year header */}
            <div className="flex items-center justify-between border-b border-zinc-700/80 px-3 py-2">
              <motion.button
                type="button"
                onClick={goPrevMonth}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous month"
              >
                <ChevronIcon dir="left" />
              </motion.button>
              <motion.span
                className="text-sm font-semibold text-white"
                key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </motion.span>
              <motion.button
                type="button"
                onClick={goNextMonth}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next month"
              >
                <ChevronIcon dir="right" />
              </motion.button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-0.5 px-2 pt-2">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="py-1 text-center text-xs font-medium text-zinc-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-0.5 p-2 pb-3">
              {Array.from({ length: rows * 7 }, (_, i) => {
                const dayIndex = i - startOffset
                const dayNum = dayIndex + 1
                const dayDate =
                  dayNum >= 1 && dayNum <= days
                    ? new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum)
                    : null
                const selected = dayDate && isSameDay(dayDate, selectedDate)
                const isDisabledDay = dayDate && isDisabled(dayDate, minDate, maxDate)
                const isToday =
                  dayDate &&
                  isSameDay(dayDate, new Date())

                return (
                  <motion.button
                    key={i}
                    type="button"
                    disabled={!dayDate || isDisabledDay}
                    onClick={() => dayDate && handleSelect(dayDate)}
                    className={`
                      aspect-square rounded-lg text-sm font-medium
                      ${dayDate ? '' : 'invisible'}
                      ${isDisabledDay ? 'cursor-not-allowed text-zinc-600' : 'cursor-pointer'}
                      ${selected ? 'bg-orange-500 text-white' : ''}
                      ${!selected && dayDate && !isDisabledDay ? 'text-zinc-300 hover:bg-zinc-800' : ''}
                      ${isToday && !selected ? 'ring-1 ring-orange-500/50' : ''}
                    `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.02 * (i % 7) + 0.01 * Math.floor(i / 7), duration: 0.2 }}
                    whileHover={
                      dayDate && !isDisabledDay
                        ? { scale: 1.1, backgroundColor: selected ? undefined : 'rgba(39, 39, 42, 0.9)' }
                        : undefined
                    }
                    whileTap={dayDate && !isDisabledDay ? { scale: 0.95 } : undefined}
                  >
                    {dayDate ? dayNum : ''}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
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
      {hint && !error && (
        <p id={generatedId ? `${generatedId}-hint` : undefined} className="mt-1.5 text-sm text-zinc-500">
          {hint}
        </p>
      )}
    </motion.div>
  )
}

export { toDate, toYYYYMMDD, formatDisplay }

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ChevronIcon({ dir }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === 'left' ? 'rotate(0deg)' : 'rotate(180deg)' }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
