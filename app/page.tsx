
import CharactersListComponent from "@/components/character-list";
import LocationsListComponent from "@/components/location-list";
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
          <div className="w-full md:ml-80">
            {/*  */}
            {data && <CharactersListComponent characters={data.characters.results} />}
          </div>
        </div>
      </>
  );
}

