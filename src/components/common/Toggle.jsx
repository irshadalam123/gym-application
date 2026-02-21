/**
 * Reusable switch/toggle for boolean settings.
 * Styled to match the app's dark theme (zinc, orange accent).
 *
 * @param {boolean} checked - Current on/off state
 * @param {function(boolean): void} onChange - Called with new value when toggled
 * @param {string} [label] - Label next to the switch
 * @param {string} [description] - Optional hint below the label
 */
export default function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="flex-1 min-w-0">
        {label && (
          <p className="text-sm font-medium text-zinc-200">{label}</p>
        )}
        {description && (
          <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
          checked ? 'bg-orange-500' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
          style={{ marginTop: 2 }}
        />
      </button>
    </div>
  );
}
