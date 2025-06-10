// /utils/gcpUploader.ts
import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Debug: Check if service account file exists
const serviceAccountPath = path.join(process.cwd(), "gcp-service-key.json");
console.log("🔍 Service account path:", serviceAccountPath);
console.log("📁 Service account file exists:", fs.existsSync(serviceAccountPath));

// Initialize Google Cloud Storage
let storage: Storage;

try {
  if (fs.existsSync(serviceAccountPath)) {
    console.log("✅ Using service account file for authentication");
    storage = new Storage({
      keyFilename: serviceAccountPath,
      projectId: "revault-system",
    });
  } else {
    console.log("⚠️ Service account file not found, trying environment variables");
    storage = new Storage({
      projectId: "revault-system",
    });
  }
} catch (error) {
  console.error("❌ Failed to initialize Google Cloud Storage:", error);
  throw error;
}

const bucketName = "revault-files";

export async function testConnection(): Promise<boolean> {
  try {
    console.log("🔍 Testing Google Cloud Storage connection...");
    
    const [buckets] = await storage.getBuckets();
    console.log("✅ Successfully connected to Google Cloud Storage");
    console.log("📦 Available buckets:", buckets.map(b => b.name));
    
    const bucket = storage.bucket(bucketName);
    const [exists] = await bucket.exists();
    console.log(`📦 Bucket '${bucketName}' exists:`, exists);
    
    if (!exists) {
      console.log("❌ Target bucket does not exist!");
      return false;
    }
    
    const [metadata] = await bucket.getMetadata();
    console.log("📋 Bucket metadata:", {
      name: metadata.name,
      location: metadata.location,
      storageClass: metadata.storageClass,
      timeCreated: metadata.timeCreated
    });
    
    return true;
  } catch (error) {
    console.error("❌ Connection test failed:", error);
    return false;
  }
}

export async function uploadFile(buffer: Buffer, originalFilename: string): Promise<string> {
  try {
    console.log("📤 Starting file upload process...");
    console.log("📄 Original filename:", originalFilename);
    console.log("📊 Buffer size:", buffer.length, "bytes");
    
    // Test connection first
    const connectionOk = await testConnection();
    if (!connectionOk) {
      throw new Error("Google Cloud Storage connection failed");
    }
    
    // Generate unique filename to avoid conflicts
    const fileExtension = path.extname(originalFilename);
    const baseName = path.basename(originalFilename, fileExtension);
    const uniqueFilename = `${baseName}-${uuidv4()}${fileExtension}`;
    
    // Add timestamp folder structure for organization
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filepath = `papers/${timestamp}/${uniqueFilename}`;
    
    console.log("📁 Upload path:", filepath);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filepath);

    console.log("⬆️ Uploading file to Google Cloud Storage...");
    
    // Upload the file WITHOUT setting public: true (this causes the ACL error)
    await file.save(buffer, {
      metadata: {
        contentType: "application/pdf",
        cacheControl: "public, max-age=31536000",
        // Add custom metadata for debugging
        uploadedAt: new Date().toISOString(),
        originalName: originalFilename,
      },
      // Remove public: true - this causes the ACL error with uniform bucket access
      resumable: false,
      validation: 'crc32c',
    });

    console.log("✅ File uploaded successfully!");
    
    // Verify the file exists
    const [exists] = await file.exists();
    console.log("🔍 File exists after upload:", exists);
    
    if (!exists) {
      throw new Error("File was not found after upload");
    }
    
    // Get file metadata to confirm upload
    const [metadata] = await file.getMetadata();
    console.log("📋 Uploaded file metadata:", {
      name: metadata.name,
      size: metadata.size,
      contentType: metadata.contentType,
      timeCreated: metadata.timeCreated,
      md5Hash: metadata.md5Hash
    });

    // Generate public URL (this will work even with uniform bucket access if bucket is public)
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filepath}`;
    console.log("🌐 Public URL:", publicUrl);
    
    return publicUrl;
    
  } catch (error) {
    console.error("❌ Error uploading file to GCP:");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    
    if (error.code) {
      console.error("Error code:", error.code);
    }
    
    if (error.errors) {
      console.error("Detailed errors:", error.errors);
    }
    
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Function to make bucket publicly accessible (for uniform bucket access)
export async function makeBucketPublic(): Promise<void> {
  try {
    const bucket = storage.bucket(bucketName);
    
    // For uniform bucket-level access, we need to set IAM policy instead of ACLs
    await bucket.iam.setPolicy({
      bindings: [
        {
          role: 'roles/storage.objectViewer',
          members: ['allUsers'],
        },
      ],
    });
    
    console.log(`✅ Bucket ${bucketName} is now publicly readable`);
  } catch (error) {
    console.error("❌ Error making bucket public:", error);
    throw error;
  }
}

// Function to create bucket if it doesn't exist
export async function createBucketIfNotExists(): Promise<void> {
  try {
    const bucket = storage.bucket(bucketName);
    const [exists] = await bucket.exists();
    
    if (!exists) {
      console.log(`📦 Creating bucket: ${bucketName}`);
      
      const [newBucket] = await storage.createBucket(bucketName, {
        location: 'ASIA-SOUTHEAST1', // Match your existing bucket location
        storageClass: 'STANDARD',
        uniformBucketLevelAccess: {
          enabled: true // Enable uniform bucket access for new buckets
        }
      });
      
      console.log(`✅ Bucket created: ${bucketName}`);
      
      // Make bucket publicly readable using IAM policy
      await makeBucketPublic();
      
    } else {
      console.log(`✅ Bucket already exists: ${bucketName}`);
    }
  } catch (error) {
    console.error("❌ Error creating bucket:", error);
    throw error;
  }
}

// Debug function to list all files in bucket
export async function listBucketFiles(): Promise<void> {
  try {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles();
    
    console.log(`📁 Files in bucket '${bucketName}':`);
    if (files.length === 0) {
      console.log("  (No files found)");
    } else {
      files.forEach(file => {
        console.log(`  - ${file.name}`);
      });
    }
  } catch (error) {
    console.error("❌ Error listing bucket files:", error);
  }
}