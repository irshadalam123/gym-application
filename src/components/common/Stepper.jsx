import { Children } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function getStepCircleClass(isActive, isCompleted, clickable) {
  if (isActive) return 'border-orange-500 bg-orange-500 text-white'
  if (isCompleted) return 'border-orange-500 bg-orange-500 text-white'
  if (!isActive && !isCompleted) return 'border-zinc-600 bg-zinc-800/80 text-zinc-400'
  return ''
}

function getLabelClass(isActive, isCompleted) {
  if (isActive) return 'text-orange-400'
  if (isCompleted) return 'text-zinc-300'
  return 'text-zinc-500'
}

function getLabelOpacity(isActive, isCompleted) {
  if (isActive) return 1
  if (isCompleted) return 0.9
  return 0.7
}

/**
 * Reusable stepper for multi-step forms. Shows step indicators with optional
 * animated content panels. Uses framer-motion for transitions and interactions.
 *
 * @param {Array<{ id: string, label: string, description?: string }>} steps - Step definitions
 * @param {number} activeStep - Current step index (0-based)
 * @param {function(number): void} [onStepChange] - Called when step changes (e.g. next/prev or step click)
 * @param {boolean} [allowStepClick=true] - Whether clicking a step header navigates to it (only if index <= activeStep or allowAnyStep)
 * @param {boolean} [allowAnyStep=false] - If true, allow clicking any step; if false, only steps up to activeStep
 * @param {React.ReactNode} [children] - Optional. One child per step; active step content is shown with animation
 * @param {string} [className] - Wrapper class
 */
function Stepper({
  steps = [],
  activeStep = 0,
  onStepChange,
  allowStepClick = true,
  allowAnyStep = false,
  children,
  className = '',
}) {
  const canGoToStep = (index) => {
    if (!allowStepClick || !onStepChange) return false
    if (allowAnyStep) return true
    return index <= activeStep
  }

  const completed = (index) => index < activeStep
  const childArray = children == null ? [] : Children.toArray(children)

  return (
    <div className={`w-full ${className}`}>
      {/* Step indicators */}
      <div className="relative flex items-start justify-between gap-2">
        {steps.map((step, index) => {
          const isActive = index === activeStep
          const isCompleted = completed(index)
          const clickable = canGoToStep(index)
          const isLast = index === steps.length - 1

          return (
            <div
              key={step.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Connector line (before this step) - full when we've reached this step */}
              {index > 0 && (
                <div className="absolute left-0 right-1/2 top-5 h-0.5 w-full -translate-y-1/2 bg-zinc-700">
                  <motion.div
                    className="h-full bg-orange-500"
                    initial={false}
                    animate={{ width: activeStep >= index ? '100%' : '0%' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                </div>
              )}

              {/* Step circle + label */}
              <div className="relative z-10 flex flex-col items-center">
                <motion.button
                  type="button"
                  onClick={() => clickable && onStepChange(index)}
                  disabled={!clickable}
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold
                    transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
                    ${getStepCircleClass(isActive, isCompleted, clickable)}
                    ${clickable ? 'cursor-pointer hover:opacity-90' : 'cursor-default'}
                    ${!clickable && !isActive && !isCompleted ? 'opacity-70' : ''}
                  `}
                  whileHover={clickable ? { scale: 1.08 } : undefined}
                  whileTap={clickable ? { scale: 0.96 } : undefined}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        aria-hidden
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="num"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="leading-none"
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="mt-2 text-center">
                  <motion.span
                    className={`block text-sm font-medium ${getLabelClass(isActive, isCompleted)}`}
                    animate={{ opacity: getLabelOpacity(isActive, isCompleted) }}
                  >
                    {step.label}
                  </motion.span>
                  {step.description && (
                    <span className="mt-0.5 block text-xs text-zinc-500">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Connector line (after this step) - full when we've completed this step */}
              {!isLast && (
                <div className="absolute left-1/2 right-0 top-5 h-0.5 w-full -translate-y-1/2 bg-zinc-700">
                  <motion.div
                    className="h-full bg-orange-500"
                    initial={false}
                    animate={{ width: activeStep > index ? '100%' : '0%' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Optional step content (one child per step) */}
      {childArray.length > 0 && (
        <div className="mt-8 min-h-[200px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              {childArray[activeStep] ?? null}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default Stepper
