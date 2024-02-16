import createApolloClient from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { HeartIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const client = createApolloClient()

export default function CharacterDetailsContent({
    id
}: {id: string}) {

    const [ character, setCharacter ] = useState(null)

    async function getCharacter() {
        const { data } = await client.query({
            query: gql`
            query Character {
                character(id: ${id}) {
                    id
                    name
                    status
                    species
                    type
                    gender
                    origin {
                        id
                        name
                    }
                    location {
                        id
                        name
                    }
                    image
                    episode {
                        id
                        name              
                    }
                }
            }`,
        })
    
        setCharacter(data.character)
    }

    useEffect(() => {
        getCharacter()
    })

    return (
        <>
            {character && <div className="flex flex-col justify-center items-center gap-y-4">

                <div className="h-52 w-52 ">
                    <Image
                        src={character["image"]}
                        alt=""
                        height={512}
                        width={512}
                        className="h-52 w-52 rounded-full shadow-md object-contain"
                    />
                </div>
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
                <h1 className="text-lg font-medium">{character["name"]}</h1>
                {/*  */}

                <dl className="w-full px-4 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col py-2">
                        <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">Location</dt>
                        <dd className="text-md">{character['location']['name']}</dd>
                    </div>
                    <div className="flex flex-col py-2">
                        <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">Origin</dt>
                        <dd className="text-md">{character['origin']['name']}</dd>
                    </div>
                    <div className="flex flex-col py-2">
                        <dt className="mb-1 text-gray-500 text-sm dark:text-gray-400">Species</dt>
                        <dd className="text-md">{character['species']}</dd>
                    </div>
                </dl>

            </div>}
        </>
    )
}