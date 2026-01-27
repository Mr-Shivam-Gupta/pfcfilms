"use client";

import { useState, useEffect } from "react";
import apiClient from "../lib/api";
import { Trash2, Mail, CheckCircle } from "lucide-react";

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiClient.get("/contact");
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      await apiClient.delete(`/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Failed to delete contact:", error);
      alert("Failed to delete contact");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await apiClient.put(`/contact/${id}`, { status });
      fetchContacts();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className={`hover:bg-zinc-50 cursor-pointer ${
                      contact.status === "new" ? "bg-amber-50" : ""
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          contact.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : contact.status === "read"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(contact._id, "read");
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact._id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedContact && (
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
            <h3 className="text-xl font-bold mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-600">Name</label>
                <p className="text-zinc-900">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-600">Email</label>
                <p className="text-zinc-900">{selectedContact.email}</p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-medium text-zinc-600">Phone</label>
                  <p className="text-zinc-900">{selectedContact.phone}</p>
                </div>
              )}
              {selectedContact.subject && (
                <div>
                  <label className="text-sm font-medium text-zinc-600">Subject</label>
                  <p className="text-zinc-900">{selectedContact.subject}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-zinc-600">Message</label>
                <p className="text-zinc-900 mt-1">{selectedContact.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-600">Date</label>
                <p className="text-zinc-900">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
