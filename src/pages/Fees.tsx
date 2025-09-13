import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CreditCard, Calendar, Receipt, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Fees = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const feeRecords = [
    { 
      id: "FEE001", 
      studentId: "STU001",
      studentName: "Rahul Sharma", 
      course: "B.Tech CSE",
      feeType: "Tuition Fee",
      amount: 75000,
      dueDate: "2024-01-31",
      paidDate: "2024-01-25",
      status: "paid",
      semester: "Spring 2024"
    },
    { 
      id: "FEE002", 
      studentId: "STU002",
      studentName: "Priya Patel", 
      course: "MBA Finance",
      feeType: "Tuition Fee",
      amount: 125000,
      dueDate: "2024-02-15",
      paidDate: null,
      status: "pending",
      semester: "Spring 2024"
    },
    { 
      id: "FEE003", 
      studentId: "STU003",
      studentName: "Amit Kumar", 
      course: "B.Sc Physics",
      feeType: "Laboratory Fee",
      amount: 15000,
      dueDate: "2024-01-20",
      paidDate: null,
      status: "overdue",
      semester: "Spring 2024"
    },
    { 
      id: "FEE004", 
      studentId: "STU004",
      studentName: "Sneha Singh", 
      course: "M.Tech IT",
      feeType: "Tuition Fee",
      amount: 95000,
      dueDate: "2024-02-10",
      paidDate: "2024-02-08",
      status: "paid",
      semester: "Spring 2024"
    },
    { 
      id: "FEE005", 
      studentId: "STU005",
      studentName: "Vikash Yadav", 
      course: "BCA",
      feeType: "Hostel Fee",
      amount: 45000,
      dueDate: "2024-02-20",
      paidDate: null,
      status: "pending",
      semester: "Spring 2024"
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return { 
          color: "bg-success text-success-foreground", 
          icon: CheckCircle,
          label: "Paid"
        };
      case "pending":
        return { 
          color: "bg-warning text-warning-foreground", 
          icon: Clock,
          label: "Pending"
        };
      case "overdue":
        return { 
          color: "bg-destructive text-destructive-foreground", 
          icon: AlertCircle,
          label: "Overdue"
        };
      default:
        return { 
          color: "bg-muted text-muted-foreground", 
          icon: Clock,
          label: "Unknown"
        };
    }
  };

  const handlePaymentInit = (feeRecord: any) => {
    // In a real application, this would integrate with Razorpay
    toast({
      title: "Payment Initiated",
      description: `Processing payment of ₹${feeRecord.amount.toLocaleString('en-IN')} for ${feeRecord.studentName}`,
    });
  };

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidAmount = feeRecords.filter(r => r.status === 'paid').reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Fee Management</h1>
        <p className="text-muted-foreground">Manage student fee payments and records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-bold text-success">₹{paidAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold text-warning">₹{pendingAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.round((paidAmount / totalAmount) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Fee Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by student name, ID, or fee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const statusConfig = getStatusConfig(record.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={record.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-card transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-foreground">{record.studentName}</h3>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Student ID</p>
                          <p className="font-medium text-foreground">{record.studentId}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fee Type</p>
                          <p className="font-medium text-foreground">{record.feeType}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-bold text-lg text-primary">₹{record.amount.toLocaleString('en-IN')}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Due Date</p>
                          <p className="font-medium text-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {record.dueDate}
                          </p>
                        </div>
                      </div>

                      {record.paidDate && (
                        <div className="mt-2 text-sm text-success">
                          <span className="font-medium">Paid on:</span> {record.paidDate}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {record.status !== 'paid' && (
                        <Button 
                          onClick={() => handlePaymentInit(record)}
                          className="bg-gradient-primary text-primary-foreground"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Receipt className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {filteredRecords.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="py-12 text-center">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Fee Records Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Fees;