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
  { id: "rc-1",  name: "Plain Chocolate",    price: 500, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600" },
  { id: "rc-2",  name: "Butter Scotch",       price: 525, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600" },
  { id: "rc-3",  name: "Mocha Cake",          price: 525, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600" },
  { id: "rc-4",  name: "Pineapple Cake",      price: 525, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600" },
  { id: "rc-5",  name: "Belgian Chocolate",   price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80" },
  { id: "rc-6",  name: "Black Forest",        price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80" },
  { id: "rc-7",  name: "Chocochips",          price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600" },
  { id: "rc-8",  name: "Chocolate Truffle",   price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" },
  { id: "rc-9",  name: "Coffee Walnut",       price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=600" },
  { id: "rc-10", name: "Dark Chocolate",      price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600" },
  { id: "rc-11", name: "Rich Devils",         price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?q=80&w=600" },
  { id: "rc-12", name: "Honey Almond",        price: 575, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=600" },
  { id: "rc-13", name: "Chocolate Walnut",    price: 600, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600" },
  { id: "rc-14", name: "Red Velvet",          price: 600, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80" },
  { id: "rc-15", name: "Mix Fruit",           price: 600, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600" },
  { id: "rc-16", name: "Alphonso Mango",      price: 800, category: "Regular Cakes", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80" },
] as const;
