import { isDev } from "./helpers";

export const pricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summeries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_cNieVf82F29B6oIa0T1wY00"
      : "",
    priceId: isDev ? "price_1Sspk1QHoWl7BGu3DyoasT7o" : "",
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summeries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_6oUcN7aaN4hJaEY8WP1wY01"
      : "",
    priceId: isDev ? "price_1SspoRQHoWl7BGu3RFXcQlpP" : "",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};

export const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 10,
  },
};

export const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  transition: {
    type: "spring" as const,
    damping: 20,
    stiffness: 100,
  },
};
