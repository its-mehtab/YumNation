import React, { useState, useRef } from "react";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/user/AuthContext";
import { notifySuccess, notifyError } from "../../utils/toast";
import {
  User,
  Mail,
  Phone,
  Shield,
  Lock,
  Bell,
  Camera,
  Save,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Sliders,
  Globe,
  Trash2,
  AlertTriangle,
  KeyRound,
  Laptop,
  Smartphone,
  LogOut,
  MapPin,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

// ── Reusable Section Card ──────────────────────────────────────────────────
const Section = ({ title, subtitle, icon: Icon, children, action }) => (
  <div className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden transition-all">
    {(title || subtitle || action) && (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 gap-2 bg-gray-50/50">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-8 h-8 rounded-md bg-[#fff2e8] text-[#fc8019] flex items-center justify-center shrink-0">
              <Icon size={16} strokeWidth={2} />
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="p-4 sm:p-6 space-y-4">{children}</div>
  </div>
);

// ── Custom Smooth Toggle ───────────────────────────────────────────────────
const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-2 gap-4">
    <div className="space-y-0.5 pr-2">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      {description && (
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      )}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#fc8019]/40 ${
        checked ? "bg-[#fc8019]" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

// ── Main ProfileSettings Page Component ────────────────────────────────────
const ProfileSettings = ({ role: customRole }) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const effectiveRole =
    customRole ||
    (user?.role === "admin"
      ? "Administrator"
      : user?.role === "owner"
        ? "Restaurant Owner"
        : "Administrator");

  const [activeTab, setActiveTab] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);

  // ── Static Initial Profile Form State ──
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "Alex",
    lastName: user?.lastName || (effectiveRole === "Administrator" ? "Vance" : "Morgan"),
    email: user?.email || (effectiveRole === "Administrator" ? "admin@yumnation.com" : "owner@pizzapalace.com"),
    phone: user?.phone || "+1 (555) 349-8201",
    role: effectiveRole,
    bio:
      effectiveRole === "Administrator"
        ? "Platform Administrator managing restaurants, system orders, analytics, and platform compliance."
        : "Executive Restaurant Manager managing active menus, incoming orders, and kitchen operations.",
    city: "San Francisco",
    state: "California",
    country: "United States",
    avatarPreview: user?.avatar || assets.avatar,
    // Preferences
    language: "English (US)",
    timezone: "America/Los_Angeles (PST - GMT-8)",
    currency: "USD ($)",
    // Notifications
    orderNotifications: true,
    emailSummaries: true,
    systemAlerts: false,
    marketingUpdates: false,
    soundAlerts: true,
    // Security
    twoFactorEnabled: true,
  });

  // ── Password Form State ──
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // ── Handle Field Change ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ── Handle Avatar Upload ──
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        notifyError("Please select a valid image file");
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        notifyError("Image must be smaller than 3MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatarPreview: previewUrl }));
      notifySuccess("Avatar preview updated");
    }
  };

  // ── Handle Save Profile ──
  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      notifySuccess("Profile settings saved successfully");
    }, 700);
  };

  // ── Handle Password Update ──
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.currentPassword) {
      notifyError("Please enter your current password");
      return;
    }
    if (passwords.newPassword.length < 6) {
      notifyError("New password must be at least 6 characters long");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      notifyError("New passwords do not match");
      return;
    }

    notifySuccess("Password changed successfully");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security & Login", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Sliders },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            Profile & Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your personal profile details, account credentials, and platform preferences.
          </p>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#fc8019] hover:bg-[#ea6a12] text-white rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 disabled:opacity-60 cursor-pointer"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* ── Hero Profile Summary Card ── */}
      <div className="bg-white rounded-md border border-gray-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar with Camera Trigger */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#fc8019]/30 bg-gray-100 shadow-inner">
              <img
                src={profile.avatarPreview}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-[#fc8019] text-white rounded-full hover:bg-[#ea6a12] transition-colors shadow-md cursor-pointer"
              title="Change Avatar"
            >
              <Camera size={14} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fff2e8] text-[#fc8019] border border-orange-200 w-fit mx-auto sm:mx-0">
                <Sparkles size={12} /> {profile.role}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-gray-400" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-gray-400" />
                {profile.city}, {profile.country}
              </span>
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                <CheckCircle2 size={12} /> Active Account
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                <Clock size={12} /> Joined March 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="flex bg-gray-50 rounded-md p-1 border border-gray-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-white text-[#fc8019] shadow-xs border border-gray-200"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/60"
              }`}
            >
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: Personal Information ── */}
      {activeTab === "personal" && (
        <div className="space-y-6">
          <Section
            title="Personal Information"
            subtitle="Update your basic contact details and public display information."
            icon={User}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-md pl-9 pr-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                  />
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-md pl-9 pr-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                  />
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Role / System Designation
                </label>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  disabled
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3.5 py-2 text-sm text-gray-500 cursor-not-allowed font-medium"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Assigned system role. Contact technical administration to request permission adjustments.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Bio / Responsibilities
                </label>
                <textarea
                  rows={3}
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md p-3 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all resize-none"
                />
              </div>
            </div>
          </Section>

          <Section
            title="Location & Address"
            subtitle="Geographical location used for regional analytics and time operations."
            icon={MapPin}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3.5 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                />
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* ── TAB 2: Security & Login ── */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <Section
            title="Change Password"
            subtitle="Ensure your account uses a secure password of at least 6 characters."
            icon={Lock}
          >
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    placeholder="Enter existing password"
                    className="w-full bg-white border border-gray-200 rounded-md pl-3.5 pr-10 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={passwords.newPassword}
                      onChange={(e) =>
                        setPasswords((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      placeholder="Min. 6 characters"
                      className="w-full bg-white border border-gray-200 rounded-md pl-3.5 pr-10 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={passwords.confirmPassword}
                      onChange={(e) =>
                        setPasswords((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="Re-type new password"
                      className="w-full bg-white border border-gray-200 rounded-md pl-3.5 pr-10 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </Section>

          <Section
            title="Two-Factor Authentication (2FA)"
            subtitle="Add an extra layer of security when signing into your dashboard."
            icon={ShieldCheck}
          >
            <Toggle
              label="Enable Two-Factor Authentication"
              description="Require an authentication code via email or authenticator app when signing in."
              checked={profile.twoFactorEnabled}
              onChange={() =>
                setProfile((prev) => ({
                  ...prev,
                  twoFactorEnabled: !prev.twoFactorEnabled,
                }))
              }
            />
          </Section>

          <Section
            title="Active Login Sessions"
            subtitle="Manage devices and browsers currently signed into this account."
            icon={KeyRound}
          >
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                    <Laptop size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      Windows 11 · Chrome Browser
                      <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        Current Session
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      New York, USA · IP: 192.168.1.1 · Active now
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      iPhone 15 Pro · Safari Mobile
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      San Francisco, USA · IP: 104.28.14.9 · 2 days ago
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => notifySuccess("Session terminated")}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-md transition-colors"
                >
                  Revoke
                </button>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* ── TAB 3: Notifications ── */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Section
            title="Order & Activity Notifications"
            subtitle="Configure what alerts you receive during daily kitchen and store activity."
            icon={Bell}
          >
            <div className="divide-y divide-gray-100 space-y-1">
              <Toggle
                label="New Order Audio & Push Alert"
                description="Play an alert sound and trigger desktop notifications when customer places an order."
                checked={profile.orderNotifications}
                onChange={() =>
                  setProfile((prev) => ({
                    ...prev,
                    orderNotifications: !prev.orderNotifications,
                  }))
                }
              />
              <Toggle
                label="Daily Summary Email"
                description="Receive an email digest of daily sales, completed orders, and revenues."
                checked={profile.emailSummaries}
                onChange={() =>
                  setProfile((prev) => ({
                    ...prev,
                    emailSummaries: !prev.emailSummaries,
                  }))
                }
              />
              <Toggle
                label="System Maintenance & Status Alerts"
                description="Get notified about scheduled platform maintenance and critical security updates."
                checked={profile.systemAlerts}
                onChange={() =>
                  setProfile((prev) => ({
                    ...prev,
                    systemAlerts: !prev.systemAlerts,
                  }))
                }
              />
              <Toggle
                label="Marketing & Platform News"
                description="Receive announcements regarding new merchant features and promotional tools."
                checked={profile.marketingUpdates}
                onChange={() =>
                  setProfile((prev) => ({
                    ...prev,
                    marketingUpdates: !prev.marketingUpdates,
                  }))
                }
              />
            </div>
          </Section>
        </div>
      )}

      {/* ── TAB 4: Preferences & Danger Zone ── */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          <Section
            title="Regional & Display Preferences"
            subtitle="Customize the date formats, currency, and language used across your interface."
            icon={Globe}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Language
                </label>
                <select
                  name="language"
                  value={profile.language}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all cursor-pointer"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="Spanish (ES)">Spanish (ES)</option>
                  <option value="French (FR)">French (FR)</option>
                  <option value="Hindi (IN)">Hindi (IN)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={profile.timezone}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all cursor-pointer"
                >
                  <option value="America/Los_Angeles (PST - GMT-8)">
                    Pacific Time (PST - GMT-8)
                  </option>
                  <option value="America/New_York (EST - GMT-5)">
                    Eastern Time (EST - GMT-5)
                  </option>
                  <option value="Asia/Kolkata (IST - GMT+5:30)">
                    India Standard Time (IST - GMT+5:30)
                  </option>
                  <option value="Europe/London (GMT)">
                    Greenwich Mean Time (GMT)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Currency Symbol
                </label>
                <select
                  name="currency"
                  value={profile.currency}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#fc8019] focus:ring-2 focus:ring-[#fc8019]/20 transition-all cursor-pointer"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                </select>
              </div>
            </div>
          </Section>

          {/* Danger Zone */}
          <div className="bg-red-50/50 rounded-md border border-red-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-red-200 bg-red-50 flex items-center gap-2 text-red-700">
              <AlertTriangle size={18} />
              <h3 className="text-sm font-bold">Danger Zone</h3>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Deactivate Account
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Temporarily disable dashboard access and pause restaurant/admin activities.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => notifyError("Account deactivation requires administrator verification")}
                  className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-100 rounded-md text-xs font-bold transition-colors shrink-0"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;

