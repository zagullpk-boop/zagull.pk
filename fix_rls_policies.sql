-- 1. FIX ORDERS TABLE RLS
-- Allow anyone (including guests) to place an order
DROP POLICY IF EXISTS "Enable insert for all users" ON public.orders;
CREATE POLICY "Enable insert for all users" ON public.orders FOR INSERT WITH CHECK (true);

-- Allow users to see their own orders, and allow authenticated (admin) to see all
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "View orders" ON public.orders;
DROP POLICY IF EXISTS "Enable select for all" ON public.orders;
CREATE POLICY "Enable select for all" ON public.orders FOR SELECT USING (true);

-- 2. FIX ORDER ITEMS TABLE RLS
DROP POLICY IF EXISTS "Enable insert for all users" ON public.order_items;
CREATE POLICY "Enable insert for all users" ON public.order_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Enable select for all users" ON public.order_items;
CREATE POLICY "Enable select for all users" ON public.order_items FOR SELECT USING (true);

-- 3. FIX PRODUCTS UPDATE (For Admin)
DROP POLICY IF EXISTS "Allow update for everyone" ON public.products;
CREATE POLICY "Allow update for everyone" ON public.products FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow delete for everyone" ON public.products;
CREATE POLICY "Allow delete for everyone" ON public.products FOR DELETE USING (true);
