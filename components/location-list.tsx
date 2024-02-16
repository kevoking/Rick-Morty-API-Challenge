import createApolloClient from "@/lib/apollo-client"
import { gql } from "@apollo/client"
import LocationsListContent from "./location-list-content"

/**
 * A list of locations
 * @returns Component
 */
export default async function LocationsListComponent() {
    const client = createApolloClient()

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
        {data && <LocationsListContent locations={data.locations.results} />}
      </>
    )
  }