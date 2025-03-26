const Settings = () => {
  return (
    <section className="space-y-8 p-4">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <div className="mx-auto flex h-full w-full max-w-md flex-col gap-4 p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-sm font-medium">Dark Mode</span>
        </div>

        <div className="flex items-center justify-between border-b py-2">
          <span className="text-sm font-medium">Shuffle On Start</span>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        <div className="flex items-center justify-between border-b py-2">
          <span className="text-sm font-medium">Autoplay Next</span>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium">Version</span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>
    </section>
  );
};

export default Settings;
