"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Save } from "lucide-react";
import { uploadImage, imageUrl } from "../lib/upload";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    directorName: "",
    directorTitle: "",
    directorImage: "",
    directorBio: "",
    quote: "",
    vision: "",
    mission: "",
    achievements: [] as Array<{ icon: string; number: string; label: string }>,
  });

  const [achievementInput, setAchievementInput] = useState({
    icon: "",
    number: "",
    label: "",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get(`${API_URL}/about`);
      if (response.data.success && response.data.data) {
        setFormData({
          directorName: response.data.data.directorName || "",
          directorTitle: response.data.data.directorTitle || "",
          directorImage: response.data.data.directorImage || "",
          directorBio: response.data.data.directorBio || "",
          quote: response.data.data.quote || "",
          vision: response.data.data.vision || "",
          mission: response.data.data.mission || "",
          achievements: response.data.data.achievements || [],
        });
      }
    } catch (error) {
      console.error("Failed to fetch about:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const path = await uploadImage(file);
      setFormData((prev) => ({ ...prev, directorImage: path }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.directorImage) {
      alert("Please upload a director image.");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${API_URL}/about`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("About content saved successfully!");
    } catch (error) {
      console.error("Failed to save about:", error);
      alert("Failed to save about content");
    } finally {
      setSaving(false);
    }
  };

  const addAchievement = () => {
    if (achievementInput.number && achievementInput.label) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, achievementInput],
      });
      setAchievementInput({ icon: "", number: "", label: "" });
    }
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">About Content</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
          <h3 className="text-xl font-bold mb-4">Director Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Director Name *</label>
              <input
                type="text"
                value={formData.directorName}
                onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Director Title *</label>
              <input
                type="text"
                value={formData.directorTitle}
                onChange={(e) => setFormData({ ...formData, directorTitle: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Director Image *</label>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {imageUploading && <p className="text-sm text-amber-600 mt-1">Uploading...</p>}
              {formData.directorImage && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={imageUrl(formData.directorImage)} alt="Director" className="h-24 w-24 object-cover rounded border" />
                  <span className="text-sm text-zinc-500">Uploaded</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Director Bio *</label>
              <textarea
                value={formData.directorBio}
                onChange={(e) => setFormData({ ...formData, directorBio: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
          <h3 className="text-xl font-bold mb-4">Quote</h3>
          <textarea
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
          <h3 className="text-xl font-bold mb-4">Vision & Mission</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vision *</label>
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mission *</label>
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
          <h3 className="text-xl font-bold mb-4">Achievements</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <input
                  type="text"
                  value={achievementInput.icon}
                  onChange={(e) =>
                    setAchievementInput({ ...achievementInput, icon: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Icon name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number *</label>
                <input
                  type="text"
                  value={achievementInput.number}
                  onChange={(e) =>
                    setAchievementInput({ ...achievementInput, number: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., 50+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Label *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={achievementInput.label}
                    onChange={(e) =>
                      setAchievementInput({ ...achievementInput, label: e.target.value })
                    }
                    className="flex-1 px-4 py-2 border rounded-lg"
                    placeholder="e.g., Films Produced"
                  />
                  <button
                    type="button"
                    onClick={addAchievement}
                    className="px-4 py-2 bg-zinc-200 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {formData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-zinc-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{achievement.number}</span>
                    <span>{achievement.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
