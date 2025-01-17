"use client";

import { useCallback } from "react";
import { X, FileText, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StepThreeProps {
  form: any; // Replace with actual form state
}

export function StepFourth({ form }: StepThreeProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer();
      acceptedFiles.forEach((file) => {
        dataTransfer.items.add(file);
      });
      form.setValue("file", dataTransfer.files);
    },
    [form]
  );

  const removeFile = () => {
    form.setValue("file", undefined);
    form.clearErrors("file");
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      maxSize: MAX_FILE_SIZE,
      maxFiles: 1,
    });

  const selectedFile = form.watch("file")?.[0];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-6">Carregar Documento</h2>

      <div className="w-full">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 relative transition-all duration-300 ease-in-out",
            isDragActive && !isDragReject
              ? "border-blue-500 bg-blue-50 scale-[1.02]"
              : "border-blue-200 bg-blue-50/50 hover:border-blue-400 hover:bg-blue-50",
            isDragReject && "border-red-500 bg-red-50/50",
            selectedFile && "border-green-500 bg-green-50/50"
          )}
        >
          <input {...getInputProps()} />

          {selectedFile ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 max-w-[200px] truncate">
                  {selectedFile.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-gray-400 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    isDragActive ? "bg-blue-500/20" : "bg-blue-400/20"
                  )}
                >
                  <Upload
                    className={cn(
                      "w-6 h-6 transition-colors",
                      isDragActive ? "text-blue-600" : "text-blue-500"
                    )}
                  />
                </div>
              </div>
              <div className="text-center">
                {isDragActive ? (
                  isDragReject ? (
                    <p className="text-sm text-red-500">
                      Arquivo não suportado
                    </p>
                  ) : (
                    <p className="text-sm text-blue-500 animate-pulse">
                      Solte o arquivo aqui
                    </p>
                  )
                ) : (
                  <p className="text-sm text-gray-600">
                    Arraste e solte o arquivo aqui ou{" "}
                    <span className="text-blue-500 hover:text-blue-600 cursor-pointer underline">
                      Escolha o arquivo
                    </span>
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {form.formState.errors.file && (
          <p className="text-sm text-red-500 mt-2">
            {form.formState.errors.file.message}
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <p>Formatos suportados: PDF</p>
        <p>Máximo: 2MB</p>
      </div>
    </div>
  );
}
