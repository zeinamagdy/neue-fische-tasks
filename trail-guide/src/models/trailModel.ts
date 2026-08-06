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
  slug: string
): Promise<TrailwithRegoin | undefined> => {
  const db = getDB();
  let queryWithSlug = query + ` WHERE r.slug = ?`;
  return (await db.all(queryWithSlug, [slug])) as TrailwithRegoin;
};

export const getTrailsByRegionId = async (
  regionId: number,
): Promise<TrailwithRegoin[] | undefined> => {
  const db = getDB();
  let querywithRegion = query + ` WHERE r.region_id= ?`;
  return await db.all(querywithRegion, [regionId]);
};
