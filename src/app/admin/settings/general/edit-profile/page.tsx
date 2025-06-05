"use client";
import InputField from "@/app/component/InputField";
import Image from "next/image";
import avatar from "@/app/img/user.jpg";
import { Button } from "@/components/ui/button";
import { FaMicrosoft } from "react-icons/fa6";
import { useEffect, useState, Suspense } from "react";
import ContentLoader from "@/app/component/ContentLoader";
import { useTheme } from "next-themes";
import { Camera } from "lucide-react";
import { toast , Toaster } from "sonner";

function EditProfileContent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setSelectedFile(file); // 👈 store file for upload
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    if (!selectedFile || !profile) {
      console.warn("No file or profile loaded.");
      return;
    }
  
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
    formData.append("user_id", profile.users.user_id); // assuming this is the correct field
  
    try {
      const res = await fetch("/admin/api/upload-profile", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success(data.message || "Profile picture updated successfully!");
        // Optionally refetch the profile or update state
      } else {
        console.error("Upload failed:", data.error);
        toast.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while updating profile picture");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!mounted || typeof window === "undefined") return;
      
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await fetch("/admin/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json(); // <-- move this here regardless of res.ok

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

    fetchProfile();
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <ContentLoader />; // or your own spinner
  }

  if (!profile) {
    return <div>Profile not found or failed to load.</div>;
  }

  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Edit Profile</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>
      
      <div className="flex flex-col justify-between">
        <div className="relative w-full mt-5">
        <div className="flex flex-col md:flex-row items-center ">
            <div className="relative w-[124px] h-[124px] group m-4">
              {/* Image */}
              <Image
                src={preview || profile?.users?.profile_picture || avatar} // fallback to default
                alt="Avatar"
                width={124}
                height={124}
                className="w-full h-full object-cover rounded-full"
              />

              {/* Hover overlay with camera icon */}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Camera className="text-white w-6 h-6" />
                </div>

                {/* File input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
            <span>
              <p className="ml-5 text-gold">Select Profile Picture</p>
              <p className="ml-5 text-sm">Accepts: JPG, PNG, JPEG</p>
              <p className="ml-5 text-sm">Max size: 1MB</p>
            </span>
          </div>
        </div>

        <div className="w-full">
          {/* Input Fields from InputField.tsx */}
          <InputField
            containerClassName="mt-5"
            label="Name"
            type="text"
            name="fullName"
            placeholder={`${profile.users.first_name || ""} ${profile.users.last_name || ""}`}
            value={`${profile.users.first_name || ""} ${profile.users.last_name || ""}`}
            onChange={() => {}}
            inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
            labelClassName="md:ml-5"
            disabled={false}
          />

          <InputField
            containerClassName="pt-4"
            label="Employee ID"
            type="text"
            name="employeeID"
            placeholder={`${profile.employee_id || ""}`}
            value={`${profile.employee_id || ""}`}
            onChange={() => {}}
            inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
            labelClassName="md:ml-5"
            disabled={false}
          />

          <span className="relative">
            <InputField
              containerClassName="pt-4"
              label="Email"
              type="email"
              name="email"
              placeholder={`${profile.users.email || ""}`}
              value={`${profile.users.email || ""}`}
              onChange={() => {}}
              inputClassName="w-auto md:w-sm md:ml-5 h-14 mt-1 dark:bg-secondary"
              labelClassName="md:ml-5"
              disabled={false}
            />
          </span>
        </div>

         
        <span className="mt-5 md:m-5">
          <Button
            onClick={handleSaveChanges}
            className="bg-gradient-to-r from-gold-fg to-gold hover:bg-gradient-to-br font-inter cursor-pointer text-white"
          >
            Save Changes
          </Button>
        </span>
      </div>
  
      <Toaster />

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