'use client'

import { useCharacterListContext } from "@/context/CharacterListContext"
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { twMerge } from "tailwind-merge"

/**
 * A list of locations
 * @returns Component
 */
export default function LocationsListContent({ locations }: { locations: []}) {
  
  const { selectedLocationId, setSelectedLocationId } = useCharacterListContext()
  return (
    <>
      <div className="hidden md:block fixed h-[calc(100vh-theme('spacing.16'))] overflow-y-scroll bg-gray-100 dark:bg-gray-950 w-80">

        <div className="fixed top-16 w-80 bg-gray-100 dark:bg-gray-950 px-8 py-4 border-b border-gray-200 dark:border-gray-900 flex flex-row justify-between items-center space-x-4">
          
          <h4 className="flex flex-row flex-nowrap justify-start items-center space-x-2 py-2">
            <GlobeEuropeAfricaIcon className="h-6 w-6 text-gray-400 dark:text-gray-800" />
            <span className="text-gray-500 dark:text-gray-700">Locations</span>
          </h4>

          {selectedLocationId != "" && 
            <button 
              className="px-4 py-2 rounded-md bg-gray-400 dark:bg-gray-800 bg-opacity-10 hover:bg-gray-400 dark:hover:bg-gray-800"
              onClick={() => setSelectedLocationId("")}
            >
              <span>All</span>
            </button>}
        </div>

        <div className="p-4 lg:p-8 flex flex-col gap-y-2 mt-16">
          {locations.map((location: any) => 
            <div 
              key={location['id']} 
              className={twMerge(
                "w-full flex flex-row space-x-2 justify-between items-center hover:bg-gray-200 dark:hover:bg-white/25 rounded-md cursor-pointer",
                selectedLocationId === location['id'] && "bg-blue-200 dark:bg-blue-700 "
              )}
            >
              <div 
                className="w-full flex flex-col space-y-1 py-2 px-4"                
                onClick={() => setSelectedLocationId(location['id'])}
              >
                <span className="font-medium">
                  {location['name']}
                </span>
                <span className="text-xs text-opacity-20">
                  {location['type']}
                </span>
              </div>
                {selectedLocationId === location['id'] && 
                  <div className="px-4 py-2">
                    <button
                      type="button"
                      className="p-2 bg-black/10"
                      onClick={() => setSelectedLocationId("")}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                }
            </div>
          )}
        </div>
      </div>
    </>
  )
}