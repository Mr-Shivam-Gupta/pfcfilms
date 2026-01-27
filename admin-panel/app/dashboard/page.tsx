"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../lib/api";
import {
  Film,
  BookOpen,
  Image,
  Mail,
  Users,
  MessageSquare,
  Award,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Productions from "../components/Productions";
import Courses from "../components/Courses";
import Gallery from "../components/Gallery";
import Contacts from "../components/Contacts";
import Testimonials from "../components/Testimonials";
import Awards from "../components/Awards";
import Stats from "../components/Stats";
import TopProjects from "../components/TopProjects";

type DashboardStats = {
  productions: number;
  courses: number;
  gallery: number;
  contacts: number;
  newContacts: number;
  testimonials: number;
  awards: number;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/");
      return;
    }
    fetchDashboardStats();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await apiClient.get("/admin/dashboard");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch stats:", error);
      // If token is invalid/expired, the interceptor will handle redirect
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Interceptor will redirect, but we can also handle it here
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "productions", label: "Productions", icon: Film },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "contacts", label: "Contacts", icon: Mail },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "awards", label: "Awards & Celebrities", icon: Award },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "top-projects", label: "Top Projects", icon: Film },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 text-white transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">PFC Films Admin</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-amber-500 text-black"
                      : "hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-zinc-100 rounded-lg"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <h1 className="text-2xl font-bold text-zinc-900 capitalize">
              {activeTab === "dashboard" ? "Dashboard" : menuItems.find((m) => m.id === activeTab)?.label}
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <div>
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">Productions</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.productions || 0}
                        </p>
                      </div>
                      <Film className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">Courses</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.courses || 0}
                        </p>
                      </div>
                      <BookOpen className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">Gallery Items</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.gallery || 0}
                        </p>
                      </div>
                      <Image className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">New Contacts</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.newContacts || 0}
                        </p>
                      </div>
                      <Mail className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">Testimonials</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.testimonials || 0}
                        </p>
                      </div>
                      <MessageSquare className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">Awards</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.awards || 0}
                        </p>
                      </div>
                      <Award className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-600 text-sm">Total Contacts</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-2">
                          {stats?.contacts || 0}
                        </p>
                      </div>
                      <Mail className="w-12 h-12 text-amber-500" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "productions" && <Productions />}
          {activeTab === "courses" && <Courses />}
          {activeTab === "gallery" && <Gallery />}
          {activeTab === "contacts" && <Contacts />}
          {activeTab === "testimonials" && <Testimonials />}
          {activeTab === "awards" && <Awards />}
          {activeTab === "stats" && <Stats />}
          {activeTab === "top-projects" && <TopProjects />}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
