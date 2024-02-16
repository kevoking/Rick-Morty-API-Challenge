'use client'

import React from 'react'
import Header from './header'
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
        <CharacterListProvider>
            <CharacterDrawerProvider>
                <AppLayoutContent>
                    {children}
                </AppLayoutContent>
            </CharacterDrawerProvider>
        </CharacterListProvider>
    )
}

function AppLayoutContent({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <>
            <Header />
            <div className="mt-16 flex items-start">

                <div
                    id="main-content"
                    className={twMerge(
                        "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
                    )}
                    >
                    {children}
                </div>
                <CharacterDetailsDrawer />
            </div>
        </>
    )
}
