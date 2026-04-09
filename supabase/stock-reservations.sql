-- Table for stock reservations during Stripe checkout
CREATE TABLE IF NOT EXISTS stock_reservations (
  id SERIAL PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  order_id TEXT NOT NULL,
  items_json JSONB NOT NULL,
  customer_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expired BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_reservations_session ON stock_reservations(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_reservations_cleanup ON stock_reservations(created_at) WHERE expired = FALSE;

-- Atomic stock reservation: decrements only if enough stock exists
-- Returns true if reserved, false if insufficient stock
CREATE OR REPLACE FUNCTION reserve_stock(p_id INTEGER, p_qty INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  rows_affected INTEGER;
BEGIN
  UPDATE products
  SET stock = stock - p_qty, updated_at = NOW()
  WHERE id = p_id AND stock >= p_qty;
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Release stock: re-increments when checkout expires or is cancelled
CREATE OR REPLACE FUNCTION release_stock(p_id INTEGER, p_qty INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET stock = stock + p_qty, updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
