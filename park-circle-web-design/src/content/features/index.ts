import { getCollection, type CollectionEntry } from "astro:content";

export async function getOrderedFeatures() {
  const features: CollectionEntry<"features">[] = await getCollection(
    "features"
  );
  return features.sort((a, b) => a.data.order - b.data.order);
}
