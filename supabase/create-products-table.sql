-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This creates the products table and seeds it with initial data

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  rating INTEGER DEFAULT 5,
  reviews INTEGER DEFAULT 0,
  badge TEXT,
  is_new BOOLEAN DEFAULT false,
  emoji TEXT DEFAULT '📦',
  brand TEXT,
  color TEXT DEFAULT '#f0f4ff',
  category TEXT,
  pieces INTEGER,
  sizes TEXT,
  state TEXT,
  details JSONB DEFAULT '[]',
  stock INTEGER DEFAULT 0,
  vinte_min INTEGER,
  vinte_max INTEGER,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access (products are public)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Allow service role to manage products
CREATE POLICY "Service role can manage products" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Seed initial products
INSERT INTO products (id, name, description, long_description, price, original_price, rating, reviews, badge, is_new, emoji, brand, color, category, pieces, sizes, state, details, stock, vinte_min, vinte_max) VALUES
(1, 'Lot Premium Nike / Adidas', '10 pièces - Sweats & Hoodies', 'Un lot premium composé de 10 pièces Nike et Adidas soigneusement sélectionnées.', 189, 249, 5, 127, 'BEST SELLER', false, '👟', 'Nike / Adidas', '#f0f4ff', 'sweats', 10, 'S au XL (mixte)', 'Très bon état', '["10 sweats/hoodies", "Marques Nike & Adidas", "Tailles S à XL", "Pièces authentiques vérifiées", "Prêt à la revente Vinted"]', 5, 15, 25),
(2, 'Lot The North Face', '8 pièces - Doudounes & Polaires', 'Un lot exceptionnel de 8 pièces The North Face comprenant doudounes et polaires.', 299, 399, 5, 89, '-25%', false, '🏔️', 'The North Face', '#f0fdf4', 'doudounes', 8, 'S au XXL', 'Bon à très bon état', '["8 pièces TNF", "Doudounes & polaires", "Tailles variées", "Marque premium recherchée", "Fort potentiel de revente"]', 2, 30, 50),
(3, 'Lot Ralph Lauren', '12 pièces - Polos & Chemises', 'Lot de 12 pièces Ralph Lauren composé de polos et chemises emblématiques.', 219, 289, 4, 64, NULL, false, '🐎', 'Ralph Lauren', '#fefce8', 'tshirts', 12, 'S au XL', 'Bon état', '["12 pièces Ralph Lauren", "Polos & chemises", "Marque premium", "Très bon rapport qualité/prix", "Idéal Vinted"]', 7, 18, 28),
(4, 'Lot Streetwear Mix', '15 pièces - Stüssy, Carhartt, Supreme', 'Le lot streetwear ultime ! 15 pièces issues des meilleures marques street.', 349, 449, 5, 201, 'POPULAIRE', true, '🔥', 'Multi-marques', '#fef2f2', 'sweats', 15, 'S au XL (mixte)', 'Très bon état', '["15 pièces streetwear", "Stüssy, Carhartt, Supreme", "Marques très recherchées", "Fort potentiel de revente", "Livraison rapide"]', 1, 25, 45),
(5, 'Lot Printemps Nike', '10 pièces - T-shirts & Shorts', 'Collection printemps/été Nike composée de 10 pièces légères.', 149, NULL, 5, 12, NULL, true, '☀️', 'Nike', '#ecfdf5', 'tshirts', 10, 'XS au XL', 'Très bon état', '["10 pièces Nike", "T-shirts & shorts", "Collection printemps/été", "Tailles variées", "Nouveauté"]', 4, 12, 20),
(6, 'Lot Denim Levi''s', '8 pièces - Jeans & Vestes', 'Un lot denim Levi''s de qualité comprenant 8 pièces.', 199, 259, 4, 8, NULL, true, '👖', 'Levi''s', '#eff6ff', 'jeans', 8, 'W28 à W36', 'Bon à très bon état', '["8 pièces Levi''s", "Jeans & vestes denim", "Marque iconique", "Tailles variées", "Nouveauté"]', 6, 22, 35),
(7, 'Lot Adidas Originals', '12 pièces - Tracksuits & Tees', 'Lot Adidas Originals composé de 12 pièces.', 179, NULL, 5, 15, NULL, true, '⚡', 'Adidas', '#f5f3ff', 'sportswear', 12, 'S au XL', 'Très bon état', '["12 pièces Adidas", "Tracksuits & t-shirts", "Ligne Originals", "Style rétro très tendance", "Nouveauté"]', 4, 14, 22),
(8, 'Lot Luxury Mix', '6 pièces - Burberry, Tommy, CK', 'Notre lot luxury exclusif : 6 pièces premium.', 399, 529, 5, 6, 'EXCLUSIF', true, '💎', 'Luxury', '#fdf4ff', 'sweats', 6, 'S au XL', 'Excellent état', '["6 pièces luxury", "Burberry, Tommy Hilfiger, Calvin Klein", "Marques premium", "Potentiel de revente maximal", "Exclusif"]', 0, 60, 100),
(9, 'Lot Doudounes Mix', '6 pièces - TNF, Columbia, Patagonia', 'Lot de 6 doudounes premium des meilleures marques outdoor.', 349, 459, 5, 43, NULL, false, '🧥', 'Multi-marques', '#f0fdf4', 'doudounes', 6, 'S au XXL', 'Bon à très bon état', '["6 doudounes premium", "TNF, Columbia, Patagonia", "Marques outdoor recherchées", "Très bon rapport qualité/prix", "Stock limité"]', 3, 50, 80),
(10, 'Lot Jogging Nike', '10 pièces - Pantalons & Sweats', 'Lot sportswear Nike composé de 10 pantalons de jogging et sweats.', 159, NULL, 4, 31, NULL, false, '🏃', 'Nike', '#fef2f2', 'sportswear', 10, 'S au XL', 'Bon état', '["10 pièces Nike", "Pantalons jogging & sweats", "Sportswear classique", "Revente facile", "Prix attractif"]', 8, 14, 20),
(11, 'Lot T-Shirts Premium', '20 pièces - Multi-marques', 'Notre lot le plus accessible : 20 t-shirts de marques variées.', 129, NULL, 4, 56, 'PETIT PRIX', false, '👕', 'Multi-marques', '#fefce8', 'tshirts', 20, 'XS au XXL', 'Bon état', '["20 t-shirts", "Multi-marques", "Tailles très variées", "Idéal pour débuter", "Meilleur rapport qualité/prix"]', 5, 8, 15),
(12, 'Lot Jeans Mixte', '10 pièces - Levi''s, Diesel, Lee', 'Lot denim mixte composé de 10 jeans des meilleures marques.', 229, 299, 5, 38, NULL, false, '👖', 'Multi-marques', '#eff6ff', 'jeans', 10, 'W28 à W38', 'Bon à très bon état', '["10 jeans premium", "Levi''s, Diesel, Lee", "Mix de coupes et styles", "Marques très populaires", "Fort potentiel de revente"]', 2, 20, 35)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence to avoid ID conflicts
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
