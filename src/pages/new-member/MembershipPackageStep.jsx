import { useFormikContext } from 'formik'
import { motion } from 'framer-motion'
import { Dropdown } from '../../components/common'

const PACKAGES = [
  { id: 'basic', name: 'Basic', price: 29, description: 'Gym access, basic equipment' },
  { id: 'premium', name: 'Premium', price: 49, description: 'Gym + classes + 1 PT session/month' },
  { id: 'vip', name: 'VIP', price: 79, description: 'Full access, unlimited PT, nutrition plan' },
]

const DURATION_OPTIONS = [
  { value: '1', label: '1 month' },
  { value: '3', label: '3 months' },
  { value: '6', label: '6 months' },
  { value: '12', label: '12 months' },
]

const packageOptions = PACKAGES.map((p) => ({ value: p.id, label: `${p.name} — $${p.price}/mo` }))

function MembershipPackageStep() {
  const { values, errors, touched, setFieldValue } = useFormikContext()
  const selectedPackage = PACKAGES.find((p) => p.id === values.packageId)

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-6 shadow-inner">
        <h3 className="mb-1 text-lg font-semibold text-orange-400">Choose a plan</h3>
        <p className="mb-5 text-sm text-zinc-500">Select membership package and duration.</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Dropdown
            label="Membership package"
            options={packageOptions}
            value={values.packageId}
            onChange={(id) => {
              const pkg = PACKAGES.find((p) => p.id === id)
              setFieldValue('packageId', id)
              setFieldValue('packageName', pkg?.name ?? '')
              setFieldValue('price', pkg?.price ?? '')
            }}
            placeholder="Select package"
            error={touched.packageId && errors.packageId}
          />
          <Dropdown
            label="Duration"
            options={DURATION_OPTIONS}
            value={values.duration}
            onChange={(val) => setFieldValue('duration', val)}
            placeholder="Select duration"
            error={touched.duration && errors.duration}
          />
        </div>

        {selectedPackage && (
          <motion.div
            className="mt-5 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm font-medium text-orange-400">{selectedPackage.name}</p>
            <p className="mt-0.5 text-sm text-zinc-400">{selectedPackage.description}</p>
            <p className="mt-2 text-lg font-semibold text-white">
              ${selectedPackage.price}/month
              {values.duration && (
                <span className="ml-2 text-sm font-normal text-zinc-500">
                  × {values.duration} month{Number(values.duration) > 1 ? 's' : ''} = $
                  {selectedPackage.price * Number(values.duration || 1)}
                </span>
              )}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default MembershipPackageStep
