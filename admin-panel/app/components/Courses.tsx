"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import apiClient from "../lib/api";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { uploadImage, imageUrl } from "../lib/upload";
import { DataTable, ImageCell } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    level: "Beginner",
    duration: "",
    students: "0+",
    rating: "0",
    price: "",
    image: "",
    description: "",
    modules: [] as string[],
    academy: "Film Academy",
    featured: false,
    order: 0,
  });
  const [moduleInput, setModuleInput] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await apiClient.get("/courses");
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
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
        await apiClient.put(`/courses/${editing._id}`, formData);
      } else {
        await apiClient.post("/courses", formData);
      }
      fetchCourses();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save course:", error);
      alert("Failed to save course");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await apiClient.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course");
    }
  };

  const handleEdit = (course: any) => {
    setEditing(course);
    setFormData({
      title: course.title,
      level: course.level,
      duration: course.duration,
      students: course.students || "0+",
      rating: course.rating || "0",
      price: course.price,
      image: course.image,
      description: course.description,
      modules: course.modules || [],
      academy: course.academy || "Film Academy",
      featured: course.featured || false,
      order: course.order || 0,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: "",
      level: "Beginner",
      duration: "",
      students: "0+",
      rating: "0",
      price: "",
      image: "",
      description: "",
      modules: [],
      academy: "Film Academy",
      featured: false,
      order: 0,
    });
    setModuleInput("");
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

  const addModule = () => {
    if (moduleInput.trim()) {
      setFormData({
        ...formData,
        modules: [...formData.modules, moduleInput.trim()],
      });
      setModuleInput("");
    }
  };

  const removeModule = (index: number) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((_, i) => i !== index),
    });
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
        accessorKey: "academy",
        header: "Academy",
      },
      {
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => {
          const level = row.getValue("level") as string;
          return (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {level}
            </span>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="font-semibold text-amber-600">{row.getValue("price")}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const course = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="text-amber-600 hover:text-amber-700 p-1"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(course._id)}
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
        <h2 className="text-2xl font-bold">Courses</h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      <DataTable columns={columns} data={courses} searchPlaceholder="Search courses..." searchKey="title" />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editing ? "Edit Course" : "Add Course"}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Academy *</label>
                    <select
                      value={formData.academy}
                      onChange={(e) => setFormData({ ...formData, academy: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option>Acting School</option>
                      <option>Dance Academy</option>
                      <option>Film Academy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Level *</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Beginner to Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration *</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price *</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <input
                      type="text"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
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
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Modules</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={moduleInput}
                      onChange={(e) => setModuleInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addModule())}
                      className="flex-1 px-4 py-2 border rounded-lg"
                      placeholder="Add module"
                    />
                    <button
                      type="button"
                      onClick={addModule}
                      className="px-4 py-2 bg-zinc-200 rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.modules.map((module, index) => (
                      <span
                        key={index}
                        className="bg-zinc-100 px-3 py-1 rounded-lg flex items-center space-x-2"
                      >
                        <span>{module}</span>
                        <button
                          type="button"
                          onClick={() => removeModule(index)}
                          className="text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
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
