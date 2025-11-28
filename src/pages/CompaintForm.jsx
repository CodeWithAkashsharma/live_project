import React, { useState } from "react";
import { X, Paperclip, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComplaintModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Harassment");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]); // <-- NEW
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaintData = {
      title,
      category,
      description,
      files,
    };

    console.log("Complaint Submitted:", complaintData);

    // Reset form
    setTitle("");
    setCategory("Harassment");
    setDescription("");
    setFiles([]);

    onClose();
  };

  const categories = [
    "Harassment",
    "Discrimination",
    "Safety Violation",
    "Fraud",
    "Policy Breach",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/50 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl transition-all duration-300 transform scale-100 opacity-100 rounded-xl border border-gray-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Submit New Complaint
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Provide detailed information about your concern. All submissions
              are confidential.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:bg-red-600 hover:text-white hover:rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary of the issue"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block appearance-none w-full px-4 py-2 border border-gray-300 outline-none rounded-md bg-white pr-10 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the complaint..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Attachments (Optional)
  </label>

  <div
    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition cursor-pointer bg-gray-50 rounded-md min-h-[100px]"
    onClick={() => document.getElementById("file-upload").click()}
  >
    <input
      type="file"
      id="file-upload"
      className="hidden"
      multiple
      onChange={(e) => setFiles([...e.target.files])}
    />

    {files.length === 0 ? (
      <>
        <Paperclip className="w-6 h-6 mb-2" />
        <p className="text-sm font-medium">Click to upload files</p>
      </>
    ) : (
      <ul className="text-sm text-gray-700 w-full space-y-1 text-center">
        {files.map((file, index) => (
          <li key={index} className="truncate max-w-full">
            📄 {file.name}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


          {/* Footer Buttons */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-lg shadow-blue-500/50"
              onClick={()=>{
                navigate('/User/Dashboard')
              }}
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintModal;
