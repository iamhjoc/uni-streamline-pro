import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')!;
const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

-- Create predictive analytics functions
CREATE OR REPLACE FUNCTION public.calculate_dropout_risk(student_cgpa DECIMAL, attendance_percentage INTEGER)
RETURNS TEXT AS $$
BEGIN
  IF attendance_percentage < 75 OR student_cgpa < 6.0 THEN
    RETURN 'High Risk';
  ELSIF attendance_percentage < 85 OR student_cgpa < 7.0 THEN
    RETURN 'Medium Risk';
  ELSE
    RETURN 'Low Risk';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create student performance tracking table
CREATE TABLE public.student_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  cgpa DECIMAL(3,2) NOT NULL,
  attendance_percentage INTEGER NOT NULL,
  dropout_risk TEXT GENERATED ALWAYS AS (
    CASE 
      WHEN attendance_percentage < 75 OR cgpa < 6.0 THEN 'High Risk'
      WHEN attendance_percentage < 85 OR cgpa < 7.0 THEN 'Medium Risk'
      ELSE 'Low Risk'
    END
  ) STORED,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_performance ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view student performance" 
ON public.student_performance 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can manage student performance" 
ON public.student_performance 
FOR ALL 
USING (true);

-- Insert sample performance data
INSERT INTO public.student_performance (student_id, student_name, cgpa, attendance_percentage) VALUES
('STU001', 'Rahul Sharma', 8.5, 92),
('STU002', 'Priya Patel', 9.2, 95),
('STU003', 'Amit Kumar', 7.8, 88),
('STU004', 'Sneha Singh', 8.9, 78),
('STU005', 'Vikash Yadav', 8.1, 85),
('STU006', 'Ravi Gupta', 6.2, 72),
('STU007', 'Anjali Reddy', 5.8, 68),
('STU008', 'Kiran Joshi', 7.5, 82);

-- Create gamification tables
CREATE TABLE public.student_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  total_points INTEGER DEFAULT 0,
  level_points INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  badges_earned INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.student_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  points_awarded INTEGER DEFAULT 0,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for gamification tables
ALTER TABLE public.student_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for gamification
CREATE POLICY "Everyone can view points" ON public.student_points FOR SELECT USING (true);
CREATE POLICY "Everyone can manage points" ON public.student_points FOR ALL USING (true);

CREATE POLICY "Everyone can view badges" ON public.student_badges FOR SELECT USING (true);
CREATE POLICY "Everyone can manage badges" ON public.student_badges FOR ALL USING (true);

-- Insert sample gamification data
INSERT INTO public.student_points (student_id, student_name, total_points, level_points, current_level, badges_earned, streak_days) VALUES
('STU001', 'Rahul Sharma', 2450, 450, 12, 8, 15),
('STU002', 'Priya Patel', 3250, 250, 16, 12, 22),
('STU003', 'Amit Kumar', 2890, 390, 14, 10, 18),
('STU004', 'Sneha Singh', 2320, 320, 11, 7, 12),
('STU005', 'Vikash Yadav', 2180, 180, 10, 6, 8);

INSERT INTO public.student_badges (student_id, badge_name, badge_description, points_awarded) VALUES
('STU001', 'Perfect Attendance', '100% attendance for a month', 100),
('STU001', 'Assignment Ace', 'Submitted 10 assignments on time', 75),
('STU001', 'Study Streak', '15 consecutive days of activity', 100),
('STU002', 'Code Master', 'Won a coding competition', 150),
('STU002', 'Perfect Attendance', '100% attendance for a month', 100),
('STU003', 'Team Player', 'Completed 5 group projects', 75);

-- Create triggers for automatic updates
CREATE TRIGGER update_student_performance_updated_at
BEFORE UPDATE ON public.student_performance
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_points_updated_at
BEFORE UPDATE ON public.student_points
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...payload } = await req.json();

    if (action === 'create_order') {
      // Create Razorpay order
      const { amount, currency = 'INR', receipt, student_name, description } = payload;

      const orderData = {
        amount: Math.round(amount * 100), // Convert to paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
      };

      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Razorpay API error: ${response.status}`);
      }

      const order = await response.json();

      // Store payment in database
      const { data: payment, error } = await supabase
        .from('payments')
        .insert({
          user_id: crypto.randomUUID(), // In real app, get from auth
          student_name,
          amount,
          currency,
          razorpay_order_id: order.id,
          description,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to store payment record');
      }

      return new Response(JSON.stringify({ 
        order,
        payment_id: payment.id,
        key_id: razorpayKeyId
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (action === 'verify_payment') {
      // Verify payment signature
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, payment_id } = payload;

      // Create signature for verification
      const crypto = await import('node:crypto');
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(body.toString())
        .digest('hex');

      const isSignatureValid = expectedSignature === razorpay_signature;

      if (isSignatureValid) {
        // Update payment status in database
        const { error } = await supabase
          .from('payments')
          .update({
            razorpay_payment_id,
            razorpay_signature,
            status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('id', payment_id);

        if (error) {
          console.error('Database update error:', error);
          throw new Error('Failed to update payment status');
        }

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Payment verified successfully' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        // Mark payment as failed
        await supabase
          .from('payments')
          .update({
            status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('id', payment_id);

        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Payment verification failed' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

    } else if (action === 'get_payments') {
      // Get payment history
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to fetch payments');
      }

      return new Response(JSON.stringify({ payments }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (action === 'get_fee_items') {
      // Get pending fee items
      const { data: feeItems, error } = await supabase
        .from('fee_items')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) {
        throw new Error('Failed to fetch fee items');
      }

      return new Response(JSON.stringify({ feeItems }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in razorpay-payment function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});