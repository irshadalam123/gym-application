import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Table, SideModal, Button, Input, DateInput, ConfirmPopup } from '../../components/common'

const ENQUIRY_COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: true },
  { key: 'expectedJoinDate', label: 'Expected join date', sortable: true },
]

const initialFormState = {
  name: '',
  phone: '',
  expectedJoinDate: '',
}

function EnquiryForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const setDate = (date) => {
    const str = date ? date.toISOString().slice(0, 10) : ''
    setValues((prev) => ({ ...prev, expectedJoinDate: str }))
    if (errors.expectedJoinDate) setErrors((prev) => ({ ...prev, expectedJoinDate: '' }))
  }

  const validate = () => {
    const next = {}
    if (!values.name?.trim()) next.name = 'Name is required'
    if (!values.phone?.trim()) next.phone = 'Phone is required'
    if (!values.expectedJoinDate) next.expectedJoinDate = 'Expected join date is required'
    setErrors(next)
    setTouched({ name: true, phone: true, expectedJoinDate: true })
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const expectedJoinDateDisplay = values.expectedJoinDate
      ? new Date(values.expectedJoinDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
      : ''
    onSubmit({
      name: values.name.trim(),
      phone: values.phone.trim(),
      expectedJoinDate: expectedJoinDateDisplay,
      expectedJoinDateRaw: values.expectedJoinDate,
    })
    setValues(initialFormState)
    setErrors({})
    setTouched({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-5">
        <h3 className="mb-1 text-sm font-semibold text-orange-400">Enquiry details</h3>
        <p className="mb-4 text-xs text-zinc-500">Add details for the person who came for enquiry.</p>
        <div className="grid gap-4">
          <Input
            name="name"
            label="Full name"
            placeholder="e.g. John Doe"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            required
          />
          <Input
            name="phone"
            type="tel"
            label="Phone number"
            placeholder="e.g. +1 234 567 8900"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
            required
          />
          <DateInput
            label="When they'll join"
            placeholder="Select expected join date"
            value={values.expectedJoinDate}
            onChange={(date) => setDate(date)}
            min={new Date()}
            error={touched.expectedJoinDate && errors.expectedJoinDate}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" rightIcon={<span aria-hidden>✓</span>}>
          Add enquiry
        </Button>
      </div>
    </form>
  )
}

const MemberEnquiry = () => {
  const [enquiries, setEnquiries] = useState([])
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [deletePopupOpen, setDeletePopupOpen] = useState(false)
  const [enquiryToDelete, setEnquiryToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleAddEnquiry = useCallback((enquiry) => {
    setEnquiries((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: enquiry.name,
        phone: enquiry.phone,
        expectedJoinDate: enquiry.expectedJoinDate,
      },
    ])
    setSideModalOpen(false)
  }, [])

  const handleOpenAddModal = () => setSideModalOpen(true)
  const handleCloseModal = () => setSideModalOpen(false)

  const handleDeleteClick = (row) => {
    setEnquiryToDelete(row)
    setDeletePopupOpen(true)
  }

  const applyDelete = useCallback((idToRemove) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== idToRemove))
    setDeleteLoading(false)
    setDeletePopupOpen(false)
    setEnquiryToDelete(null)
  }, [])

  const handleConfirmDelete = () => {
    if (!enquiryToDelete) return
    setDeleteLoading(true)
    const idToRemove = enquiryToDelete.id
    setTimeout(() => applyDelete(idToRemove), 400)
  }

  const handleCloseDeletePopup = () => {
    if (deleteLoading) return
    setDeletePopupOpen(false)
    setEnquiryToDelete(null)
  }

  const deleteConfirmMessage = enquiryToDelete
    ? `Remove "${enquiryToDelete.name}" from the enquiry list?`
    : 'Remove this enquiry?'

  const sortedData = [...enquiries].sort((a, b) => {
    const aVal = a[sortBy] ?? ''
    const bVal = b[sortBy] ?? ''
    const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
    return sortOrder === 'asc' ? cmp : -cmp
  })

  const tableActions = [
    {
      key: 'delete',
      label: 'Remove',
      ariaLabel: 'Remove enquiry',
      onClick: handleDeleteClick,
      variant: 'delete',
    },
  ]

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">
              Member enquiries
            </h2>
            <p className="text-zinc-400 mt-1 text-sm">
              People who came for enquiry. Add new and track when they plan to join.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="primary"
              leftIcon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
              onClick={handleOpenAddModal}
            >
              Add new enquiry
            </Button>
          </motion.div>
        </div>

        <Table
          columns={ENQUIRY_COLUMNS}
          data={sortedData}
          keyField="id"
          sortKey={sortBy}
          sortOrder={sortOrder}
          onSort={(key) => {
            setSortOrder((o) => (sortBy === key && o === 'asc' ? 'desc' : 'asc'))
            setSortBy(key)
          }}
          actions={tableActions}
          emptyMessage="No enquiries yet. Click “Add new enquiry” to add someone."
        />
      </motion.section>

      <SideModal
        isOpen={sideModalOpen}
        onClose={handleCloseModal}
        title="Add enquiry"
        width="max-w-md"
      >
        <EnquiryForm
          onSubmit={handleAddEnquiry}
          onCancel={handleCloseModal}
        />
      </SideModal>

      <ConfirmPopup
        isOpen={deletePopupOpen}
        onClose={handleCloseDeletePopup}
        onConfirm={handleConfirmDelete}
        title="Remove enquiry"
        message={deleteConfirmMessage}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  )
}

export default MemberEnquiry
