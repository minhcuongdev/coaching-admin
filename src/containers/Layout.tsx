import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import Main from './Main'
import ThemedSuspense from '../components/ThemedSuspense'

export interface LayoutProps {}

export default function Layout(props: LayoutProps) {
  return (
    // className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
    //   isSidebarOpen && 'overflow-hidden'
    // }`}
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Outlet />
          </Suspense>
        </Main>
      </div>
    </div>
  )
}
