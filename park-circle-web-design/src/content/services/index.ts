import { getCollection } from "astro:content";

export const getServicesContent = async () => {
  const services = await getCollection("services");
  return services
};
