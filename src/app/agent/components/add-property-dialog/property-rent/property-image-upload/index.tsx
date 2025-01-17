import React from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { ImageIcon, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormReturn,
} from "react-hook-form";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  maxImages?: number;
  form: UseFormReturn<any>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  maxImages = 6,
  form,
}) => {
  const [error, setError] = React.useState<string>("");
  const [previews, setPreviews] = React.useState<string[]>([]);

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = form;

  // Função auxiliar para extrair a mensagem de erro
  const getErrorMessage = (
    error:
      | string
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<any>>
      | undefined
  ): string | null => {
    if (typeof error === "string") return error;
    if (error && "message" in error) return error.message as string; // `message` existe em `FieldError`
    return null;
  };

  // Observa o valor atual dos arquivos no formulário
  const formFiles = (watch("files") as File[]) || [];

  // Atualiza as previews quando os arquivos mudam
  React.useEffect(() => {
    // Limpa URLs antigas
    previews.forEach((url) => URL.revokeObjectURL(url));

    // Cria novas URLs para os arquivos atuais
    const newPreviews = formFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formFiles]);

  // Register the files field
  React.useEffect(() => {
    register("files");

    if (!formFiles.length) {
      setValue("files", []);
    }
  }, [register, setValue]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setError("");
      const imageFiles = acceptedFiles.filter(
        (file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
      );

      if (formFiles.length + imageFiles.length > maxImages) {
        setError(`Você pode fazer upload de até ${maxImages} imagens`);
        return;
      }

      const newFiles = [...formFiles, ...imageFiles].slice(0, maxImages);
      setValue("files", newFiles, { shouldValidate: true });
      onChange(newFiles);
      clearErrors("files");
    },
    [formFiles, maxImages, onChange, setValue, clearErrors]
  );

  const removeFile = (index: number) => {
    const newFiles = formFiles.filter((_, i) => i !== index);
    setValue("files", newFiles, { shouldValidate: true });
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      },
      maxSize: MAX_FILE_SIZE,
    });

  // Obtém a mensagem de erro atual
  const errorMessage = getErrorMessage(error || errors.files);

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {formFiles.map((file, index) => (
          <Card
            key={`${file.name}-${index}`}
            className="relative aspect-square group transition-transform duration-200 hover:scale-[1.02]"
          >
            {previews[index] && (
              <img
                src={previews[index]}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile(index);
              }}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-zinc-100 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <X className="h-4 w-4" />
            </button>
            {index === 0 && (
              <span
                className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-sm font-medium
                transform transition-all duration-200 hover:scale-105"
              >
                Foto principal
              </span>
            )}
          </Card>
        ))}
        {formFiles.length < maxImages && (
          <div
            {...getRootProps()}
            className={`border-2 group border-dashed rounded-lg aspect-square flex flex-col items-center 
              justify-center p-4 transition-all duration-300 transform cursor-pointer
              ${
                isDragActive
                  ? "border-primary-base bg-primary-base/10 scale-105"
                  : "border-gray-300"
              }
              ${isDragReject ? "border-red-500 bg-red-50 scale-105" : ""}
              hover:border-primary-base hover:bg-primary-base/10 hover:scale-105`}
          >
            <input {...getInputProps()} />
            <ImageIcon
              className={`h-10 w-10 transition-colors duration-200 group-hover:text-primary-base 
              ${isDragActive ? "text-primary-base" : "text-gray-400"}
              ${isDragReject ? "text-red-500" : ""}`}
            />
            <p
              className={`mt-2 text-sm text-center transition-colors duration-200 group-hover:text-primary-base
              ${isDragActive ? "text-primary-base" : "text-gray-600"}
              ${isDragReject ? "text-red-600" : ""}`}
            >
              {isDragReject
                ? "Arquivo não permitido"
                : isDragActive
                ? "Solte as imagens aqui"
                : "Arraste e solte as fotos aqui"}
            </p>
            {isDragReject && (
              <p className="text-xs text-red-600 mt-1 text-center">
                Cada arquivo deve ter no máximo 2MB
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1 text-center">
              Adicione pelo menos {Math.max(1, 1 - formFiles.length)} foto(s),{" "}
              {maxImages} é o máximo.
            </p>
          </div>
        )}
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ImageUpload;
