import React from 'react'
import MainNavigation from '../components/mainNavigation'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
  )
}
