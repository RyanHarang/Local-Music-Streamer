const Sidebar = () => {
  return (
    <aside className="flex w-64 flex-col border-r p-4">
      <nav className="flex flex-col gap-4">
        <button className="rounded p-2 text-left">Library</button>
        <button className="rounded p-2 text-left">Queue</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
