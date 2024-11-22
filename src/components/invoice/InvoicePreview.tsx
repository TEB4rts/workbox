import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Send } from "lucide-react";
import { toast } from "sonner";

interface InvoicePreviewProps {
  invoiceData: any;
}

const InvoicePreview = ({ invoiceData }: InvoicePreviewProps) => {
  const calculateSubtotal = () => {
    return invoiceData.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.rate,
      0
    );
  };

  const calculateTax = (subtotal: number) => {
    return (subtotal * invoiceData.taxRate) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const handleDownload = () => {
    const content = `
INVOICE

Client Information:
${invoiceData.clientInfo.name}
${invoiceData.clientInfo.email}
${invoiceData.clientInfo.address}

Items:
${invoiceData.items
  .map(
    (item: any) =>
      `${item.description}
Quantity: ${item.quantity}
Rate: $${item.rate}
Amount: $${item.quantity * item.rate}
`
  )
  .join("\n")}

Subtotal: $${calculateSubtotal()}
Tax (${invoiceData.taxRate}%): $${calculateTax(calculateSubtotal())}
Total: $${calculateTotal()}

Due Date: ${invoiceData.dueDate}

Notes:
${invoiceData.notes}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Invoice downloaded successfully!");
  };

  const handleSendEmail = () => {
    toast.success("Email feature coming soon!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">Invoice Preview</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleSendEmail}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Client Information</h3>
          <p>{invoiceData.clientInfo.name}</p>
          <p>{invoiceData.clientInfo.email}</p>
          <p className="whitespace-pre-line">{invoiceData.clientInfo.address}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Items</h3>
          <div className="space-y-4">
            {invoiceData.items.map((item: any, index: number) => (
              <div key={index} className="border-b pb-4">
                <p className="font-medium">{item.description}</p>
                <div className="grid grid-cols-3 text-sm text-gray-600">
                  <p>Quantity: {item.quantity}</p>
                  <p>Rate: ${item.rate}</p>
                  <p>Amount: ${item.quantity * item.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({invoiceData.taxRate}%):</span>
            <span>${calculateTax(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>

        {invoiceData.dueDate && (
          <div>
            <h3 className="font-semibold mb-2">Due Date</h3>
            <p>{new Date(invoiceData.dueDate).toLocaleDateString()}</p>
          </div>
        )}

        {invoiceData.notes && (
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="whitespace-pre-line">{invoiceData.notes}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InvoicePreview;