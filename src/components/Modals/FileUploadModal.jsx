import { useState, useRef, useEffect } from "react";

const ALLOWED_EXTENSIONS = [".mp3", ".wav", ".flac", ".m4a", ".aac"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const FileUploadModal = ({ closeModal }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
    }
  }, []);

  const validateFiles = (fileList) => {
    const validFiles = Array.from(fileList).filter((file) => {
      // Check file extension
      const extension = "." + file.name.split(".").pop().toLowerCase();
      const isAllowedType = ALLOWED_EXTENSIONS.includes(extension);

      // Check file size
      const isAllowedSize = file.size <= MAX_FILE_SIZE;

      return isAllowedType && isAllowedSize;
    });

    return validFiles;
  };

  const handleFiles = (fileList) => {
    const validFiles = validateFiles(fileList);
    setFiles((prevFiles) => {
      // Prevent duplicates
      const newFiles = validFiles.filter(
        (newFile) =>
          !prevFiles.some((existingFile) => existingFile.name === newFile.name),
      );
      return [...prevFiles, ...newFiles];
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("musicFiles", file);
    });

    try {
      const response = await fetch("http://localhost:3000/upload-music", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      // Reset state after successful upload
      setFiles([]);
      setUploadProgress(0);

      // Optionally trigger library rebuild
      // await fetch("http://localhost:3000/build-library", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ mode: "incremental" }),
      // });

      closeModal();
    } catch (error) {
      console.error("Upload error:", error);
      // Handle error (maybe show error message)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="bg-dark-bg text-dark-fg fixed z-50 m-auto w-11/12 max-w-md overflow-hidden rounded p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Upload Music Files
        </h3>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${dragActive ? "border-accent bg-dark-bg3" : "border-dark-fg2"} `}
        >
          <input
            type="file"
            multiple
            accept={ALLOWED_EXTENSIONS.join(",")}
            onChange={handleFileInput}
            ref={fileInputRef}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-dark-fg mb-2">
              Drag and drop files here or
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-accent ml-2 cursor-pointer hover:underline"
              >
                browse
              </button>
            </p>
            <p className="text-dark-fg3 text-xs">
              Supported formats: {ALLOWED_EXTENSIONS.join(", ")}
              <br />
              Max file size: 50MB
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md mb-2 font-medium">
              Selected Files ({files.length})
            </h4>
            <div className="max-h-40 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="bg-dark-bg3 mb-2 flex items-center justify-between rounded p-2"
                >
                  <div className="flex items-center">
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(file.name)}
                    className="cursor-pointer rounded-full p-1 text-red-500 hover:bg-red-500/10"
                  >
                    &#10006;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between border-t pt-4">
          <button
            onClick={uploadFiles}
            disabled={files.length === 0 || isUploading}
            className="disabled:hover:bg-accent bg-accent hover:bg-accent/80 rounded-md px-6 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button
            onClick={closeModal}
            className="hover:bg-dark-bg2 rounded-md px-6 py-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default FileUploadModal;
