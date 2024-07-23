import React, { useState } from "react";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import UploadForm from "./components/UploadForm";

function App() {
  const [resumeData, setResumeData] = useState<any>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Parser</h1>
      <UploadForm setResumeData={setResumeData} />
      {resumeData && <ResumeForm resumeData={resumeData} />}
    </div>
  );
}

export default App;
