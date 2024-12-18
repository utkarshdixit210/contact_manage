import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UserPlus, Save, X } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactFormProps {
  onAddContact: (contact: { name: string; email: string; phone: string }) => void;
  onUpdateContact?: (contact: Contact) => void;
  contactToEdit?: Contact | null;
  onCancelEdit?: () => void;
}

export const ContactForm = ({ 
  onAddContact, 
  onUpdateContact, 
  contactToEdit, 
  onCancelEdit 
}: ContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setPhone(contactToEdit.phone);
    }
  }, [contactToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (contactToEdit && onUpdateContact) {
      onUpdateContact({ ...contactToEdit, name, email, phone });
      toast.success("Contact updated successfully!");
    } else {
      onAddContact({ name, email, phone });
      toast.success("Contact added successfully!");
    }

    setName("");
    setEmail("");
    setPhone("");
    
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          {contactToEdit ? (
            <>
              <Save className="mr-2" />
              Update Contact
            </>
          ) : (
            <>
              <UserPlus className="mr-2" />
              Add Contact
            </>
          )}
        </Button>
        {contactToEdit && onCancelEdit && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancelEdit}
            className="px-8 border-gray-300 hover:bg-gray-50"
          >
            <X className="mr-2" />
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};