"use client";

import { useState, useEffect, useMemo } from "react";
import apiClient from "../lib/api";
import { Trash2, Mail, CheckCircle } from "lucide-react";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div 
            className={`font-medium text-zinc-900 cursor-pointer ${
              row.original.status === "new" ? "font-semibold" : ""
            }`}
            onClick={() => setSelectedContact(row.original)}
          >
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div 
            className="text-zinc-600 cursor-pointer"
            onClick={() => setSelectedContact(row.original)}
          >
            {row.getValue("email")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                status === "new"
                  ? "bg-amber-100 text-amber-800"
                  : status === "read"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"));
          return (
            <div className="text-sm text-zinc-600">
              {date.toLocaleDateString()}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const contact = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus(contact._id, "read");
                }}
                className="text-blue-600 hover:text-blue-700 p-1"
                title="Mark as read"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(contact._id);
                }}
                className="text-red-600 hover:text-red-700 p-1"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <DataTable 
            columns={columns} 
            data={contacts} 
            searchPlaceholder="Search contacts..." 
            searchKey="name" 
          />
        </div>

        {selectedContact && (
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4 sm:p-6 order-first lg:order-last">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Contact Details</h3>
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
