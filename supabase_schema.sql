-- 3rd Apparel Co — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Apparel',
  sizes TEXT[] DEFAULT '{}',
  inventory JSONB DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_intent TEXT,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Feed photos table (for homepage Instagram-style grid)
CREATE TABLE feed_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  caption TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE feed_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Feed photos are publicly readable"
  ON feed_photos FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Service role full access to feed_photos"
  ON feed_photos FOR ALL
  TO service_role
  USING (true);

-- Enable Row Level Security (public read for products, admin writes via service role)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public to read products
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO anon
  USING (true);

-- Allow service role full access (used by your API routes)
CREATE POLICY "Service role full access to products"
  ON products FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role full access to orders"
  ON orders FOR ALL
  TO service_role
  USING (true);

-- Sample product (optional — delete after testing)
INSERT INTO products (name, slug, description, price, category, sizes, inventory, featured)
VALUES (
  'Classic Logo Tee',
  'classic-logo-tee',
  'The foundation piece. 100% heavyweight cotton with the 3rd Apparel Co logo printed front center.',
  45.00,
  'Apparel',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  '{"S": 10, "M": 15, "L": 15, "XL": 10, "XXL": 5}'::jsonb,
  true
);
