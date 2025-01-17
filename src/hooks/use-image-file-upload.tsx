import { useState, useCallback } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const useImageFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [downloadURLs, setDownloadURLs] = useState<string[]>([]);

  const handleUpload = useCallback(async (files: File[] | File): Promise<string[]> => {
    const filesArray = Array.isArray(files) ? files : [files]; // Garante que sempre será um array
    const progressArray: number[] = new Array(filesArray.length).fill(0);
    const urls: string[] = [];

    await Promise.all(
      filesArray.map((file, index) => {
        const fileRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        return new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progressArray[index] = progress;
              setUploadProgress([...progressArray]);
            },
            (error) => {
              console.error(`Erro ao fazer upload do arquivo ${file.name}:`, error);
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                urls.push(url);
                setDownloadURLs([...urls]);
                resolve();
              } catch (error) {
                console.error(`Erro ao obter URL do arquivo ${file.name}:`, error);
                reject(error);
              }
            }
          );
        });
      })
    );

    return urls;
  }, []);

  return {
    uploadProgress,  // Progresso individual de cada arquivo
    downloadURLs,    // URLs dos arquivos enviados
    handleUpload,    // Função para fazer upload de múltiplos arquivos
  };
};
