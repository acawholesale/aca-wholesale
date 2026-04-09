-- Add weight column to products (in kg)
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight NUMERIC DEFAULT 2;

-- Update existing products with estimated weights
UPDATE products SET weight =
  CASE category
    WHEN 'doudounes' THEN 7
    WHEN 'sweats' THEN 5
    WHEN 'jeans' THEN 6
    WHEN 't-shirts' THEN 3
    WHEN 'sportswear' THEN 4
    WHEN 'chemises' THEN 3
    WHEN 'polos' THEN 3
    ELSE 4
  END
WHERE weight IS NULL OR weight = 2;
