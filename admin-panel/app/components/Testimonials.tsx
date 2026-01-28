"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import apiClient from "../lib/api";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { uploadImage, imageUrl } from "../lib/upload";
import { DataTable, ImageCell } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    image: "",
    text: "",
    rating: 5,
    featured: false,
    order: 0,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await apiClient.get("/testimonials");
      if (response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
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
        await apiClient.put(`/testimonials/${editing._id}`, formData);
      } else {
        await apiClient.post("/testimonials", formData);
      }
      fetchTestimonials();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save testimonial:", error);
      alert("Failed to save testimonial");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await apiClient.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditing(testimonial);
    setFormData({
      name: testimonial.name,
      course: testimonial.course,
      image: testimonial.image,
      text: testimonial.text,
      rating: testimonial.rating,
      featured: testimonial.featured || false,
      order: testimonial.order || 0,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: "",
      course: "",
      image: "",
      text: "",
      rating: 5,
      featured: false,
      order: 0,
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
        cell: ({ row }) => <ImageCell src={row.original.image} alt={row.original.name} className="w-12 h-12 rounded-full" />,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium text-zinc-900">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "course",
        header: "Course",
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {
          const rating = row.getValue("rating") as number;
          return (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-amber-600">{rating}</span>
              <span>⭐</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const testimonial = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="text-amber-600 hover:text-amber-700 p-1"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
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
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <DataTable columns={columns} data={testimonials} searchPlaceholder="Search testimonials..." searchKey="name" />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editing ? "Edit Testimonial" : "Add Testimonial"}
                </h3>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Course *</label>
                    <input
                      type="text"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
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
                  <label className="block text-sm font-medium mb-2">Testimonial Text *</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating *</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value={5}>5 ⭐</option>
                    <option value={4}>4 ⭐</option>
                    <option value={3}>3 ⭐</option>
                    <option value={2}>2 ⭐</option>
                    <option value={1}>1 ⭐</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label>Featured</label>
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
