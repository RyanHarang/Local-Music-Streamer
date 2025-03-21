const Sidebar = () => {
  return (
    <aside className="flex w-64 flex-col p-4">
      <div className="mb-6 text-xl font-bold">Music Streamer</div>

      <nav className="flex flex-col gap-4">
        <button className="rounded p-2 text-left">Home</button>
        <button className="rounded p-2 text-left">Library</button>
        <button className="rounded p-2 text-left">Playlists</button>
        <button className="rounded p-2 text-left">Settings</button>
      </nav>

      <div className="mt-auto text-xs">© 2025 Ryan Harang</div>
    </aside>
  );
};

export default Sidebar;
