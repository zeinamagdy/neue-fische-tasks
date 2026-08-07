import { getDB } from "./db";
import type { Region } from "../dataTypes/data.t";

export const getAllRegions = async (): Promise<Region[] | undefined> => {
  const db = getDB();
  return (await db.all("SELECT * FROM regions")) as Region[];
};
export const getRegionBySlug = async (
  slug: string,
): Promise<Region | undefined> => {
  const db = getDB();
  return await db.get("SELECT * FROM regions WHERE slug = ?", [slug]) as Region ;
};
