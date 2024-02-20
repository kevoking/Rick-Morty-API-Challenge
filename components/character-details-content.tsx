import createApolloClient from '@/lib/apollo-client'
import { realtimeDatabase } from '@/lib/firebase-config'
import { gql } from '@apollo/client'
import { ref, get as getFirebaseData, push, serverTimestamp } from 'firebase/database'
import { HeartIcon } from '@heroicons/react/24/solid'
import { Spinner } from 'flowbite-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

// use apollo-client to get character details from graphql end-point
const client = createApolloClient()

/**
 * 
 * @param param0 @id of the selected character
 * @returns component displaying character info and notes
 */
export default function CharacterDetailsContent({
    id
}: {id: string}) {

    // firebase realtime datatabse fererence to character notes
    const notesRef = ref(realtimeDatabase, 'characters/notes/' + id)

    // use react-hook-form
    // for creating notes about the character
    const {
        register,
        handleSubmit,
        resetField
    } = useForm()

    //state management for the component
    const [ character, setCharacter ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ notes, setNotes ] = useState(null)

    // fetch character detaoils from graphql backend
    async function getCharacter() {
        setLoading(true)
        const { data, loading } = await client.query({
            query: gql`
                query {
                    character (id: ${id}) {
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
                            episode
                        }
                    }
                }`,
            })
    
        setLoading(loading)
        setCharacter(data.character)
    }

    // fetch character notes from firebase realtime database
    async function fetchNotes() {
        
        const snapshot = await getFirebaseData(notesRef)

        if (snapshot.exists()) {
            console.log(snapshot.val())
            setNotes(snapshot.val())
        } else {
            setNotes(null)
        }
    }

    // submit character notes and save to firebase realtime database
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        push(notesRef, {
            note: data.note
        })
        resetField('note')
    }

    useEffect(() => {
        if (id != "") {
            getCharacter()
            fetchNotes()
        }
    })

    // return a spinner if the loading state is true @while fetching character details
    if (loading == true) {
        return (<>
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        </>)
    }

    // return character details
    return (
        <>
            {character && <div className="w-full flex flex-col justify-center items-center gap-y-4">

                <div className="w-full flex flex-col sm:flex-row justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="h-52 w-52 mb-4">
                            <Image
                                src={character["image"]}
                                alt=""
                                height={512}
                                width={512}
                                className="h-52 w-52 rounded-3xl shadow-md object-contain"
                            />

                        </div>
                        <div className={twMerge(
                            "text-xs font-semibold flex flex-row gap-x-1 justify-center items-center",
                            character['status'] == 'Alive' && "text-lime-600 dark:text-lime-400",
                            character['status'] == 'Dead' && "text-red-600 dark:text-red-400"
                            )}>
                            <HeartIcon className="h-4 w-4" />
                            <span>
                            {character['status']}
                            </span>
                        </div>
                    </div>

                    <div className="px-4">
                        
                        <h1 className="text-lg font-medium px-4 mb-2">{character["name"]}</h1>
                        {/*  */}

                        <dl className="w-full px-4 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-col py-1">
                                <dt className="mb-1 text-gray-500 text-xs dark:text-gray-400">Location</dt>
                                <dd className="text-sm">{character['location']['name']}</dd>
                            </div>
                            <div className="flex flex-col py-1">
                                <dt className="mb-1 text-gray-500 text-xs dark:text-gray-400">Origin</dt>
                                <dd className="text-sm">{character['origin']['name']}</dd>
                            </div>
                            <div className="flex flex-col py-1">
                                <dt className="mb-1 text-gray-500 text-xs dark:text-gray-400">Species</dt>
                                <dd className="text-sm">{character['species']}</dd>
                            </div>
                            <div className="flex flex-col py-1">
                                <dt className="mb-1 text-gray-500 text-xs dark:text-gray-400">Episode</dt>
                                <dd className="text-sm">{character['episode']['episode'] ?? 'Not Available'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                
                {/* character notes section */}
                <div className="w-full py-4 my-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <textarea {...register('note', { required: true})} className="w-full border border-gray-200 dark:border-gray-700 bg-black/10 dark:bg-white/10 rounded-lg" placeholder="Write your notes here"></textarea>
                                <div className="w-full flex flex-row justify-end items-end">
                                    <button className="rounded-lg bg-blue-500 dark:bg-blue-700 px-4 py-2 text-sm text-white" type="submit">Add Note</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col bg-black/5 dark:bg-white/5 rounded-lg px-2 py-4 divide-y divide-black/10 dark:divide-white/10">
                        <h4>Notes</h4>
                        {notes && Object.values(notes).reverse().map((note: any, index) =>
                            (<div key={index} className="">
                                <p className="text-sm w-full pt-2">{note['note']}</p>
                            </div>)
                        )}
                    </div>
                </div>

            </div>}
        </>
    )
}
