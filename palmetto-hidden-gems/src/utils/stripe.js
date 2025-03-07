import { loadStripe } from "@stripe/stripe-js";
export const stripe = loadStripe(
  "pk_test_51Qdd68KVR4dzZcDSIkgLwZ0jyofpAV8FvmVgZRTxL8CiwTn65MBH0kWQTzEJAvYeCDE8Yjt0FDZogAWhl7kS3TAD00dEvdc4Cz",
  {
    betas: ["custom_checkout_beta_5"],
  }
);
