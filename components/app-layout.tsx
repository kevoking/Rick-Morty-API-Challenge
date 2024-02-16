'use client'

import { SidebarProvider, useSidebarContext } from '@/context/SidebarContext'
import React from 'react'
import Header from './header'
import AppSidebar from './app-sidebar'
import { twMerge } from 'tailwind-merge'
import { CharacterDrawerProvider } from '@/context/CharacterDrawerContext'
import CharacterDetailsDrawer from './character-details-drawer'
import { CharacterListProvider } from '@/context/CharacterListContext'

export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <SidebarProvider>
            <CharacterListProvider>
                <CharacterDrawerProvider>
                    <AppLayoutContent>
                        {children}
                    </AppLayoutContent>
                </CharacterDrawerProvider>
            </CharacterListProvider>
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
                        isCollapsed ? "lg:ml-16" : "lg:ml-64",
                    )}
                    >
                    {children}
                </div>
                <CharacterDetailsDrawer />
            </div>
        </>
    )
}
