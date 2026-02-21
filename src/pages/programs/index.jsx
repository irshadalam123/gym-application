import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table, SideModal, ConfirmPopup, Button } from '../../components/common'
import { PROGRAMS_TABLE_COLUMNS, PROGRAMS_INITIAL_DATA } from './constants'
import ProgramStats from './ProgramStats'
import ProgramViewDetails from './ProgramViewDetails'
import ProgramForm from './ProgramForm'

const AddIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export default function Programs() {
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [programs, setPrograms] = useState(PROGRAMS_INITIAL_DATA)
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const [sideModalMode, setSideModalMode] = useState('view') // 'view' | 'edit' | 'add'
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [deletePopupOpen, setDeletePopupOpen] = useState(false)
  const [programToDelete, setProgramToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleView = (row) => {
    setSelectedProgram(row)
    setSideModalMode('view')
    setSideModalOpen(true)
  }
  const handleEdit = (row) => {
    setSelectedProgram(row)
    setSideModalMode('edit')
    setSideModalOpen(true)
  }
  const handleAdd = () => {
    setSelectedProgram(null)
    setSideModalMode('add')
    setSideModalOpen(true)
  }
  const handleDeleteClick = (row) => {
    setProgramToDelete(row)
    setDeletePopupOpen(true)
  }
  const handleConfirmDelete = () => {
    if (!programToDelete) return
    setDeleteLoading(true)
    setTimeout(() => {
      setPrograms((prev) => prev.filter((p) => p.id !== programToDelete.id))
      setDeleteLoading(false)
      setDeletePopupOpen(false)
      setProgramToDelete(null)
    }, 500)
  }
  const handleSave = (updated) => {
    if (!updated) {
      setSideModalOpen(false)
      setSelectedProgram(null)
      return
    }
    if (updated.id && programs.some((p) => p.id === updated.id)) {
      setPrograms((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
      )
      setSelectedProgram(updated)
      setSideModalMode('view')
    } else {
      setPrograms((prev) => [...prev, { ...updated, id: updated.id || Date.now() }])
      setSideModalOpen(false)
      setSelectedProgram(null)
    }
  }

  const columns = [
    ...PROGRAMS_TABLE_COLUMNS.filter((col) => col.key !== 'status').map((col) => {
      if (col.key === 'type') {
        return {
          ...col,
          render: (val) => (
            <span className="inline-flex px-2.5 py-0.5 rounded-lg text-xs font-medium bg-orange-500/15 text-orange-400">
              {val}
            </span>
          ),
        }
      }
      if (col.key === 'enrolled') {
        return {
          ...col,
          render: (val, row) => {
            const enrolled = row.enrolled ?? 0
            const cap = row.capacity ?? 0
            const pct = cap ? Math.round((enrolled / cap) * 100) : 0
            return (
              <span className={pct >= 100 ? 'text-amber-400' : 'text-zinc-300'}>
                {enrolled} / {cap}
              </span>
            )
          },
        }
      }
      return col
    }),
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (val) => (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
            val === 'Active'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-zinc-600/40 text-zinc-400'
          }`}
        >
          {val}
        </span>
      ),
    },
  ]

  const tableActions = [
    { key: 'view', label: 'View', ariaLabel: 'View', onClick: handleView, variant: 'view' },
    { key: 'edit', label: 'Edit', ariaLabel: 'Edit', onClick: handleEdit, variant: 'edit' },
    { key: 'delete', label: 'Delete', ariaLabel: 'Delete', onClick: handleDeleteClick, variant: 'delete' },
  ]

  const modalTitle =
    sideModalMode === 'view'
      ? 'Program details'
      : sideModalMode === 'edit'
        ? 'Edit program'
        : 'New program'

  return (
    <div className="space-y-6">
      <ProgramStats programs={programs} />

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">
              Programs
            </h2>
            <p className="text-zinc-400 mt-1 text-sm">
              Manage classes and training programs. View, edit, or add programs.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="primary"
              size="md"
              leftIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Add program
            </Button>
          </motion.div>
        </div>

        <div className="p-4 sm:px-6 sm:pb-6">
          <Table
            columns={columns}
            data={programs}
            keyField="id"
            sortKey={sortBy}
            sortOrder={sortOrder}
            onSort={(key) => {
              setSortOrder((o) =>
                sortBy === key && o === 'asc' ? 'desc' : 'asc'
              )
              setSortBy(key)
            }}
            actions={tableActions}
            emptyMessage="No programs yet. Add your first program above."
          />
        </div>
      </motion.section>

      <SideModal
        isOpen={sideModalOpen}
        onClose={() => {
          setSideModalOpen(false)
          setSelectedProgram(null)
        }}
        title={modalTitle}
        width="max-w-lg"
      >
        <AnimatePresence mode="wait">
          {sideModalMode === 'view' && (
            <ProgramViewDetails key="view" program={selectedProgram} />
          )}
          {(sideModalMode === 'edit' || sideModalMode === 'add') && (
            <ProgramForm
              key={sideModalMode}
              program={sideModalMode === 'edit' ? selectedProgram : null}
              onSave={handleSave}
              onClose={() => {
                setSideModalOpen(false)
                setSelectedProgram(null)
              }}
            />
          )}
        </AnimatePresence>
      </SideModal>

      <ConfirmPopup
        isOpen={deletePopupOpen}
        onClose={() => {
          if (!deleteLoading) {
            setDeletePopupOpen(false)
            setProgramToDelete(null)
          }
        }}
        onConfirm={handleConfirmDelete}
        title="Delete program"
        message={
          programToDelete
            ? `Are you sure you want to delete "${programToDelete.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this program?'
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  )
}
