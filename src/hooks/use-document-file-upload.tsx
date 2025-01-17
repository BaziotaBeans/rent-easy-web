import { useState, useCallback } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const useDocumentFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleUpload = useCallback(async (file: File): Promise<string | null> => {
    if (!file) return null;

    const fileRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setDownloadURL(url);
              resolve(url);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
  }, []);

  return {
    uploadProgress,
    downloadURL,
    handleUpload,
  };
};
