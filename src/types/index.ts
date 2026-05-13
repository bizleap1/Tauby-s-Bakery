export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  eggType?: "Egg" | "Eggless";
  weight?: string;
  customMessage?: string;
  deliveryDate?: string;
  deliverySlot?: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  egg_type?: string;
  weight?: string;
  custom_message?: string;
  products?: {
    name: string;
    image_url: string;
  };
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  delivery_date: string;
  delivery_slot: string;
  address_id?: string;
  payment_id?: string;
  order_id?: string;
  created_at: string;
  order_items: OrderItem[];
  profiles?: Profile;
  addresses?: {
    address_line: string;
    city: string;
    pincode: string;
  };
}
