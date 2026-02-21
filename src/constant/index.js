// Members page – stat cards
export const MEMBERS_CARD_DATA = [
  {
    label: 'Total Members',
    value: '1,284',
    change: '+12%',
    trend: 'up',
    description: 'All time',
    comparisonText: 'vs last month',
    icon: '👥',
  },
  {
    label: 'Active Members',
    value: '892',
    change: '+8%',
    trend: 'up',
    description: 'Checked in this week',
    comparisonText: 'vs last week',
    icon: '✓',
  },
  {
    label: 'New This Month',
    value: '47',
    change: '+5',
    trend: 'up',
    description: 'New signups',
    comparisonText: 'vs last month',
    icon: '🆕',
  },
]

// Members page – table columns (add status render in page when using)
export const MEMBERS_TABLE_COLUMNS = [
  { key: 'name', label: 'Member', sortable: true },
  { key: 'plan', label: 'Plan', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'joined', label: 'Joined', align: 'right' },
]

// Members page – table data
export const MEMBERS_TABLE_DATA = [
  { id: 1, name: 'Alex Rivera', plan: 'Premium', status: 'Active', joined: 'Jan 15, 2025' },
  { id: 2, name: 'Jordan Lee', plan: 'Basic', status: 'Active', joined: 'Feb 1, 2025' },
  { id: 3, name: 'Sam Chen', plan: 'Premium', status: 'Inactive', joined: 'Dec 10, 2024' },
  { id: 4, name: 'Morgan Taylor', plan: 'Premium', status: 'Active', joined: 'Feb 10, 2025' },
  { id: 5, name: 'Casey Kim', plan: 'Basic', status: 'Inactive', joined: 'Nov 22, 2024' },
]

// Expired members page – table columns
export const EXPIRED_MEMBERS_TABLE_COLUMNS = [
  { key: 'name', label: 'Member', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'plan', label: 'Plan', sortable: true },
  { key: 'expiredOn', label: 'Expired on', sortable: true, align: 'right' },
]

// Expired members page – table data
export const EXPIRED_MEMBERS_TABLE_DATA = [
  { id: 1, name: 'Sam Chen', email: 'sam.chen@email.com', plan: 'Premium', expiredOn: 'Jan 10, 2025' },
  { id: 2, name: 'Casey Kim', email: 'casey.kim@email.com', plan: 'Basic', expiredOn: 'Dec 22, 2024' },
  { id: 3, name: 'Riley Jones', email: 'riley.j@email.com', plan: 'VIP', expiredOn: 'Feb 1, 2025' },
  { id: 4, name: 'Jamie Park', email: 'jamie.park@email.com', plan: 'Basic', expiredOn: 'Jan 28, 2025' },
  { id: 5, name: 'Drew Morgan', email: 'drew.m@email.com', plan: 'Premium', expiredOn: 'Feb 5, 2025' },
]
