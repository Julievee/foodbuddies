import { cache } from 'react';
import { sql } from './connect';

export type Favorite = {
  id: number;
  locationId: number | null;
  userId: number | null;
};

export const getFavorites = cache(async (userId: number) => {
  const favorites = await sql<Favorite[]>`
  SELECT * FROM favorites WHERE favorites.user_id = ${userId}
  `;

  return favorites;
});

export const getFavoriteById = cache(async (id: number) => {
  const [favorite] = await sql<Favorite[]>`
  SELECT
    *
  FROM
    favorites
  WHERE
    id = ${id}
  `;

  return favorite;
});

export const getFavoriteByUserAndLocation = cache(
  async (userId: number, locationId: number) => {
    const [favorite] = await sql<
      { userId: number | null; locationId: number | null }[]
    >`
  SELECT
    user_id,
    location_id
  FROM
    favorites
  WHERE
    user_id = ${userId} AND
    location_id = ${locationId}
  `;

    return favorite;
  },
);

export const createFavorite = cache(
  async (locationId: number, userId: number) => {
    const [favorite] = await sql<Favorite[]>`
    INSERT INTO favorites
     (user_id, location_id)
    VALUES
      (${userId}, ${locationId})
    RETURNING *
  `;

    return favorite;
  },
);


export type FavoriteWithLocationInfo = {
  favoriteId: number;
  locationId: number;
  locationName: string;
  userId: number;
};

export const getFavoriteByIdWithLocationInfo = cache(async (userId: number) => {
  const favoritesWithLocationInfo = await sql<FavoriteWithLocationInfo[]>`
  SELECT
    favorites.id AS favorite_id,
    locations.id AS location_id,
    locations.name AS location_name,
    users.id AS user_id
  FROM
    favorites
  INNER JOIN
    locations ON favorites.location_id = locations.id
  INNER JOIN
    users ON favorites.user_id = users.id
  WHERE
    favorites.user_id = ${userId}
  `;
  return favoritesWithLocationInfo;
});
