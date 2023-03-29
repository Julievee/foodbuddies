import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  restaurant: string;
  address: string | null;
  website: string | null;
  userId: number;
};

export const createFavorite = cache(
  async (
    restaurant: string,
    address: string | null,
    website: string | null,
    userId: number,
  ) => {
    const [favorite] = await sql<Favorite[]>`
    INSERT INTO favorites
     (restaurant,address,website,phone,user_id)
    VALUES
     (${restaurant}, ${address}, ${website}, ${userId})
     RETURNING
      id,
      restaurant,
      address,
      website,
      user_id
  `;
    return favorite;
  },
);

export const getFavoritesByUserId = cache(async (userId: number) => {
  const favorites = await sql<Favorite[]>`
    SELECT * FROM favorites
    WHERE
    user_id = ${userId}
  `;

  return favorites;
});
