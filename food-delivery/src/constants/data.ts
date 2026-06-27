/**
 * Dummy data for the dashboard (home / categories / restaurant / cart).
 *
 * Images are remote (Unsplash CDN) so the demo looks real without bundling
 * food photos. Swap for local assets or an API later.
 */

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  calories: number;
  image: string;
  categoryId: string;
  restaurantId: string;
  popular?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  mealIds: string[];
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`;

export const currentUser: User = {
  name: "Abdelalim",
  email: "abdelalim@tastio.app",
  avatar: "https://i.pravatar.cc/150?img=12",
};

export const categories: Category[] = [
  { id: "burger", name: "Burger", image: photo("1568901346375-23c9450c58cd") },
  { id: "pizza", name: "Pizza", image: photo("1565299624946-b28f40a0ae38") },
  { id: "chicken", name: "Chicken", image: photo("1562967914-608f82629710") },
  { id: "salad", name: "Salad", image: photo("1512621776951-a57141f2eefd") },
  { id: "pasta", name: "Pasta", image: photo("1551183053-bf91a1d81141") },
  { id: "sushi", name: "Sushi", image: photo("1579871494447-9811cf80d66c") },
];

export const meals: Meal[] = [
  {
    id: "m1",
    name: "Jumbo Burger",
    description: "Fast food burger, chicken, meat. Different type of sandwiches.",
    price: 59,
    rating: 4.6,
    calories: 590,
    image: photo("1568901346375-23c9450c58cd"),
    categoryId: "burger",
    restaurantId: "r1",
    popular: true,
  },
  {
    id: "m2",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella and fresh basil.",
    price: 72,
    rating: 4.8,
    calories: 760,
    image: photo("1565299624946-b28f40a0ae38"),
    categoryId: "pizza",
    restaurantId: "r2",
    popular: true,
  },
  {
    id: "m3",
    name: "Crispy Fried Chicken",
    description: "Golden, crunchy fried chicken with a secret spice blend.",
    price: 48,
    rating: 4.5,
    calories: 640,
    image: photo("1562967914-608f82629710"),
    categoryId: "chicken",
    restaurantId: "r1",
    popular: true,
  },
  {
    id: "m4",
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, croutons and Caesar dressing.",
    price: 35,
    rating: 4.3,
    calories: 320,
    image: photo("1512621776951-a57141f2eefd"),
    categoryId: "salad",
    restaurantId: "r3",
    popular: true,
  },
  {
    id: "m5",
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta, egg and black pepper.",
    price: 64,
    rating: 4.7,
    calories: 820,
    image: photo("1551183053-bf91a1d81141"),
    categoryId: "pasta",
    restaurantId: "r2",
  },
  {
    id: "m6",
    name: "Salmon Sushi Set",
    description: "Fresh salmon nigiri and maki, served with soy and wasabi.",
    price: 95,
    rating: 4.9,
    calories: 540,
    image: photo("1579871494447-9811cf80d66c"),
    categoryId: "sushi",
    restaurantId: "r3",
    popular: true,
  },
  {
    id: "m7",
    name: "Double Cheeseburger",
    description: "Two beef patties, melted cheddar and house sauce.",
    price: 66,
    rating: 4.6,
    calories: 910,
    image: photo("1550547660-d9450f859349"),
    categoryId: "burger",
    restaurantId: "r1",
  },
  {
    id: "m8",
    name: "Pepperoni Pizza",
    description: "Loaded with pepperoni and extra mozzarella cheese.",
    price: 78,
    rating: 4.7,
    calories: 980,
    image: photo("1628840042765-356cda07504e"),
    categoryId: "pizza",
    restaurantId: "r2",
  },
];

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Burger Town",
    description:
      "Home of the juiciest burgers and crispy fried chicken in the city.",
    image: photo("1571091718767-18b5b1457add"),
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 9,
    mealIds: ["m1", "m3", "m7"],
  },
  {
    id: "r2",
    name: "Bella Napoli",
    description: "Authentic wood-fired pizza and fresh Italian pasta.",
    image: photo("1513104890138-7c749659a591"),
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 12,
    mealIds: ["m2", "m5", "m8"],
  },
  {
    id: "r3",
    name: "Green & Fresh",
    description: "Healthy salads, sushi and bowls made to order.",
    image: photo("1540189549336-e6e99c3679fe"),
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: 8,
    mealIds: ["m4", "m6"],
  },
];

export const banners: Banner[] = [
  {
    id: "b1",
    title: "Our Best Seller!",
    subtitle: "Loved by thousands, now it's your turn!",
    cta: "Order now",
    image: photo("1568901346375-23c9450c58cd"),
  },
  {
    id: "b2",
    title: "Free Delivery",
    subtitle: "On your first 3 orders over ₹50.",
    cta: "Claim now",
    image: photo("1513104890138-7c749659a591"),
  },
  {
    id: "b3",
    title: "Sushi Mondays",
    subtitle: "Get 20% off all sushi sets every Monday.",
    cta: "See deals",
    image: photo("1579871494447-9811cf80d66c"),
  },
];

export const popularMeals = meals.filter((m) => m.popular);

export function getMealById(id: string): Meal | undefined {
  return meals.find((m) => m.id === id);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getMealsByRestaurant(id: string): Meal[] {
  return meals.filter((m) => m.restaurantId === id);
}

export function getMealsByCategory(id: string): Meal[] {
  return meals.filter((m) => m.categoryId === id);
}

export function searchMeals(query: string): Meal[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return meals.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.categoryId.toLowerCase().includes(q),
  );
}

export function searchRestaurants(query: string): Restaurant[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q),
  );
}
