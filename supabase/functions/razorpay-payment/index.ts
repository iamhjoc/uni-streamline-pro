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

serve(async (req) => {
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