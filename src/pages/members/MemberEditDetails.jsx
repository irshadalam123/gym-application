import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input, Dropdown, Button } from '../../components/common'

const PLAN_OPTIONS = [
  { value: 'Basic', label: 'Basic' },
  { value: 'Premium', label: 'Premium' },
  { value: 'VIP', label: 'VIP' },
]

const STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
]

/**
 * Edit form for member details in the side modal. Receives member row, onSave and onClose callbacks.
 */
export default function MemberEditDetails({ member, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    status: '',
    joined: '',
    address: '',
  })

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name ?? '',
        email: member.email ?? '',
        phone: member.phone ?? '',
        plan: member.plan ?? '',
        status: member.status ?? '',
        joined: member.joined ?? '',
        address: member.address ?? '',
      })
    }
  }, [member])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.({ ...member, ...form })
  }

  if (!member) return null

  return (
    <motion.form
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-orange-400">Personal</h3>
        <Input
          label="Full name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 234 567 8900"
        />
        <Input
          label="Address"
          value={form.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Street, city, state, ZIP"
        />
      </div>
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-orange-400">Membership</h3>
        <Dropdown
          label="Plan"
          options={PLAN_OPTIONS}
          value={form.plan}
          onChange={(val) => handleChange('plan', val)}
          placeholder="Select plan"
        />
        <Dropdown
          label="Status"
          options={STATUS_OPTIONS}
          value={form.status}
          onChange={(val) => handleChange('status', val)}
          placeholder="Select status"
        />
        <Input
          label="Joined"
          value={form.joined}
          onChange={(e) => handleChange('joined', e.target.value)}
          placeholder="e.g. Jan 15, 2025"
        />
      </div>
      <motion.div
        className="flex gap-3 pt-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Button type="submit" variant="primary">
          Save changes
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </motion.div>
    </motion.form>
  )
}
