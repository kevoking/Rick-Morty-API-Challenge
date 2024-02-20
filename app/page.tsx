
import CharactersListComponent from "@/components/character-list";
import LocationsListContent from "@/components/location-list-content";
import createApolloClient from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const client = createApolloClient()

/**
 * graph query to get charaters and locations
 */
const GRAPH = gql`
query {
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
        episode
      }
    }
  }
  locations {
    results {
      id
      name
      type
      dimension
    }
  }
}
`

export default async function Home() {

  // get data from our graphql end-point
  const { data } = await client.query({
    query: GRAPH,
  })
  return (
      <>
        <div className="min-h-[calc(100vh-theme('spacing.16'))] w-full flex flex-row flex-nowrap">
          {/*  */}
          {data && <LocationsListContent locations={data.locations.results} />}
          <div className="w-full md:ml-80">
            {/*  */}
            {data && <CharactersListComponent characters={data.characters.results} />}
          </div>
        </div>
      </>
  );
}

