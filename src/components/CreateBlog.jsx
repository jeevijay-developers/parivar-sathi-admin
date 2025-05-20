"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import { axiosInstance } from "../../lib/axiosInstance";
import { toast } from "react-toast";
import { ClipLoader } from "react-spinners";


const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [contentImages, setContentImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    if (bannerImage) formData.append("bannerImage", bannerImage);
    contentImages.forEach((img) => formData.append("contentImages", img));    
    
    axiosInstance.post("/blogs/add-blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Blog submitted successfully:", response.data);
      toast.success("Blog submitted successfully!");
    })
    .catch((error) => {
      console.error("Error submitting blog:", error);
      toast.error("Error submitting blog. Please try again.");
    })
    .finally(() => setLoading(false));
    
    // await axios.post("http://localhost:5000/api/blogs", formData);
    // alert("Blog submitted!");
  };

  return (    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition duration-200"
            placeholder="Enter short description..."
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Banner Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition duration-200">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-600 dark:text-gray-400 group-hover:text-gray-600">
                  Select banner image
                </p>
              </div>
              <input 
                type="file" 
                className="opacity-0" 
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </label>
          </div>
          {bannerImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(bannerImage)}
                alt="Banner Preview"
                className="rounded-lg w-full max-h-48 object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content Images (2)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition duration-200">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-600 dark:text-gray-400">
                      Select image {index + 1}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    accept="image/*"
                    onChange={(e) =>
                      setContentImages((prev) => {
                        const newImages = [...prev];
                        newImages[index] = e.target.files[0];
                        return newImages;
                      })
                    }
                  />
                </label>
                {contentImages[index] && (
                  <img
                    src={URL.createObjectURL(contentImages[index])}
                    alt={`Preview ${index + 1}`}
                    className="mt-2 rounded-lg w-full h-24 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-transform duration-200"
      >
        {loading ?
          <ClipLoader
            color={"#fff"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> : 
          "Publish Blog"}
      </button>
    </form>
    </div>
  );
}
