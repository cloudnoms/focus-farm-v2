import React from 'react'

const LABELS = {
  focus: { text: 'Focus Session', color: 'text-leaf-700', bg: 'bg-leaf-100' },
  short: { text: 'Short Break', color: 'text-sky-600', bg: 'bg-sky-100' },
  long: { text: 'Long Break', color: 'text-violet-600', bg: 'bg-violet-100' },
}

export default function SessionLabel({ sessionType }) {
  const { text, color, bg } = LABELS[sessionType] || LABELS.focus
  return (
    <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${color} ${bg}`}>
      {text}
    </span>
  )
}
