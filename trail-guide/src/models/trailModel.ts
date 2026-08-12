import { getDB } from "./db";
import type { Trail, TrailwithRegoin } from "../dataTypes/data.t";
//inner join between trail and region tabel main query
let query = `
    SELECT 
      t.*, 
      r.name AS region_name, 
      r.country AS region_country 
    FROM trails t 
    INNER JOIN regions r ON t.region_id = r.id
  `;
export const getAllTrails = async (): Promise<Trail[] | undefined> => {
  const db = getDB();
  return (await db.all(query)) as TrailwithRegoin[];
};

export const getTrailBySlug = async (
  slug: string,
): Promise<TrailwithRegoin | undefined> => {
  const db = getDB();
  let queryWithSlug = query + `WHERE t.slug = ?`;
  return (await db.get(queryWithSlug, [slug])) as TrailwithRegoin;
};

export const getTrailsByRegionId = async (
  regionId: number,
): Promise<TrailwithRegoin[] | undefined> => {
  const db = getDB();
  let querywithRegion = query + ` WHERE t.region_id= ?`;
  return await db.all(querywithRegion, [regionId]);
};
export const createTrail = async (
  trail: Omit<Trail, "id">,
): Promise<number> => {
  const db = getDB();
  const result = await db.run(
    `INSERT INTO trails (title, difficulty,slug, distance_km, description, image_url,created_at,region_id)
     VALUES (@title, @difficulty,@slug, @distance_km, @description,@image_url,@created_at,@region_id)`,
    {
      "@title": trail.title,
      "@slug": slugify(trail.title),
      "@difficulty": trail.difficulty,
      "@distance_km": trail.distance_km,
      "@description": trail.description,
      "@image_url": trail.image_url,
      "@created_at": trail.created_at,
      "@region_id": trail.region_id,
    },
  );
  return result.lastID!;
};

export const updateTrail = async (
  id: number,
  trail: Omit<Trail, "id">,
): Promise<void> => {
  const db = getDB();
  console.log("updsted", trail);
  await db.run(
    `UPDATE  trails SET title = @title, slug=@slug, difficulty = @difficulty, 
    description = @description, image_url = @image_url,
    region_id = @region_id,distance_km = @distance_km
     WHERE id = @id`,

    {
      "@title": trail.title,
      "@slug": slugify(trail.title),
      "@difficulty": trail.difficulty,
      "@distance_km": trail.distance_km,
      "@description": trail.description,
      "@image_url": trail.image_url,
      "@region_id": trail.region_id,
      "@id": id,
    },
  );
};

export const deleteTrail = async (id: number): Promise<void> => {
  const db = getDB();
  await db.run(`DELETE FROM trails WHERE id = @id`, { "@id": id });
};
export const formateDate = (date: number): string => {
  return new Date(date * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
//TODO: convert to UID
export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};
