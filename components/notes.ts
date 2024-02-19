'use server'
import { sql } from "@vercel/postgres";

export async function getNotes() {
    let data
    try {
        data = await sql`SELECT * from rick_and_morty_char_notes`

    } catch (e: any) {
        if (e.message.includes('relation "users" does not exist')) {
          console.log(
            'Table does not exist, creating and seeding it with dummy data now...'
          )
          
        } else {
          throw e
        }
    }

    console.log('>>>>>>>>')
    console.log(data)

    return {
      data
    }
}