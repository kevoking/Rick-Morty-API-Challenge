'use client'
import React from 'react'
import { DarkThemeToggle, Navbar } from 'flowbite-react'

export default function Header() {

  return (
    <header>
      <Navbar
        fluid
        className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-800 sm:p-0"
      >
        <div className="w-full p-3 pr-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Navbar.Brand href="/">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-extrabold text-2xl py-1 flex flex-row flex-nowrap justify-center items-center content-center object-center drop-shadow-sm">
                  Rick<span className="text-lg px-2">And</span>Morty
                </h1>
              </Navbar.Brand>
            </div>
            <DarkThemeToggle />
          </div>
        </div>
      </Navbar>
    </header>
  )
}
