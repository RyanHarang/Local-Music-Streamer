import { useEffect, useRef } from "react";

const LibraryBuildModal = ({ buildOutput, closeModal }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) dialogElement.showModal();
  }, [buildOutput]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="bg-dark-bg text-dark-fg fixed z-50 m-auto w-11/12 max-w-md overflow-hidden rounded p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Library Build Results
        </h3>
        <div className="mb-4 max-h-64 overflow-y-auto rounded bg-gray-800 p-4">
          <pre className="text-sm break-words whitespace-pre-wrap text-gray-300">
            {buildOutput || "No output available"}
          </pre>
        </div>
        <div className="flex justify-center border-t pt-4">
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

export default LibraryBuildModal;
