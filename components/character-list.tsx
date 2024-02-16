'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import {  useCharacterDrawerContext } from "@/context/CharacterDrawerContext"
import { HeartIcon } from "@heroicons/react/24/solid"

/**
 * A list of characters
 * @returns Component
 */
export default function CharactersListComponent ({ characters }: any) {
  
    const { isCharacterDrawerCollapsed, setCharacterDrawerCollapsed, setSelectedCharacterId } = useCharacterDrawerContext()

    function selectCharacter(id: string) {
      setSelectedCharacterId(id)
      setCharacterDrawerCollapsed(!isCharacterDrawerCollapsed)
    }
    
    return (
      <>
             
          <div className="h-24 p-6 lg:p-12 w-full flex flex-row justify-between items-center ">
            {/*  */}
    
            <form className="w-full flex flex-row justify-start items-center">   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-80">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <MagnifyingGlassIcon className="h-4 w-4" />
                    </div>
                    <input type="search" id="default-search" className="block w-full p-2 ps-10 pe-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Location, Character, Episode..." required />
                    <button type="submit" className="text-white absolute end-0 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go</button>
                </div>
            </form>
    
          </div>
    
          <div className="h-[calc(100vh-theme('spacing.40'))] overflow-y-scroll w-full p-6 lg:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {characters.map((character: any) => 
              <div 
                key={character['id']} 
                className="bg-white/25 col-span-1 rounded-md shadow-md" 
                onClick={() => selectCharacter(character['id'])}
              >
                <div className="flex flex-col justify-between items-start gap-y-2">
                  {character['image'] &&
                    <Image
                      src={character['image']}
                      alt=""
                      height="240"
                      width="240"
                      className="h-40 w-full object-cover rounded-t-md"
                    />
                  }
                  <div className="flex flex-col gap-y-1 px-2 py-4">
                    <span className="">
                      {character['name']}
                    </span>
                    <div className={twMerge(
                      "text-xs font-semibold flex flex-row gap-x-1 justify-start items-center",
                      character['status'] == 'Alive' && "text-lime-600 dark:text-lime-400",
                      character['status'] == 'Dead' && "text-red-600 dark:text-red-400"
                    )}>
                      <HeartIcon className="h-4 w-4" />
                      <span>
                        {character['status']}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
      </>
    )
}
  