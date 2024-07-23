import React, { useRef } from "react";
import { extractResumeData } from "../utils/pdfParser";

interface UploadFormProps {
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
}

const UploadForm: React.FC<UploadFormProps> = ({ setResumeData }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await extractResumeData(file);
      setResumeData(data);
    }
  };

  //   const extractResumeData = async (file: File) => {
  //     // Placeholder for actual resume parsing logic
  //     // You can use libraries like pdf-lib for PDF or mammoth for DOCX
  //     const mockData = {
  //       name: "John Doe",
  //       email: "john.doe@example.com",
  //       phone: "123-456-7890",
  //       skills: ["JavaScript", "React", "Node.js"],
  //     };
  //     return new Promise((resolve) => setTimeout(() => resolve(mockData), 1000));
  //   };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.docx"
        onChange={handleFileUpload}
        className="border border-gray-300 p-2"
      />
    </div>
  );
};

export default UploadForm;
