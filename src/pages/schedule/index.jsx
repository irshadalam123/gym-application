import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SideModal, Dropdown } from '../../components/common'
import { PROGRAMS_INITIAL_DATA } from '../programs/constants'
import ProgramViewDetails from '../programs/ProgramViewDetails'
import {
  DAY_NAMES,
  DAY_NAMES_FULL,
  TIME_SLOTS,
  SCHEDULE_EVENTS,
  PROGRAM_TYPE_OPTIONS,
} from './constants'

const typeColors = {
  HIIT: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  Yoga: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  Strength: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Cardio: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Pilates: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  CrossFit: 'bg-red-500/20 text-red-400 border-red-500/30',
  Boxing: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  Spinning: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
}

function getMonday(d) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day
  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)
  return date
}

function addDays(d, n) {
  const out = new Date(d)
  out.setDate(out.getDate() + n)
  return out
}

function formatWeekRange(weekStart) {
  const end = addDays(weekStart, 6)
  const opts = { month: 'short', day: 'numeric', year: 'numeric' }
  return `${weekStart.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`
}

function formatDayShort(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function isToday(d) {
  const today = new Date()
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
}

function WeekEventCard({ event, program, typeClass, extraCount, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(event)}
      className="w-full text-left rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${typeClass}`}>
        {program?.type || '—'}
      </span>
      <p className="font-semibold text-white text-xs mt-1 truncate">{program?.name || '—'}</p>
      <p className="text-[10px] text-zinc-500 truncate">{program?.trainer}</p>
      {extraCount > 0 && <span className="text-[10px] text-zinc-500">+{extraCount}</span>}
    </motion.button>
  )
}

export default function Schedule() {
  const [viewMode, setViewMode] = useState('week')
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [filterType, setFilterType] = useState('')
  const [filterTrainer, setFilterTrainer] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const programs = PROGRAMS_INITIAL_DATA
  const programById = useMemo(() => Object.fromEntries(programs.map((p) => [p.id, p])), [programs])

  const trainerOptions = useMemo(() => {
    const trainers = [...new Set(programs.map((p) => p.trainer).filter(Boolean))].sort((a, b) => a.localeCompare(b))
    return [{ value: '', label: 'All trainers' }, ...trainers.map((t) => ({ value: t, label: t }))]
  }, [programs])

  const filteredEvents = useMemo(() => {
    return SCHEDULE_EVENTS.filter((ev) => {
      const program = programById[ev.programId]
      if (!program) return false
      if (filterType && program.type !== filterType) return false
      if (filterTrainer && program.trainer !== filterTrainer) return false
      return true
    })
  }, [programById, filterType, filterTrainer])

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])
  const todayDate = useMemo(() => new Date(), [])

  const eventsByDayAndTime = useMemo(() => {
    const map = {}
    filteredEvents.forEach((ev) => {
      const key = `${ev.dayOfWeek}-${ev.startTime}`
      if (!map[key]) map[key] = []
      map[key].push(ev)
    })
    return map
  }, [filteredEvents])

  const eventsForDay = (dayOfWeek) =>
    filteredEvents.filter((e) => e.dayOfWeek === dayOfWeek).sort((a, b) => a.startTime.localeCompare(b.startTime))

  const handlePrevWeek = () => setWeekStart((d) => addDays(d, -7))
  const handleNextWeek = () => setWeekStart((d) => addDays(d, 7))
  const handleToday = () => {
    const mon = getMonday(new Date())
    setWeekStart(mon)
    setSelectedDay(new Date())
  }

  const openDetail = (ev) => {
    setSelectedEvent(ev)
    setDetailOpen(true)
  }

  function getDayButtonClass(d) {
    const base = 'shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors '
    const isSelected = selectedDay.getDate() === d.getDate() && selectedDay.getMonth() === d.getMonth()
    if (isSelected) return base + 'bg-orange-500 text-white'
    if (isToday(d)) return base + 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
    return base + 'bg-zinc-800/80 text-zinc-300 border border-zinc-700 hover:bg-zinc-700'
  }

  const classesThisWeek = filteredEvents.length
  const todayDay = todayDate.getDay()
  const classesToday = filteredEvents.filter((e) => e.dayOfWeek === todayDay).length

  return (
    <div className="space-y-6">
      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        <div
          className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-lg">
            📅
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{classesThisWeek}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">This week</p>
          </div>
        </div>
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
            🏋️
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{classesToday}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Today</p>
          </div>
        </div>
        <div className="col-span-2 rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm text-zinc-400">View</span>
          <div className="flex rounded-lg bg-zinc-800/80 p-0.5 border border-zinc-700">
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'week' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'day' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Day
            </button>
          </div>
        </div>
      </motion.div>

      {/* Toolbar: week nav + filters */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrevWeek}
              className="p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              aria-label="Previous week"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNextWeek}
              className="p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              aria-label="Next week"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="px-3 py-1.5 text-sm font-medium text-white min-w-[200px]">
              {viewMode === 'week' ? formatWeekRange(weekStart) : formatDayShort(selectedDay)}
            </span>
            <button
              type="button"
              onClick={handleToday}
              className="px-3 py-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-medium hover:bg-orange-500/30 transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown
              label="Type"
              options={PROGRAM_TYPE_OPTIONS}
              value={filterType}
              onChange={setFilterType}
              placeholder="All types"
              className="min-w-[140px]"
            />
            <Dropdown
              label="Trainer"
              options={trainerOptions}
              value={filterTrainer}
              onChange={setFilterTrainer}
              placeholder="All trainers"
              className="min-w-[160px]"
            />
          </div>
        </div>
        {viewMode === 'day' && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {weekDays.map((d) => (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setSelectedDay(d)}
                className={getDayButtonClass(d)}
              >
                {DAY_NAMES[d.getDay()]} {d.getDate()}
              </button>
            ))}
          </div>
        )}
      </motion.section>

      {/* Calendar content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {viewMode === 'week' ? (
            <motion.div
              key="week"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="w-14 sm:w-20 p-2 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900/50">
                      Time
                    </th>
                    {weekDays.map((d) => (
                      <th
                        key={d.toISOString()}
                        className={`p-2 text-center text-xs font-semibold uppercase tracking-wider min-w-[100px] ${
                          isToday(d) ? 'bg-orange-500/10 text-orange-400' : 'bg-zinc-900/50 text-zinc-400'
                        }`}
                      >
                        <span className="block">{DAY_NAMES[d.getDay()]}</span>
                        <span className="block text-zinc-500 mt-0.5">{d.getDate()}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIME_SLOTS.map((slot) => (
                    <tr key={slot.value} className="border-b border-zinc-800/80 hover:bg-zinc-800/20 transition-colors">
                      <td className="p-1.5 sm:p-2 text-xs text-zinc-500 font-medium align-top bg-zinc-900/30 w-14 sm:w-20">
                        {slot.label}
                      </td>
                      {weekDays.map((d) => {
                        const dayOfWeek = d.getDay()
                        const key = `${dayOfWeek}-${slot.time}`
                        const cellEvents = (eventsByDayAndTime[key] || []).filter(
                          (ev) => ev.startTime === slot.time || (ev.startTime <= slot.time && ev.endTime > slot.time)
                        )
                        const mainEv = cellEvents[0]
                        return (
                          <td
                            key={d.toISOString()}
                            className={`p-1 align-top min-h-[52px] ${isToday(d) ? 'bg-orange-500/5' : ''}`}
                          >
                            {mainEv ? (
                              <WeekEventCard
                                event={mainEv}
                                program={programById[mainEv.programId]}
                                typeClass={(programById[mainEv.programId] && typeColors[programById[mainEv.programId].type]) || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'}
                                extraCount={cellEvents.length - 1}
                                onOpen={openDetail}
                              />
                            ) : (
                              <span className="block w-full min-h-[44px]" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              key="day"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="p-4 sm:p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                {DAY_NAMES_FULL[selectedDay.getDay()]} — {selectedDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <div className="space-y-3">
                {eventsForDay(selectedDay.getDay()).length === 0 ? (
                  <p className="text-zinc-500 py-8 text-center">No classes scheduled for this day.</p>
                ) : (
                  eventsForDay(selectedDay.getDay()).map((ev) => {
                    const prog = programById[ev.programId]
                    const typeClass = (prog && typeColors[prog.type]) || 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
                    return (
                      <motion.button
                        key={ev.id}
                        type="button"
                        onClick={() => openDetail(ev)}
                        className={`w-full rounded-xl border border-zinc-700 bg-zinc-800/80 p-4 text-left flex items-center gap-4 transition-all hover:border-orange-500/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="w-14 shrink-0 text-center">
                          <span className="block text-lg font-bold text-white">
                            {ev.startTime.slice(0, 5)}
                          </span>
                          <span className="text-xs text-zinc-500">{prog?.duration}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white truncate">{prog?.name}</p>
                          <p className="text-sm text-zinc-400">{prog?.trainer}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${typeClass}`}>
                            {prog?.type}
                          </span>
                        </div>
                        <div className="shrink-0 text-zinc-500 text-sm">
                          {prog?.enrolled ?? 0}/{prog?.capacity ?? 0}
                        </div>
                        <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    )
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <SideModal
        isOpen={detailOpen}
        onClose={() => { setDetailOpen(false); setSelectedEvent(null) }}
        title="Class details"
        width="max-w-lg"
      >
        {selectedEvent && programById[selectedEvent.programId] && (
          <div className="space-y-4">
            <div className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-3 text-sm text-zinc-300">
              <p><span className="text-zinc-500">Time</span> {DAY_NAMES_FULL[selectedEvent.dayOfWeek]}, {selectedEvent.startTime.slice(0, 5)} – {selectedEvent.endTime.slice(0, 5)}</p>
            </div>
            <ProgramViewDetails program={programById[selectedEvent.programId]} />
          </div>
        )}
      </SideModal>
    </div>
  )
}
