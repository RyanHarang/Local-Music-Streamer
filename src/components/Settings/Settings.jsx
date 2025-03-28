import { useState } from "react";
import LibraryBuildModal from "../Modals/LibraryBuildModal.jsx";

const Settings = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildOutput, setBuildOutput] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      setBuildOutput(data.output);
      setShowModal(true);
    } catch (error) {
      console.error("Library build error:", error);
      setBuildOutput(error.message);
      setShowModal(true);
    } finally {
      setIsBuilding(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setBuildOutput(null);
  };

  return (
    <section className="space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <div className="mx-auto flex h-full w-full max-w-lg flex-col gap-4 p-4">
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
          <span className="text-gray-500">v1.0.0</span>
        </div>
      </div>

      {showModal && (
        <LibraryBuildModal buildOutput={buildOutput} closeModal={closeModal} />
      )}
    </section>
  );
};

export default Settings;
