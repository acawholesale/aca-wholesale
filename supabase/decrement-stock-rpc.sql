-- Atomic stock decrement function for Supabase
-- Run this in Supabase SQL Editor to enable race-condition-safe stock decrements
CREATE OR REPLACE FUNCTION decrement_product_stock(p_id INTEGER, p_qty INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET stock = GREATEST(0, stock - p_qty),
      updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
