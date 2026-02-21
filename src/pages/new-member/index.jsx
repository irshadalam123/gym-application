import React, { useState, useCallback } from 'react'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'
import { Stepper, Button } from '../../components/common'
import MemberDetailsStep from './MemberDetailsStep'
import MembershipPackageStep from './MembershipPackageStep'
import PaymentDetailsStep from './PaymentDetailsStep'

const STEPS = [
  { id: 'member-details', label: 'Member Details', description: 'Personal info' },
  { id: 'membership', label: 'Membership Package', description: 'Plan & duration' },
  { id: 'payment', label: 'Payment Details', description: 'Pay & confirm' },
]

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  packageId: '',
  packageName: '',
  duration: '',
  price: '',
  paymentMethod: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  nameOnCard: '',
}

function validateMemberDetails(values) {
  const err = {}
  if (!values.fullName?.trim()) err.fullName = 'Full name is required'
  if (!values.email?.trim()) err.email = 'Email is required'
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) err.email = 'Invalid email'
  if (!values.phone?.trim()) err.phone = 'Phone is required'
  if (!values.dateOfBirth) err.dateOfBirth = 'Date of birth is required'
  if (!values.gender) err.gender = 'Please select gender'
  return err
}

function validateMembership(values) {
  const err = {}
  if (!values.packageId) err.packageId = 'Select a package'
  if (!values.duration) err.duration = 'Select duration'
  return err
}

function validatePayment(values) {
  const err = {}
  if (!values.paymentMethod) err.paymentMethod = 'Select payment method'
  if (values.paymentMethod === 'card') {
    if (!values.nameOnCard?.trim()) err.nameOnCard = 'Name on card required'
    if (!values.cardNumber?.trim()) err.cardNumber = 'Card number required'
    if (!values.expiry?.trim()) err.expiry = 'Expiry required'
    if (!values.cvv?.trim()) err.cvv = 'CVV required'
  }
  return err
}

const stepValidators = [validateMemberDetails, validateMembership, validatePayment]

function validateStep(stepIndex, values) {
  const fn = stepValidators[stepIndex]
  return fn ? fn(values) : {}
}

const NewMember = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleSubmit = useCallback((values) => {
    // eslint-disable-next-line no-console
    console.log('New member submitted', values)
    alert(`Member "${values.fullName}" onboarded successfully!`)
  }, [])

  const handleStepChange = useCallback((index) => {
    setActiveStep(index)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Onboard new member</h1>
          <p className="mt-2 text-sm text-zinc-500">Complete the steps below to add a new member to Prime Zone Fitness.</p>
        </div>

        <Formik
          initialValues={initialValues}
          validate={(values) => validateStep(activeStep, values)}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ values, setTouched, validateForm, setErrors }) => {
            const goNext = async () => {
              await validateForm()
              const stepErrors = validateStep(activeStep, values)
              const hasStepErrors = Object.keys(stepErrors).length > 0
              if (hasStepErrors) {
                setErrors(stepErrors)
                setTouched(
                  Object.fromEntries(Object.keys(stepErrors).map((k) => [k, true]))
                )
                return
              }
              if (activeStep < STEPS.length - 1) setActiveStep((s) => s + 1)
            }

            const goBack = () => {
              if (activeStep > 0) setActiveStep((s) => s - 1)
            }

            return (
              <Form className="space-y-8">
                <Stepper
                  steps={STEPS}
                  activeStep={activeStep}
                  onStepChange={handleStepChange}
                  allowStepClick={true}
                  allowAnyStep={false}
                >
                  <MemberDetailsStep />
                  <MembershipPackageStep />
                  <PaymentDetailsStep />
                </Stepper>

                <motion.div
                  className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-6"
                  initial={false}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    {activeStep > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        leftIcon={
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        }
                      >
                        Back
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {activeStep < STEPS.length - 1 ? (
                      <Button type="button" onClick={goNext} rightIcon={<span aria-hidden>→</span>}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" rightIcon={<span aria-hidden>✓</span>}>
                        Complete onboarding
                      </Button>
                    )}
                  </div>
                </motion.div>
              </Form>
            )
          }}
        </Formik>
      </motion.div>
    </div>
  )
}

export default NewMember
