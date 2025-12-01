import React, { useState } from "react";
import { X, Paperclip, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComplaintModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Harassment");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
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

    setTitle("");
    setCategory("Harassment");
    setDescription("");
    setFiles([]);

    onClose();
    navigate("/User/Dashboard");
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
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/40 backdrop-blur-md p-0 sm:p-2">
  {/* Outer container */}
  <div className="w-full max-w-[38rem] mx-auto rounded-2xl border border-white/70 
      bg-gradient-to-br from-sky-50/95 via-white/95 to-indigo-50/95 
      shadow-lg overflow-hidden">


        {/* Header */}
        <div className="relative px-4 py-4 border-b border-white/80 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white">
          <div className="relative flex justify-between items-start gap-3">
            <div>
              <h2 className="text-md sm:text-lg font-semibold tracking-tight">
                Submit Complaint
              </h2>
              <p className="text-xs sm:text-sm text-sky-50/90 mt-1 max-w-xs">
                Provide detailed information about your concern. All submissions are confidential.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-sky-50 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 space-y-4 bg-gradient-to-b from-white/95 via-white/95 to-sky-50/90"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary"
              className="w-full px-3 py-3 border border-slate-200 bg-white/90 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-sm text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block appearance-none w-full px-3 py-3 pr-8 border border-slate-200 
                bg-white/90 rounded-lg shadow-sm text-sm text-slate-800 focus:ring-2 focus:ring-sky-400 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information..."
              rows="4"
              className="w-full px-3 py-3 border border-slate-200 bg-white/90 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-sm text-slate-800 placeholder-slate-400 resize-none"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Attachments (Optional)
            </label>
            <div
              className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-300 
                bg-sky-50/60 hover:bg-sky-50 rounded-xl text-slate-500 hover:border-sky-400 hover:text-sky-600 transition cursor-pointer min-h-[110px]"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {/* increased min-h */}
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={handleFileUpload}
              />
              {files.length === 0 ? (
                <>
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white shadow-sm mb-1">
                    <Paperclip className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-medium">Click to upload files</p>
                </>
              ) : (
                <ul className="text-sm text-slate-700 w-full space-y-1">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="truncate flex items-center gap-1 text-xs bg-white/80 border border-slate-200 rounded px-2 py-1"
                    >
                      📄 {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:from-sky-600 hover:via-blue-600 hover:to-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintModal;
