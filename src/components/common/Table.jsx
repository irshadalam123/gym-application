import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** Icon components for table actions */
const ActionIconView = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)
const ActionIconEdit = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const ActionIconDelete = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const ACTION_ICONS = {
  view: ActionIconView,
  edit: ActionIconEdit,
  delete: ActionIconDelete,
}

const ACTION_STYLES = {
  view: 'p-2 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors',
  edit: 'p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors',
  delete: 'p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors',
}

/**
 * Reusable data table with optional sorting, loading state, and empty state.
 * Styled to match the app's dark theme (zinc-900, orange accent).
 *
 * @param {Array<{ key: string, label: string, align?: 'left'|'center'|'right', render?: (value, row) => React.ReactNode, sortable?: boolean }>} columns - Column definitions
 * @param {Array<object>} data - Array of row objects (keys should match column keys)
 * @param {string} [keyField='id'] - Property used as React key for each row
 * @param {string} [sortKey] - Current sort column key
 * @param {'asc'|'desc'} [sortOrder='asc']
 * @param {function(key: string): void} [onSort] - Called when a sortable header is clicked
 * @param {boolean} [loading] - Show loading skeleton
 * @param {React.ReactNode} [emptyMessage] - Shown when data is empty and not loading
 * @param {boolean} [striped] - Alternate row background
 * @param {boolean} [stickyHeader] - Keep header visible on scroll
 * @param {string} [className] - Extra classes for the wrapper
 * @param {function(row, index): React.ReactNode} [expandableRow] - Optional expandable content per row
 * @param {Array<{ key: string, label?: string, ariaLabel?: string, onClick: (row) => void, variant: 'view'|'edit'|'delete' }>} [actions] - Action buttons per row (icons rendered in table)
 */
export default function Table({
  columns,
  data = [],
  keyField = 'id',
  sortKey,
  sortOrder = 'asc',
  onSort,
  loading = false,
  emptyMessage = 'No data to display',
  striped = true,
  stickyHeader = true,
  className = '',
  expandableRow,
  actions = [],
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const displayColumns = actions.length > 0
    ? [
        ...columns,
        {
          key: 'action',
          label: 'Action',
          align: 'right',
          isActionColumn: true,
        },
      ]
    : columns

  return (
    <section
      className={`rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden ${className}`}
      aria-label="Data table"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/95">
              {displayColumns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 ${alignClass[col.align] || 'text-left'} ${
                    stickyHeader ? 'sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm' : ''
                  } ${col.sortable && onSort ? 'cursor-pointer select-none hover:text-orange-400 transition-colors' : ''}`}
                  scope="col"
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && onSort && sortKey === col.key && (
                      <span className="text-orange-400" aria-hidden>
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              {expandableRow && <th className="w-10 px-2" scope="col" aria-label="Expand" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {loading ? (
              Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={`skeleton-${rowIdx}`} className={striped && rowIdx % 2 === 1 ? 'bg-zinc-800/30' : ''}>
                  {displayColumns.map((col, colIdx) => (
                    <td key={col.key} className="px-4 py-3">
                      <div
                        className="h-5 rounded bg-zinc-700/60 animate-pulse"
                        style={{ width: colIdx === 0 ? '60%' : '40%' }}
                      />
                    </td>
                  ))}
                  {expandableRow && <td className="px-2" />}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={displayColumns.length + (expandableRow ? 1 : 0)}
                  className="px-4 py-12 text-center text-zinc-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              <AnimatePresence mode="popLayout">
                {data.map((row, index) => (
                  <TableRow
                    key={row[keyField] ?? index}
                    row={row}
                    index={index}
                    columns={displayColumns}
                    alignClass={alignClass}
                    striped={striped}
                    expandableRow={expandableRow}
                    actions={actions}
                  />
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TableRow({ row, index, columns, alignClass, striped, expandableRow, actions = [] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`group border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/40 ${
          striped && index % 2 === 1 ? 'bg-zinc-800/20' : ''
        }`}
      >
        {columns.map((col) => (
          <td
            key={col.key}
            className={`px-4 py-3 text-sm text-zinc-300 ${alignClass[col.align] || 'text-left'}`}
          >
            {col.isActionColumn && actions.length > 0 ? (
              <div className="flex items-center justify-end gap-1">
                {actions.map((action) => {
                  const Icon = ACTION_ICONS[action.variant]
                  const className = ACTION_STYLES[action.variant]
                  return (
                    <motion.button
                      key={action.key}
                      type="button"
                      onClick={() => action.onClick(row)}
                      className={className}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={action.ariaLabel ?? action.label ?? action.key}
                    >
                      {Icon && <Icon />}
                    </motion.button>
                  )
                })}
              </div>
            ) : col.render ? (
              col.render(row[col.key], row)
            ) : (
              row[col.key]
            )}
          </td>
        ))}
        {expandableRow && (
          <td className="px-2 py-2 w-10">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="p-1.5 rounded-md text-zinc-500 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse row' : 'Expand row'}
            >
              <span className="inline-block transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : '' }}>
                ▼
              </span>
            </button>
          </td>
        )}
      </motion.tr>
      {expandableRow && expanded && (
        <tr className="bg-zinc-800/30 border-b border-zinc-800/50">
          <td colSpan={columns.length + 1} className="px-4 py-3">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {expandableRow(row, index)}
            </motion.div>
          </td>
        </tr>
      )}
    </>
  )
}
