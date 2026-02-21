import { useFormikContext } from 'formik'
import { motion } from 'framer-motion'
import { Input, Dropdown, DateInput } from '../../components/common'

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

function MemberDetailsStep() {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext()

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-6 shadow-inner">
        <h3 className="mb-1 text-lg font-semibold text-orange-400">Personal information</h3>
        <p className="mb-5 text-sm text-zinc-500">Enter the new member&apos;s basic details.</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            name="fullName"
            label="Full name"
            placeholder="John Doe"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName}
            required
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="john@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            required
          />
          <Input
            name="phone"
            type="tel"
            label="Phone"
            placeholder="+1 234 567 8900"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
            required
          />
          <DateInput
            label="Date of birth"
            placeholder="Select date of birth"
            value={values.dateOfBirth}
            onChange={(date) => setFieldValue('dateOfBirth', date ? date.toISOString().slice(0, 10) : '')}
            max={new Date()}
            error={touched.dateOfBirth && errors.dateOfBirth}
            required
          />
          <Dropdown
            label="Gender"
            options={GENDER_OPTIONS}
            value={values.gender}
            onChange={(val) => setFieldValue('gender', val)}
            placeholder="Select gender"
            error={touched.gender && errors.gender}
          />
        </div>

        <div className="mt-5">
          <Input
            name="address"
            label="Address"
            placeholder="Street, city, state, ZIP"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && errors.address}
            hint="Full address for membership records"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default MemberDetailsStep
