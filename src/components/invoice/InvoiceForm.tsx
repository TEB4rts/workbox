import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface InvoiceFormProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
}

const InvoiceForm = ({ invoiceData, setInvoiceData }: InvoiceFormProps) => {
  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_: any, i: number) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleSave = () => {
    // Save to localStorage for now
    localStorage.setItem("invoice-draft", JSON.stringify(invoiceData));
    toast.success("Invoice saved as draft");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Client Information</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={invoiceData.clientInfo.name}
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  clientInfo: { ...invoiceData.clientInfo, name: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={invoiceData.clientInfo.email}
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  clientInfo: { ...invoiceData.clientInfo, email: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea
              id="clientAddress"
              value={invoiceData.clientInfo.address}
              onChange={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  clientInfo: { ...invoiceData.clientInfo, address: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Items</h2>
        {invoiceData.items.map((item: any, index: number) => (
          <div key={index} className="grid gap-4 p-4 border rounded-lg">
            <div>
              <Label>Description</Label>
              <Input
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", e.target.value)}
                />
              </div>
              <div>
                <Label>Rate</Label>
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) => updateItem(index, "rate", e.target.value)}
                />
              </div>
            </div>
            {invoiceData.items.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Item
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addItem} variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            value={invoiceData.taxRate}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, taxRate: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={invoiceData.dueDate}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, dueDate: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, notes: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleSave}>Save Draft</Button>
      </div>
    </div>
  );
};

export default InvoiceForm;