export const MAIN_CATEGORIES = [
  "Our Products",
  "Occasional Cakes",
] as const;

export const SUB_CATEGORIES = {
  "Our Products": ["Regular Cakes", "Tea Time Cakes", "Desserts", "Gift Hampers", "Cookies"],
  "Occasional Cakes": ["Birthday Spl", "Anniversary Spl", "Wedding Cake", "Kids Cake"],
} as const;

export const CATEGORIES = [
  "Regular Cakes",
  "Tea Time Cakes",
  "Desserts",
  "Gelato",
  "Gift Hampers",
  "Cookies",
  "Birthday Spl",
  "Anniversary Spl",
  "Wedding Cake",
  "Kids Cake",
  "Customised Cakes",
] as const;

export const WEIGHT_OPTIONS = [
  "500gm",
  "1kg",
  "1.5kg",
  "2kg",
] as const;

export const DELIVERY_SLOTS = [
  "10:00 AM - 01:00 PM",
  "03:00 PM - 05:00 PM",
  "07:00 PM - 09:00 PM",
] as const;

export const EGG_TYPES = [
  "Egg",
  "Eggless",
] as const;

export const DELIVERY_CHARGE = 100;
export const DELIVERY_CITY = "Nagpur";
export const DELIVERY_RADIUS_KM = 7;

// All prices are per 500gm (half kg)
export const REGULAR_CAKES = [
  { id: "rc-1",  name: "Plain Chocolate",    price: 500, category: "Regular Cakes" },
  { id: "rc-2",  name: "Butter Scotch",       price: 525, category: "Regular Cakes" },
  { id: "rc-3",  name: "Mocha Cake",          price: 525, category: "Regular Cakes" },
  { id: "rc-4",  name: "Pineapple Cake",      price: 525, category: "Regular Cakes" },
  { id: "rc-5",  name: "Belgian Chocolate",   price: 575, category: "Regular Cakes" },
  { id: "rc-6",  name: "Black Forest",        price: 575, category: "Regular Cakes" },
  { id: "rc-7",  name: "Chocochips",          price: 575, category: "Regular Cakes" },
  { id: "rc-8",  name: "Chocolate Truffle",   price: 575, category: "Regular Cakes" },
  { id: "rc-9",  name: "Coffee Walnut",       price: 575, category: "Regular Cakes" },
  { id: "rc-10", name: "Dark Chocolate",      price: 575, category: "Regular Cakes" },
  { id: "rc-11", name: "Rich Devils",         price: 575, category: "Regular Cakes" },
  { id: "rc-12", name: "Honey Almond",        price: 575, category: "Regular Cakes" },
  { id: "rc-13", name: "Chocolate Walnut",    price: 600, category: "Regular Cakes" },
  { id: "rc-14", name: "Red Velvet",          price: 600, category: "Regular Cakes" },
  { id: "rc-15", name: "Mix Fruit",           price: 600, category: "Regular Cakes" },
  { id: "rc-16", name: "Alphonso Mango",      price: 800, category: "Regular Cakes" },
] as const;
