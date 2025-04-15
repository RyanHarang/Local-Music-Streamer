import { useEffect, useRef } from "react";

const LibraryBuildModal = ({ buildOutput, closeModal }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
    }
  }, [buildOutput]);

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="bg-dark-bg text-dark-fg m-auto w-11/12 max-w-md overflow-hidden rounded shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="mb-4 text-center text-2xl font-semibold">
          Library Build Results
        </h3>
        <div className="bg-dark-bg2 mb-4 max-h-64 overflow-y-auto rounded p-4">
          <pre className="text-dark-fg2 text-sm break-words whitespace-pre-wrap">
            {buildOutput || "No output available"}
          </pre>
        </div>
        <div className="flex justify-center border-t pt-4">
          <button
            onClick={closeModal}
            className="hover:bg-dark-bg2 cursor-pointer rounded-md px-6 py-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default LibraryBuildModal;
