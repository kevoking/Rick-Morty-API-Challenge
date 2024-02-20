'use client'

import { GlobeEuropeAfricaIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import {  useCharacterDrawerContext } from "@/context/CharacterDrawerContext"
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useCharacterListContext } from "@/context/CharacterListContext"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type FilterInputs = {
  search: string,
  location: string | null
}
/**
 * A list of characters
 * @returns Component
 */
export default function CharactersListComponent ({ characters }: any) {
  
    const { isCharacterDrawerCollapsed, setCharacterDrawerCollapsed, setSelectedCharacterId } = useCharacterDrawerContext()
    const {
      selectedLocationId,
      selectedLocationName,
      showLocationDrawer,
      setShowLocationDrawer,
      setSelectedLocationId,
      setSelectedLocationName
    } = useCharacterListContext()

    const [ filteredCharacters, setFilteredCharacters ] = useState(characters)

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
    } = useForm()

    const searchQuery = watch("search")

    function clearLocationFilter() {
      setSelectedLocationId("")
      setSelectedLocationName("")
    }

    const onSubmit: SubmitHandler<FilterInputs> = (data) => {
      //
    }

    function selectCharacter(id: string) {
      setSelectedCharacterId(id)
      setCharacterDrawerCollapsed(!isCharacterDrawerCollapsed)
    }

    useEffect(() => {

      let filtered = characters
      
      selectedLocationId != "" && (filtered = filtered.filter((character: { [x: string]: { [x: string]: string } }) => character["location"]["id"] == selectedLocationId))

      filtered = filtered.filter(
        (character: any) => character["name"].toLowerCase().includes(searchQuery)
      )

      setFilteredCharacters(filtered)

    }, [selectedLocationId, searchQuery, characters])
    
    return (
      <>
             
          <div className="px-6 py-4 lg:px-12 w-full flex flex-row justify-between items-center ">
            {/*  */}
    
            <form 
              onSubmit={handleSubmit(() => {})}
              className="w-full grid grid-cols-1 gap-y-2 md:flex md:flex-row md:space-x-4 justify-start items-center"> 
                <div className="w-full flex flex-col">  
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="w-full flex flex-row flex-nowrap space-x-4 justify-start items-center">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <MagnifyingGlassIcon className="h-4 w-4" />
                      </div>
                      <input
                        {...register("search")}
                        type="search" 
                        id="default-search" 
                        className="block w-full max-w-md p-2 ps-10 pe-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Character name, Episode..." 
                      />
                      
                    </div>
                    
                  </div>
                  {errors.search && <span className="text-sm text-red-950 dark:text-red-800">Type something to search...</span>}
                </div>
                <div className="w-full max-w-md flex flex-col md:hidden">  
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Location</label>
                  <div className="w-full flex flex-row flex-nowrap space-x-4 justify-start items-center">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <GlobeEuropeAfricaIcon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex flex-row flex-nowrap justify-between items-center space-x-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <button
                          type="button"
                          onClick={() => setShowLocationDrawer(!showLocationDrawer)}
                          className="w-full p-2 ps-10 text-sm  text-left" 
                        >
                          <span>{
                            selectedLocationName != "" ?
                              selectedLocationName : "Select Location"
                          }</span>
                        </button>
                        { selectedLocationName != "" && <button
                          type="button"
                          onClick={() => clearLocationFilter()}
                          className="p-2 text-sm" 
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>}
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
            </form>
    
          </div>
          
          <div className="h-[calc(100vh-theme('spacing.40'))] overflow-y-scroll w-full p-6 lg:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCharacters.map((character: any) => 
              <div 
                key={character['id']} 
                className="bg-gray-100 dark:bg-gray-800 col-span-1 rounded-md shadow-md h-64 cursor-pointer" 
                onClick={() => selectCharacter(character['id'])}
              >
                <div className="flex flex-col justify-between items-start gap-y-1">
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
  