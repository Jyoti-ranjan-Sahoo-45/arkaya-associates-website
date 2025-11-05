import { useState } from 'react';
import { Upload, X, Eye } from 'lucide-react';
import { fileToBase64 } from '../../hooks/useInstantDB';

const ImageUploader = ({ currentImage, onUpload, label = "Upload Image" }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        setPreview(base64);
        onUpload(base64);
      } catch (error) {
        console.error('Error converting file:', error);
        alert('Error uploading file. Please try again.');
      }
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUpload('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex items-center space-x-3">
        <label className="cursor-pointer bg-solar-yellow hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Choose File</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {preview && (
          <>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </>
        )}
      </div>

      {showPreview && preview && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-auto max-h-64 object-contain rounded-lg"
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, GIF, WebP, MP4 (Max 5MB)
      </p>
    </div>
  );
};

export default ImageUploader;
