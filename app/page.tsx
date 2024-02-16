
import CharactersListComponent from "@/components/character-list";
import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const client = createApolloClient()

export default async function Home() {
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
        <div className="min-h-[calc(100vh-theme('spacing.16'))] w-full flex flex-row flex-nowrap">
          {/*  */}
          <LocationsListComponent />
          <div className="w-full">
            {/*  */}
            {data && <CharactersListComponent characters={data.characters.results} />}
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
          <div key={location['id']} className="w-full py-2 flex flex-row space-x-2 justify-between items-center hover:bg-white/25 rounded-md cursor-pointer">
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
