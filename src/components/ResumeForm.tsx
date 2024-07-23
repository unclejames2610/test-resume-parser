import React from "react";

interface ResumeFormProps {
  resumeData: any;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={resumeData.name}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={resumeData.email}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={resumeData.phone}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <input
            type="text"
            value={resumeData.skills.join(", ")}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
