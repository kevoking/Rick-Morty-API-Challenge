'use client'
import { useCharacterDrawerContext } from '@/context/CharacterDrawerContext'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import CharacterDetailsContent from './character-details-content'

/**
 * Character details drawer
 * @returns react component: drawer
 */
export default function CharacterDetailsDrawer() {

  // context api state management
  const { selectedCharacterId, setSelectedCharacterId, isCharacterDrawerCollapsed, setCharacterDrawerCollapsed } = useCharacterDrawerContext()

  // close the drawer
  function closeDrawer() {
    // reset the selected character id before closing the drawer
    setSelectedCharacterId("")
    setCharacterDrawerCollapsed(true)
  }

  return (
    <>
      <Sidebar
              id="character-details-drawer"
              collapsed={isCharacterDrawerCollapsed}
              className={twMerge(
              "w-full max-w-[44rem] bg-white/25 bg-opacity-50 fixed inset-y-0 right-0 z-30 top-0 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex shadow-2xl",
              isCharacterDrawerCollapsed && "hidden w-0",
              )}
          >
            <div className={twMerge(
              "fixed top-0 right-0 left-0 bottom-0 bg-black/75 -z-10",
              isCharacterDrawerCollapsed && "hidden w-0",
            )} onClick={() => closeDrawer()}></div>
            <div className={twMerge(
              "fixed top-0 right-0 h-20 p-4 z-40 flex",
              isCharacterDrawerCollapsed && "hidden w-0",
            )}>
                <div className="w-full flex flex-row justify-start items-center ">
                  <button
                    type="button" 
                    className="p-2"
                    onClick={() => closeDrawer()}
                  >
                    <XMarkIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
            </div>

            <div className="mt-20 p-8 pt-2">
              <CharacterDetailsContent id={selectedCharacterId} />
            </div>
      </Sidebar>
    </>
  )
}
