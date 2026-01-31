"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import apiClient from "../lib/api";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { uploadImage, imageUrl } from "../lib/upload";
import { DataTable, ImageCell } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

export default function TopProjects() {
  const [topProjects, setTopProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Feature Films",
    image: "",
    description: "",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTopProjects();
  }, []);

  const fetchTopProjects = async () => {
    try {
      const response = await apiClient.get("/top-projects");
      if (response.data.success) {
        setTopProjects(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch top projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }
    try {
      if (editing) {
        await apiClient.put(`/top-projects/${editing._id}`, formData);
      } else {
        await apiClient.post("/top-projects", formData);
      }
      fetchTopProjects();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save top project:", error);
      alert("Failed to save top project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this top project?")) return;
    try {
      await apiClient.delete(`/top-projects/${id}`);
      fetchTopProjects();
    } catch (error) {
      console.error("Failed to delete top project:", error);
      alert("Failed to delete top project");
    }
  };

  const handleEdit = (topProject: any) => {
    setEditing(topProject);
    setFormData({
      title: topProject.title,
      category: topProject.category,
      image: topProject.image,
      description: topProject.description || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: "",
      category: "Feature Films",
      image: "",
      description: "",
    });
    imageInputRef.current && (imageInputRef.current.value = "");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const path = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: path }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => <ImageCell src={row.original.image} alt={row.original.title} className="w-16 h-12" />,
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="font-medium text-zinc-900">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const topProject = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(topProject)}
                className="text-amber-600 hover:text-amber-700 p-1"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(topProject._id)}
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Top Projects</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Add Top Project</span>
        </button>
      </div>

      <DataTable columns={columns} data={topProjects} searchPlaceholder="Search top projects..." searchKey="title" />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editing ? "Edit Top Project" : "Add Top Project"}
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option>Feature Films</option>
                    <option>Documentaries</option>
                    <option>Music Videos</option>
                    <option>Commercials</option>
                    <option>Short Films</option>
                    <option>Web Series</option>
                    <option>Reality Shows</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image *</label>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  {imageUploading && <p className="text-sm text-amber-600 mt-1">Uploading...</p>}
                  {formData.image && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={imageUrl(formData.image)} alt="Preview" className="h-20 w-28 object-cover rounded border" />
                      <span className="text-sm text-zinc-500">Uploaded</span>
                    </div>
                  )}
                  {!formData.image && editing && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={imageUrl(editing.image)} alt="Current" className="h-20 w-28 object-cover rounded border" />
                      <span className="text-sm text-zinc-500">Current image (upload new to replace)</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    {editing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
