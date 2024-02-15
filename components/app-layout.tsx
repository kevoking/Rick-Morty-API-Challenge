'use client'

import { SidebarProvider, useSidebarContext } from '@/context/SidebarContext'
import React from 'react'
import Header from './header'
import AppSidebar from './app-sidebar'
import { twMerge } from 'tailwind-merge'

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <SidebarProvider>
            <AppLayoutContent>
                {children}
            </AppLayoutContent>
        </SidebarProvider>
    )
}

function AppLayoutContent({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { isCollapsed } = useSidebarContext()
    return (
        <>
            <Header />
            <div className="mt-16 flex items-start">
                <AppSidebar />
                <div
                    id="main-content"
                    className={twMerge(
                        "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
                        isCollapsed ? "lg:ml-[4.5rem]" : "lg:ml-64",
                    )}
                    >
                    {children}
                </div>
            </div>
        </>
    )
}
