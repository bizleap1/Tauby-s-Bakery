-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- CATEGORIES
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  category_id uuid references public.categories(id),
  egg_type text check (egg_type in ('Egg', 'Eggless', 'Both')),
  weight_options jsonb default '["500gm", "1kg", "1.5kg", "2kg"]'::jsonb,
  stock int default 100,
  is_active boolean default true,
  is_bestseller boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ADDRESSES
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  address_line text not null,
  city text default 'Nagpur',
  pincode text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  total_amount decimal(10,2) not null,
  status text default 'Pending' check (status in ('Pending', 'Paid', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled')),
  delivery_date date not null,
  delivery_slot text not null,
  address_id uuid references public.addresses(id),
  payment_id text, -- Razorpay Payment ID
  order_id text, -- Razorpay Order ID
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete set null,
  quantity int not null,
  price decimal(10,2) not null, -- Price at the time of purchase
  egg_type text,
  weight text,
  custom_message text
);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.addresses enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update their own profiles." on public.profiles for update using (auth.uid() = id);

create policy "Products are viewable by everyone." on public.products for select using (true);
create policy "Categories are viewable by everyone." on public.categories for select using (true);

create policy "Users can view their own orders." on public.orders for select using (auth.uid() = user_id);
create policy "Users can view their own order items." on public.order_items for select using (
  exists (select 1 from public.orders where id = order_items.order_id and user_id = auth.uid())
);

create policy "Users can manage their own addresses." on public.addresses for all using (auth.uid() = user_id);

-- Realtime
alter publication supabase_realtime add table public.orders;
