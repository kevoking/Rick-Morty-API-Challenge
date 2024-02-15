import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const client = createApolloClient()

export default async function Home() {

  return (
    <>
      <div className="min-h-[calc(100vh-theme('spacing.16'))] w-full flex flex-row flex-nowrap space-x-8">
        {/*  */}
        <LocationsListComponent />
        <div className="w-full p-12">
          {/*  */}
        </div>
      </div>
    </>
  );
}

async function LocationsListComponent() {
  
  const { data } = await client.query({
    query: gql`
      query Locations {
        locations {
          results {
            dimension
            id
            name
            type
          }
        }
      }
    `,
  })

  return (
    <>
      <div className="h-[calc(100vh-theme('spacing.16'))] overflow-y-scroll bg-gray-100 dark:bg-gray-950 min-w-96 p-12">
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
