import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";

const InvoiceGenerator = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    clientInfo: {
      name: "",
      address: "",
      email: "",
    },
    items: [{ description: "", quantity: 1, rate: 0 }],
    taxRate: 0,
    dueDate: "",
    paymentMethods: [],
    notes: "",
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <h1 className="text-3xl font-bold">Invoice Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <InvoiceForm 
            invoiceData={invoiceData} 
            setInvoiceData={setInvoiceData} 
          />
        </Card>
        <Card className="p-6">
          <InvoicePreview invoiceData={invoiceData} />
        </Card>
      </div>
    </div>
  );
};

export default InvoiceGenerator;