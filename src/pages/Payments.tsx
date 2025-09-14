import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Clock, CheckCircle, XCircle, IndianRupee, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeeItem {
  id: string;
  student_name: string;
  fee_type: string;
  amount: number;
  due_date: string;
  status: 'pending' | 'paid' | 'overdue';
  academic_year: string;
}

interface Payment {
  id: string;
  student_name: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  description?: string;
  created_at: string;
}

const Payments = () => {
  const { toast } = useToast();
  const [feeItems, setFeeItems] = useState<FeeItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeeItems();
    fetchPayments();
  }, []);

  const fetchFeeItems = async () => {
    try {
      const response = await supabase.functions.invoke('razorpay-payment', {
        body: { action: 'get_fee_items' }
      });
      
      if (response.data?.feeItems) {
        setFeeItems(response.data.feeItems);
      }
    } catch (error) {
      console.error('Error fetching fee items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fee items",
        variant: "destructive"
      });
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await supabase.functions.invoke('razorpay-payment', {
        body: { action: 'get_payments' }
      });
      
      if (response.data?.payments) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: "Error", 
        description: "Failed to fetch payment history",
        variant: "destructive"
      });
    }
  };

  const handlePayment = async (feeItem: FeeItem) => {
    setLoading(true);
    try {
      // Create Razorpay order
      const response = await supabase.functions.invoke('razorpay-payment', {
        body: {
          action: 'create_order',
          amount: feeItem.amount,
          student_name: feeItem.student_name,
          description: `${feeItem.fee_type} - ${feeItem.academic_year}`,
          receipt: `fee_${feeItem.id}`
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { order, payment_id, key_id } = response.data;

      // Initialize Razorpay
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Smart Link Academic System',
        description: `${feeItem.fee_type} - ${feeItem.academic_year}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await supabase.functions.invoke('razorpay-payment', {
              body: {
                action: 'verify_payment',
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                payment_id: payment_id
              }
            });

            if (verifyResponse.data?.success) {
              toast({
                title: "Payment Successful!",
                description: `${feeItem.fee_type} payment completed successfully.`
              });
              
              // Refresh data
              fetchFeeItems();
              fetchPayments();
              
              // Update fee status to paid
              await supabase
                .from('fee_items')
                .update({ status: 'paid' })
                .eq('id', feeItem.id);
                
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if money was deducted.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: feeItem.student_name,
          email: 'student@smartlink.edu',
        },
        theme: {
          color: '#3b82f6'
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return "bg-success text-success-foreground";
      case 'pending':
        return "bg-warning text-warning-foreground";
      case 'overdue':
      case 'failed':
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const totalPending = feeItems
    .filter(item => item.status === 'pending' || item.status === 'overdue')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalPaid = payments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payment Management</h1>
        <p className="text-muted-foreground">Manage fee payments and view transaction history</p>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pending</p>
                <p className="text-2xl font-bold text-foreground">₹{totalPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-foreground">₹{totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold text-foreground">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending-fees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending-fees" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Fees
          </TabsTrigger>
          <TabsTrigger value="payment-history" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending-fees" className="space-y-6">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle>Pending Fee Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeItems
                  .filter(item => item.status === 'pending' || item.status === 'overdue')
                  .map((feeItem) => (
                    <div key={feeItem.id} className="p-4 rounded-lg border border-border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{feeItem.student_name}</h3>
                            <Badge className={getStatusColor(feeItem.status)}>
                              {getStatusIcon(feeItem.status)}
                              {feeItem.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Fee Type:</span> {feeItem.fee_type}
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span> ₹{feeItem.amount.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(feeItem.due_date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handlePayment(feeItem)}
                          disabled={loading}
                          className="bg-gradient-primary hover:bg-gradient-accent button-load-animation"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
                
                {feeItems.filter(item => item.status === 'pending' || item.status === 'overdue').length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">All Fees Paid!</h3>
                    <p className="text-muted-foreground">No pending fees at this time.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-6">
          <Card className="border-0 shadow-elegant bg-gradient-card">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{payment.student_name}</h3>
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            {payment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Amount:</span> ₹{payment.amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Payment ID:</span> {payment.razorpay_payment_id || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {new Date(payment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        {payment.description && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            <span className="font-medium">Description:</span> {payment.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {payments.length === 0 && (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Transactions</h3>
                    <p className="text-muted-foreground">No payment history available yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;