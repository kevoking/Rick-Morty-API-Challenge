import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Image from "next/image";

const client = createApolloClient()

export default async function Home() {

  return (
    <>
      <div className="min-h-[calc(100vh-theme('spacing.16'))] w-full flex flex-row flex-nowrap space-x-8">
        {/*  */}
        <LocationsListComponent />
        <div className="w-full">
          {/*  */}
          <CharactersListComponent />
        </div>
      </div>
    </>
  );
}

/**
 * A list of locations
 * @returns Component
 */
async function LocationsListComponent() {
  
  const { data } = await client.query({
    query: gql`
      query Locations {
        locations {
          results {
            id
            name
            type
            dimension
          }
        }
      }
    `,
  })

  return (
    <>
      <div className="hidden md:block h-[calc(100vh-theme('spacing.16'))] overflow-y-scroll bg-gray-100 dark:bg-gray-950 min-w-80 lg:min-w-96 p-6 lg:p-12">
        {data && data.locations.results.map((location: any) => 
          <div key={location['id']} className="w-full py-2 flex flex-row space-x-2 justify-between items-center">
            <div className="flex flex-col space-y-1">
              <span className="font-semibold">
                {location['name']}
              </span>
              <span className="text-xs">
                {location['type']}
              </span>
            </div>
            <div className="text-end flex flex-col space-y-1">
              
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/**
 * A list of characters
 * @returns Component
 */
async function CharactersListComponent() {
  
  const { data } = await client.query({
    query: gql`
      query Characters {
        characters {
          results {
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
        }
      }
    `,
  })

  return (
    <>
      <div className="h-16">
        {/*  */}
      </div>
      <div className="h-[calc(100vh-theme('spacing.32'))] overflow-y-scroll w-full p-6 lg:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data && data.characters.results.map((character: any) => 
          <div key={character['id']} className="bg-white/25 col-span-1">
            <div className="flex flex-col justify-between items-start">
              {character['image'] &&
                <Image
                  src={character['image']}
                  alt=""
                  height="240"
                  width="240"
                  className="h-40 w-full object-cover"
                />
              }
              <div className="flex flex-col p-2">
                <span className="">
                  {character['name']}
                </span>
                <span className="text-xs">
                  {character['status']}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
