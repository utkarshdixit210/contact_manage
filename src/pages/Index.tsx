import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ContactList } from "@/components/ContactList";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    const contact = {
      id: Math.random().toString(36).substr(2, 9),
      ...newContact,
    };
    setContacts((prev) => [...prev, contact]);
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setContactToEdit(null);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (contact: Contact) => {
    setContactToEdit(contact);
  };

  const handleCancelEdit = () => {
    setContactToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Manager
            </h1>
            <p className="text-gray-600">Organize your contacts with style</p>
          </div>

          <div className="grid md:grid-cols-[2fr,3fr] gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:sticky md:top-8 h-fit">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                {contactToEdit ? "Edit Contact" : "Add New Contact"}
              </h2>
              <ContactForm
                onAddContact={handleAddContact}
                onUpdateContact={handleUpdateContact}
                contactToEdit={contactToEdit}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Your Contacts
              </h2>
              <ContactList
                contacts={contacts}
                onDeleteContact={handleDeleteContact}
                onEditContact={handleEditContact}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;