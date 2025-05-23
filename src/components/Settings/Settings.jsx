import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext.jsx";
import LibraryBuildModal from "../Modals/LibraryBuildModal.jsx";
import FileUploadModal from "../Modals/FileUploadModal.jsx";

const Settings = () => {
  const { fetchLibrary } = usePlayer();
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildOutput, setBuildOutput] = useState(null);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const buildLibrary = async () => {
    try {
      setIsBuilding(true);

      const response = await fetch("http://localhost:3000/build-library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to build library");
      }

      const data = await response.json();
      fetchLibrary();
      setBuildOutput(data.output);
      setShowBuildModal(true);
    } catch (error) {
      console.error("Library build error:", error);
      setBuildOutput(error.message);
      setShowBuildModal(true);
    } finally {
      setIsBuilding(false);
    }
  };

  const closeBuildModal = () => {
    setShowBuildModal(false);
    setBuildOutput(null);
  };

  return (
    <section className="space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <div className="mx-auto flex h-full w-full max-w-lg flex-col gap-4 p-4">
        <div className="flex items-center justify-between py-2">
          <span className="text-lg">Upload Music</span>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-accent hover:bg-accent/80 rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Upload Files
          </button>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-lg">Rebuild Music Library</span>
          <button
            onClick={buildLibrary}
            disabled={isBuilding}
            className="bg-accent hover:bg-accent/80 rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBuilding ? "Building..." : "Build Library"}
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-lg font-medium">Version</span>
          <span className="text-dark-fg3">v1.0.0</span>
        </div>
      </div>

      {showBuildModal && (
        <LibraryBuildModal
          buildOutput={buildOutput}
          closeModal={closeBuildModal}
        />
      )}

      {showUploadModal && (
        <FileUploadModal closeModal={() => setShowUploadModal(false)} />
      )}
    </section>
  );
};

export default Settings;
