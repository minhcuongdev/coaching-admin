import React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  )
}

export default SectionTitle
