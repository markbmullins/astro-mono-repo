import { getCollection } from "astro:content";

export const getPortfolioContent = async () => {
  const portfolioItems = await getCollection("portfolio");
  return portfolioItems.sort((a, b) => a.data.order - b.data.order);
};
