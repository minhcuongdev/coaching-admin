import React from 'react'

export interface MainProps {
  children: React.ReactNode
}

function Main({ children }: MainProps) {
  return (
    <main className="h-full overflow-y-auto">
      <div className="container grid px-6 mx-auto">{children}</div>
    </main>
  )
}

export default Main
