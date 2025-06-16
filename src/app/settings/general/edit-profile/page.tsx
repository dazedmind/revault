"use client";
import InputField from "@/app/component/InputField";
import Image from "next/image";
import avatar from "@/app/img/user.jpg";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense } from "react";
import ContentLoader from "@/app/component/ContentLoader";
import { useTheme } from "next-themes";
import { Camera, Upload, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

function EditProfileContent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setSelectedFile(file);
      toast.success("Image selected! Click 'Save Changes' to upload.");
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    if (!selectedFile || !profile) {
      toast.error("Please select an image first");
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
    formData.append("user_id", profile.users.user_id.toString());

    try {
      const res = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Profile picture updated successfully!");
        
        // Update the profile state with new image URL
        setProfile(prev => ({
          ...prev,
          users: {
            ...prev.users,
            profile_picture: data.fileUrl
          }
        }));
        
        // Clear the preview and selected file
        setPreview(null);
        setSelectedFile(null);
        
        // Optionally refresh the page to show updated image
        // window.location.reload();
      } else {
        console.error("Upload failed:", data.error);
        toast.error(data.message || "Failed to update profile picture");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while updating profile picture");
    } finally {
      setUploading(false);
    }
  };

  const fetchProfile = async () => {
    if (!mounted || typeof window === "undefined") return;
    
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(
          "Failed to fetch profile:",
          data?.error || res.statusText,
        );
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <ContentLoader />;
  }

  if (!profile) {
    return <div>Profile not found or failed to load.</div>;
  }

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Edit Profile</h1>
      
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-10' : 'bg-white-5'}`}></div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold-fg">
              <Image
                src={preview || profile.users.profile_picture || avatar}
                alt="Profile"
                className="w-full h-full object-cover"
                width={160}
                height={160}
                unoptimized={!!preview}
              />
            </div>
            
            {/* Camera icon overlay */}
            <label className="absolute bottom-2 right-2 bg-gold-fg hover:bg-gold transition-colors p-2 rounded-full cursor-pointer shadow-lg">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Upload status */}
          {selectedFile && (
            <div className="text-center">
              <p className="text-sm text-green-600 dark:text-green-400">
                {selectedFile.name} selected
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-4">
          <InputField
            containerClassName="pt-4"
            label="First Name"
            type="text"
            name="first_name"
            placeholder={profile.users.first_name || "Enter first name"}
            value={profile.users.first_name || ""}
            onChange={() => {}}
            inputClassName="w-full h-14 mt-1 dark:bg-secondary"
            labelClassName=""
            disabled={false}
          />

          <InputField
            containerClassName="pt-4"
            label="Last Name"
            type="text"
            name="last_name"
            placeholder={profile.users.last_name || "Enter last name"}
            value={profile.users.last_name || ""}
            onChange={() => {}}
            inputClassName="w-full h-14 mt-1 dark:bg-secondary"
            labelClassName=""
            disabled={false}
          />

          <InputField
            containerClassName="pt-4"
            label="Email"
            type="email"
            name="email"
            placeholder={profile.users.email || "Enter email"}
            value={profile.users.email || ""}
            onChange={() => {}}
            inputClassName="w-full h-14 mt-1 dark:bg-secondary"
            labelClassName=""
            disabled={true} // Email should typically be read-only
          />

          {/* Save Button */}
          <div className="pt-6">
            <Button
              onClick={handleSaveChanges}
              disabled={!selectedFile || uploading}
              className="bg-gradient-to-r from-gold-fg to-gold hover:bg-gradient-to-br font-inter cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f9fafb' : '#111827',
            border: '1px solid',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
          },
        }}
      />
    </div>
  );
}

function EditProfileLoading() {
  return <ContentLoader />;
}

const EditProfilePage = () => {
  return (
    <Suspense fallback={<EditProfileLoading />}>
      <EditProfileContent />
    </Suspense>
  );
};

export default EditProfilePage;