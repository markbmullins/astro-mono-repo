interface TourPricingConfig {
  discountPerPerson: number; // Discount percentage increase per additional person (e.g., 10 for 10%)
  maxDiscount: number; // Maximum discount percentage (e.g., 50 for 50%)
}

// Example usage:
const config: TourPricingConfig = {
  discountPerPerson: 10, // 10% discount per additional person
  maxDiscount: 50, // Maximum discount of 50%
};

export function calculateTourPrice(
  numberOfPeople: number,
  basePrice: number
): { totalPrice: string; totalDiscount: string } {
  if (numberOfPeople <= 0) {
    throw new Error("Number of people must be at least 1.");
  }

  const { discountPerPerson, maxDiscount } = config;
  let totalPrice = 0;
  let totalDiscount = 0;

  for (let i = 1; i <= numberOfPeople; i++) {
    const discountPercentage = Math.min(
      (i - 1) * discountPerPerson,
      maxDiscount
    );
    const discountAmount = (basePrice * discountPercentage) / 100;
    const priceForPerson = basePrice - discountAmount;

    totalPrice += priceForPerson;
    totalDiscount += discountAmount;
  }

  return {
    totalPrice: totalPrice.toFixed(2),
    totalDiscount: totalDiscount.toFixed(2),
  };
}
