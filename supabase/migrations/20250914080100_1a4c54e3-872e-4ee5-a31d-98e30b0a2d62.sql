-- Create payments table for Razorpay integration
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  student_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments access
CREATE POLICY "Users can view their own payments" 
ON public.payments 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own payments" 
ON public.payments 
FOR UPDATE 
USING (true);

-- Create fee_items table for pending fees
CREATE TABLE public.fee_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  fee_type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')) DEFAULT 'pending',
  academic_year TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for fee_items
ALTER TABLE public.fee_items ENABLE ROW LEVEL SECURITY;

-- Create policies for fee_items
CREATE POLICY "Everyone can view fee items" 
ON public.fee_items 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can create fee items" 
ON public.fee_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Everyone can update fee items" 
ON public.fee_items 
FOR UPDATE 
USING (true);

-- Insert sample fee items
INSERT INTO public.fee_items (student_name, fee_type, amount, due_date, status, academic_year) VALUES
('Rahul Sharma', 'Tuition Fee', 50000.00, '2024-02-15', 'pending', '2023-24'),
('Priya Patel', 'Hostel Fee', 25000.00, '2024-02-20', 'pending', '2023-24'),
('Amit Kumar', 'Lab Fee', 5000.00, '2024-02-10', 'overdue', '2023-24'),
('Sneha Singh', 'Library Fee', 2000.00, '2024-02-25', 'pending', '2023-24'),
('Vikash Yadav', 'Sports Fee', 3000.00, '2024-02-18', 'paid', '2023-24');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fee_items_updated_at
BEFORE UPDATE ON public.fee_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();