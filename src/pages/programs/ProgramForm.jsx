import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input, Dropdown, Button } from '../../components/common'
import { PROGRAM_TYPES, PROGRAM_STATUS_OPTIONS } from './constants'

// Mock trainers for dropdown (in real app, fetch from API)
const TRAINER_OPTIONS = [
  { value: 'Sarah Chen', label: 'Sarah Chen' },
  { value: 'Marcus Rivera', label: 'Marcus Rivera' },
  { value: 'Jake Wilson', label: 'Jake Wilson' },
  { value: 'Emma Lee', label: 'Emma Lee' },
]

/**
 * Add/Edit program form for the side modal.
 * Receives program (null for add), onSave(updatedProgram) and onClose.
 */
export default function ProgramForm({ program, onSave, onClose }) {
  const [form, setForm] = useState({
    name: '',
    type: '',
    duration: '',
    capacity: '',
    enrolled: '',
    trainer: '',
    schedule: '',
    description: '',
    status: 'Active',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (program) {
      setForm({
        name: program.name ?? '',
        type: program.type ?? '',
        duration: program.duration ?? '',
        capacity: program.capacity ?? '',
        enrolled: program.enrolled ?? '',
        trainer: program.trainer ?? '',
        schedule: program.schedule ?? '',
        description: program.description ?? '',
        status: program.status ?? 'Active',
      })
    } else {
      setForm({
        name: '',
        type: '',
        duration: '',
        capacity: '',
        enrolled: '0',
        trainer: '',
        schedule: '',
        description: '',
        status: 'Active',
      })
    }
    setErrors({})
  }, [program])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.name?.trim()) next.name = 'Name is required'
    if (!form.type) next.type = 'Type is required'
    if (!form.duration?.trim()) next.duration = 'Duration is required'
    if (form.capacity === '' || (form.capacity != null && (Number(form.capacity) < 0 || Number(form.capacity) > 999)))
      next.capacity = 'Valid capacity (0–999) required'
    if (form.enrolled !== '' && (Number(form.enrolled) < 0 || Number(form.enrolled) > 999))
      next.enrolled = 'Valid number (0–999)'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      ...(program || {}),
      name: form.name.trim(),
      type: form.type,
      duration: form.duration.trim(),
      capacity: Number(form.capacity) || 0,
      enrolled: Number(form.enrolled) || 0,
      trainer: form.trainer || undefined,
      schedule: form.schedule.trim() || undefined,
      description: form.description?.trim() || undefined,
      status: form.status,
    }
    if (!program?.id) payload.id = Date.now()
    onSave?.(payload)
  }

  return (
    <motion.form
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-orange-400">Basic info</h3>
        <Input
          label="Program name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Morning HIIT Blast"
          error={errors.name}
          required
        />
        <Dropdown
          label="Type"
          options={PROGRAM_TYPES}
          value={form.type}
          onChange={(val) => handleChange('type', val)}
          placeholder="Select type"
          error={errors.type}
        />
        <Input
          label="Duration"
          value={form.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          placeholder="e.g. 45 min"
          error={errors.duration}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Capacity"
            type="number"
            min={0}
            max={999}
            value={form.capacity}
            onChange={(e) => handleChange('capacity', e.target.value)}
            placeholder="20"
            error={errors.capacity}
          />
          <Input
            label="Enrolled"
            type="number"
            min={0}
            max={999}
            value={form.enrolled}
            onChange={(e) => handleChange('enrolled', e.target.value)}
            placeholder="0"
            error={errors.enrolled}
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-orange-400">Schedule & trainer</h3>
        <Dropdown
          label="Trainer"
          options={TRAINER_OPTIONS}
          value={form.trainer}
          onChange={(val) => handleChange('trainer', val)}
          placeholder="Select trainer"
        />
        <Input
          label="Schedule"
          value={form.schedule}
          onChange={(e) => handleChange('schedule', e.target.value)}
          placeholder="e.g. Mon, Wed, Fri 6:00 AM"
        />
        <Input
          label="Description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Short description of the program"
        />
        <Dropdown
          label="Status"
          options={PROGRAM_STATUS_OPTIONS}
          value={form.status}
          onChange={(val) => handleChange('status', val)}
          placeholder="Select status"
        />
      </div>

      <motion.div
        className="flex gap-3 pt-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Button type="submit" variant="primary">
          {program ? 'Save changes' : 'Create program'}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </motion.div>
    </motion.form>
  )
}
