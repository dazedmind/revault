// src/app/utils/activityLogger.ts

interface LogActivityParams {
    activity: string;
    activity_type: string;
    paper_id?: string | number;
    paper_title?: string;
  }
  
  export const logUserActivity = async ({
    activity,
    activity_type,
    paper_id,
    paper_title,
  }: LogActivityParams): Promise<boolean> => {
    try {
      console.log("🔍 Starting activity log:", { activity, activity_type, paper_id, paper_title });
      
      // Get token from localStorage
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.warn("⚠️ No auth token found for activity logging");
        return false;
      }
  
      const requestBody = {
        activity,
        activity_type,
        paper_id,
        paper_title,
      };
  
      console.log("📤 Sending request body:", requestBody);
  
      const response = await fetch("/api/user-activity-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      console.log("📨 Response status:", response.status);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed to log user activity. Status:", response.status);
        console.error("❌ Error response:", errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          console.error("❌ Parsed error data:", errorData);
        } catch (e) {
          console.error("❌ Could not parse error response as JSON");
        }
        return false;
      }
  
      const result = await response.json();
      console.log("✅ User activity logged successfully:", result);
      return true;
  
    } catch (error) {
      console.error("❌ Error logging user activity:", error);
      console.error("❌ Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      return false;
    }
  };
  
  // Predefined activity types for common document interactions
  export const DOCUMENT_ACTIVITIES = {
    VIEW_DOCUMENT: "Viewed document",
    CLICK_READ_BUTTON: "Clicked read button",
    OPEN_DOCUMENT: "Opened document",
    ACCESS_DOCUMENT: "Accessed document",
  } as const;
  
  // Activity types as strings (to avoid import issues)
  export const ACTIVITY_TYPES = {
    VIEW_DOCUMENT: "VIEW_DOCUMENT",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    // Add other types as needed
  } as const;