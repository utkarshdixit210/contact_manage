import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Search, User, Mail, Phone } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: string) => void;
  onEditContact: (contact: Contact) => void;
}

export const ContactList = ({ contacts, onDeleteContact, onEditContact }: ContactListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            className="p-4 contact-card hover:shadow-lg transition-all duration-300 border-purple-100"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{contact.name}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{contact.email}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{contact.phone}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditContact(contact)}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteContact(contact.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
            <User className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No contacts found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};