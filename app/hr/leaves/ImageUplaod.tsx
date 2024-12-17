import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageUplaod({
  onUpload,
}: {
  onUpload?: (file: File) => void;
}) {
  // * Stete for image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // * Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // * Function to handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reset previous state
    setError(null);

    // Get the File first
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate File type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, PNG, and GIF images are allowed.");
      return;
    }

    // Validate File size
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("File size must be less than 5MB.");
      return;
    }

    // Create Preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Set the selected file
    setSelectedFile(file);
    onUpload?.(file);
  };

  // Handle remove file
  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSelectedFile(null);
    setPreview(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Upload file logic
      console.log("Uploading file...");

      // if(!Response.ok) {
      //   throw new Error("Failed to upload file");
      // }

      // const result = await Response.json()

      handleRemoveFile();
    } catch (error) {
      setError("Failed to upload file");
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <Label>Upload Image</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {preview && (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="max-w-full h-64 object-cover"
          />
          <Button
            onClick={handleRemoveFile}
            size={"icon"}
            variant="destructive"
            className="absolute top-2 right-2"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}

      {selectedFile && (
        <div className="flex items-center space-x-2">
          <ImageIcon className="h-4 w-4" />
          <span>{selectedFile.name}</span>
          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={handleUpload}
            className="ml-auto"
            disabled={error !== null}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
