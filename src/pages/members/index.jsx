import { useState } from 'react'
import { motion } from 'framer-motion'
import { StatCard, Table, SideModal, ConfirmPopup } from '../../components/common'
import {
  MEMBERS_CARD_DATA,
  MEMBERS_TABLE_COLUMNS,
  MEMBERS_TABLE_DATA,
} from '../../constant'
import MemberViewDetails from './MemberViewDetails'
import MemberEditDetails from './MemberEditDetails'

const Members = () => {
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [members, setMembers] = useState(MEMBERS_TABLE_DATA)
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const [sideModalMode, setSideModalMode] = useState('view') // 'view' | 'edit'
  const [selectedMember, setSelectedMember] = useState(null)
  const [deletePopupOpen, setDeletePopupOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleView = (row) => {
    setSelectedMember(row)
    setSideModalMode('view')
    setSideModalOpen(true)
  }
  const handleEdit = (row) => {
    setSelectedMember(row)
    setSideModalMode('edit')
    setSideModalOpen(true)
  }
  const handleDeleteClick = (row) => {
    setMemberToDelete(row)
    setDeletePopupOpen(true)
  }
  const handleConfirmDelete = () => {
    if (!memberToDelete) return
    setDeleteLoading(true)
    setTimeout(() => {
      setMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id))
      setDeleteLoading(false)
      setDeletePopupOpen(false)
      setMemberToDelete(null)
    }, 500)
  }
  const handleSaveEdit = (updated) => {
    if (!updated) {
      setSideModalOpen(false)
      setSelectedMember(null)
      return
    }
    setMembers((prev) =>
      prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m))
    )
    setSelectedMember(updated)
    setSideModalMode('view')
  }

  const columns = [
    ...MEMBERS_TABLE_COLUMNS.map((col) =>
      col.key === 'status'
        ? {
            ...col,
            render: (val) => (
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  val === 'Active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-zinc-600/40 text-zinc-400'
                }`}
              >
                {val}
              </span>
            ),
          }
        : col
    ),
  ]

  const tableActions = [
    { key: 'view', label: 'View', ariaLabel: 'View', onClick: handleView, variant: 'view' },
    { key: 'edit', label: 'Edit', ariaLabel: 'Edit', onClick: handleEdit, variant: 'edit' },
    { key: 'delete', label: 'Delete', ariaLabel: 'Delete', onClick: handleDeleteClick, variant: 'delete' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {MEMBERS_CARD_DATA.map((stat, i) => (
          <StatCard
            key={stat.label}
            {...stat}
            motionProps={{ transition: { delay: 0.1 * i } }}
          />
        ))}
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-6"
      >
        <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
          Members
        </h2>
        <p className="text-zinc-400 mb-6">
          View and manage gym members. Sort by column headers.
        </p>

        <Table
          columns={columns}
          data={members}
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
          emptyMessage="No members yet."
        />
      </motion.section>

      <SideModal
        isOpen={sideModalOpen}
        onClose={() => {
          setSideModalOpen(false)
          setSelectedMember(null)
        }}
        title={sideModalMode === 'view' ? 'View Member' : 'Edit Member'}
      >
        {sideModalMode === 'view' && (
          <MemberViewDetails member={selectedMember} />
        )}
        {sideModalMode === 'edit' && (
          <MemberEditDetails
            member={selectedMember}
            onSave={handleSaveEdit}
            onClose={() => {
              setSideModalOpen(false)
              setSelectedMember(null)
            }}
          />
        )}
      </SideModal>

      <ConfirmPopup
        isOpen={deletePopupOpen}
        onClose={() => {
          if (!deleteLoading) {
            setDeletePopupOpen(false)
            setMemberToDelete(null)
          }
        }}
        onConfirm={handleConfirmDelete}
        title="Delete member"
        message={
          memberToDelete
            ? `Are you sure you want to delete "${memberToDelete.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this member?'
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  )
}

export default Members
