import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Table, SideModal, ConfirmPopup } from '../../components/common'
import { EXPIRED_MEMBERS_TABLE_COLUMNS, EXPIRED_MEMBERS_TABLE_DATA } from '../../constant'
import ExpiredMemberViewDetails from './ExpiredMemberViewDetails'

const ExpiredMembers = () => {
  const [sortBy, setSortBy] = useState('expiredOn')
  const [sortOrder, setSortOrder] = useState('desc')
  const [members, setMembers] = useState(EXPIRED_MEMBERS_TABLE_DATA)
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [deletePopupOpen, setDeletePopupOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const sortedData = useMemo(() => {
    const order = sortOrder === 'asc' ? 1 : -1
    return [...members].sort((a, b) => {
      const aVal = a[sortBy] ?? ''
      const bVal = b[sortBy] ?? ''
      return String(aVal).localeCompare(String(bVal), undefined, { numeric: true }) * order
    })
  }, [members, sortBy, sortOrder])

  const handleView = (row) => {
    setSelectedMember(row)
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

  const tableActions = [
    { key: 'view', label: 'View', ariaLabel: 'View details', onClick: handleView, variant: 'view' },
    { key: 'delete', label: 'Delete', ariaLabel: 'Delete', onClick: handleDeleteClick, variant: 'delete' },
  ]

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6"
      >
        <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-1">
          Expired Members
        </h2>
        <p className="text-zinc-400 mb-6">
          Members whose membership has expired. Sort by column headers.
        </p>

        <Table
          columns={EXPIRED_MEMBERS_TABLE_COLUMNS}
          data={sortedData}
          keyField="id"
          sortKey={sortBy}
          sortOrder={sortOrder}
          onSort={(key) => {
            setSortOrder((o) => (sortBy === key && o === 'asc' ? 'desc' : 'asc'))
            setSortBy(key)
          }}
          actions={tableActions}
          emptyMessage="No expired members."
        />
      </motion.section>

      <SideModal
        isOpen={sideModalOpen}
        onClose={() => {
          setSideModalOpen(false)
          setSelectedMember(null)
        }}
        title="View Expired Member"
      >
        <ExpiredMemberViewDetails member={selectedMember} />
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
        title="Delete expired member"
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

export default ExpiredMembers
