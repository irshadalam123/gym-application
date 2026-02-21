import { useFormikContext } from 'formik'
import { motion, AnimatePresence } from 'framer-motion'
import { Input, Dropdown } from '../../components/common'

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit / Debit card' },
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI / Digital wallet' },
]

function PaymentDetailsStep() {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext()
  const isCard = values.paymentMethod === 'card'

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-6 shadow-inner">
        <h3 className="mb-1 text-lg font-semibold text-orange-400">Payment details</h3>
        <p className="mb-5 text-sm text-zinc-500">Choose payment method and complete details.</p>

        <div className="space-y-5">
          <Dropdown
            label="Payment method"
            options={PAYMENT_METHODS}
            value={values.paymentMethod}
            onChange={(val) => setFieldValue('paymentMethod', val)}
            placeholder="Select method"
            error={touched.paymentMethod && errors.paymentMethod}
          />

          <AnimatePresence mode="wait">
            {isCard ? (
              <motion.div
                key="card-fields"
                className="grid gap-5 sm:grid-cols-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Input
                  name="nameOnCard"
                  label="Name on card"
                  placeholder="John Doe"
                  value={values.nameOnCard}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nameOnCard && errors.nameOnCard}
                />
                <Input
                  name="cardNumber"
                  label="Card number"
                  placeholder="1234 5678 9012 3456"
                  value={values.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardNumber && errors.cardNumber}
                />
                <Input
                  name="expiry"
                  label="Expiry (MM/YY)"
                  placeholder="12/28"
                  value={values.expiry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.expiry && errors.expiry}
                />
                <Input
                  name="cvv"
                  label="CVV"
                  type="password"
                  placeholder="•••"
                  value={values.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cvv && errors.cvv}
                  hint="3 or 4 digits on the back"
                />
              </motion.div>
            ) : (
              <motion.div
                key="other-method"
                className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-sm text-zinc-400">
                  {values.paymentMethod === 'cash'
                    ? 'Payment will be collected in person at the gym.'
                    : 'Complete payment via your preferred UPI app at checkout.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Order summary */}
      {(values.packageName || values.price) && (
        <motion.div
          className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="mb-3 text-sm font-medium text-zinc-400">Summary</h3>
          <div className="space-y-1 text-sm">
            <p className="text-zinc-300">
              <span className="text-zinc-500">Member:</span> {values.fullName || '—'}
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">Package:</span> {values.packageName || '—'} ({values.duration || '—'}{' '}
              month{Number(values.duration) > 1 ? 's' : ''})
            </p>
            <p className="font-semibold text-orange-400">
              Total: ${values.price ? Number(values.price) * Number(values.duration || 1) : '0'}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PaymentDetailsStep
