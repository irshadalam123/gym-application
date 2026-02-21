// Day names for calendar headers (Sun = 0 to match JS getDay())
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Full day names for display
export const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Time slots from 5:00 AM to 10:00 PM (hourly)
const HOURS = Array.from({ length: 18 }, (_, i) => i + 5)
function formatHourLabel(h) {
  if (h === 12) return '12:00 PM'
  if (h < 12) return `${h}:00 AM`
  return `${h - 12}:00 PM`
}

export const TIME_SLOTS = HOURS.map((h) => ({
  value: h,
  label: formatHourLabel(h),
  time: `${String(h).padStart(2, '0')}:00`,
}))

// Schedule events: one per occurrence. programId links to programs data.
// dayOfWeek: 0 = Sunday, 1 = Monday, ... 6 = Saturday
export const SCHEDULE_EVENTS = [
  { id: 'e1', programId: 1, dayOfWeek: 1, startTime: '06:00', endTime: '06:45' },  // Mon HIIT
  { id: 'e2', programId: 1, dayOfWeek: 3, startTime: '06:00', endTime: '06:45' },  // Wed HIIT
  { id: 'e3', programId: 1, dayOfWeek: 5, startTime: '06:00', endTime: '06:45' },  // Fri HIIT
  { id: 'e4', programId: 2, dayOfWeek: 2, startTime: '07:00', endTime: '08:00' },  // Tue Yoga
  { id: 'e5', programId: 2, dayOfWeek: 4, startTime: '07:00', endTime: '08:00' },   // Thu Yoga
  { id: 'e6', programId: 3, dayOfWeek: 1, startTime: '17:00', endTime: '17:50' },  // Mon Strength
  { id: 'e7', programId: 3, dayOfWeek: 3, startTime: '17:00', endTime: '17:50' },
  { id: 'e8', programId: 3, dayOfWeek: 5, startTime: '17:00', endTime: '17:50' },
  { id: 'e9', programId: 4, dayOfWeek: 2, startTime: '18:00', endTime: '18:40' },   // Tue Cardio
  { id: 'e10', programId: 4, dayOfWeek: 4, startTime: '18:00', endTime: '18:40' },
  { id: 'e11', programId: 5, dayOfWeek: 6, startTime: '09:00', endTime: '09:55' },  // Sat Pilates
  { id: 'e12', programId: 1, dayOfWeek: 2, startTime: '09:00', endTime: '09:45' }, // Tue HIIT (extra)
  { id: 'e13', programId: 4, dayOfWeek: 1, startTime: '07:00', endTime: '07:40' },   // Mon Cardio
  { id: 'e14', programId: 3, dayOfWeek: 4, startTime: '06:00', endTime: '06:50' },  // Thu Strength AM
]

export const PROGRAM_TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'HIIT', label: 'HIIT' },
  { value: 'Yoga', label: 'Yoga' },
  { value: 'Strength', label: 'Strength' },
  { value: 'Cardio', label: 'Cardio' },
  { value: 'Pilates', label: 'Pilates' },
  { value: 'CrossFit', label: 'CrossFit' },
  { value: 'Boxing', label: 'Boxing' },
  { value: 'Spinning', label: 'Spinning' },
]
