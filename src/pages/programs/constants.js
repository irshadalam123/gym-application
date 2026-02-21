// Program types for dropdowns and display
export const PROGRAM_TYPES = [
  { value: 'HIIT', label: 'HIIT' },
  { value: 'Yoga', label: 'Yoga' },
  { value: 'Strength', label: 'Strength' },
  { value: 'Cardio', label: 'Cardio' },
  { value: 'Pilates', label: 'Pilates' },
  { value: 'CrossFit', label: 'CrossFit' },
  { value: 'Boxing', label: 'Boxing' },
  { value: 'Spinning', label: 'Spinning' },
]

// Status options
export const PROGRAM_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Draft', label: 'Draft' },
]

// Stats card data (values can be computed from programs list in real app)
export const PROGRAMS_STATS_DEFAULT = [
  {
    label: 'Total Programs',
    value: '0',
    change: '+0',
    trend: 'neutral',
    description: 'All programs',
    comparisonText: 'vs last month',
    icon: '📋',
  },
  {
    label: 'Active Programs',
    value: '0',
    change: '+0',
    trend: 'up',
    description: 'Currently running',
    comparisonText: 'vs last week',
    icon: '✓',
  },
  {
    label: 'Total Enrollments',
    value: '0',
    change: '+0',
    trend: 'up',
    description: 'Across all programs',
    comparisonText: 'vs last month',
    icon: '👥',
  },
]

// Table columns for programs (status render added in page)
export const PROGRAMS_TABLE_COLUMNS = [
  { key: 'name', label: 'Program', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'duration', label: 'Duration', align: 'center' },
  { key: 'capacity', label: 'Capacity', align: 'center' },
  { key: 'enrolled', label: 'Enrolled', align: 'center' },
  { key: 'trainer', label: 'Trainer', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
]

// Initial mock programs data
export const PROGRAMS_INITIAL_DATA = [
  {
    id: 1,
    name: 'Morning HIIT Blast',
    type: 'HIIT',
    duration: '45 min',
    capacity: 20,
    enrolled: 18,
    trainer: 'Sarah Chen',
    schedule: 'Mon, Wed, Fri 6:00 AM',
    description: 'High-intensity interval training to kickstart your day. Build endurance and burn fat.',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Power Yoga Flow',
    type: 'Yoga',
    duration: '60 min',
    capacity: 15,
    enrolled: 12,
    trainer: 'Marcus Rivera',
    schedule: 'Tue, Thu 7:00 AM',
    description: 'Dynamic vinyasa flow combining strength and flexibility. All levels welcome.',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Strength Foundations',
    type: 'Strength',
    duration: '50 min',
    capacity: 12,
    enrolled: 10,
    trainer: 'Jake Wilson',
    schedule: 'Mon, Wed, Fri 5:00 PM',
    description: 'Compound lifts and progressive overload. Perfect for building muscle.',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Cardio Burn',
    type: 'Cardio',
    duration: '40 min',
    capacity: 25,
    enrolled: 22,
    trainer: 'Sarah Chen',
    schedule: 'Tue, Thu 6:00 PM',
    description: 'Treadmill, rowing, and bike intervals. Maximize calorie burn.',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Pilates Core',
    type: 'Pilates',
    duration: '55 min',
    capacity: 14,
    enrolled: 8,
    trainer: 'Emma Lee',
    schedule: 'Sat 9:00 AM',
    description: 'Core stability and posture. Low impact, high results.',
    status: 'Draft',
  },
]
