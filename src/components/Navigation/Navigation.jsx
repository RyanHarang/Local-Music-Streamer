import { useNavigation } from "../../context/NavigationContext.jsx";

const Navigation = () => {
  const { currentPage, goToHomePage, goToLibraryPage, goToSettingsPage } =
    useNavigation();
  const linkClasses = (page) =>
    `text-xl transition-colors cursor-pointer ${
      currentPage === page ? "text-accent underline" : "hover:underline"
    }`;

  return (
    <nav className="flex w-full items-center justify-between border-b px-4 py-2">
      <div className="flex w-1/4 items-center">
        <h1 className="text-accent text-4xl font-bold">LMS</h1>
      </div>
      <div className="flex items-center gap-12">
        <button onClick={() => goToHomePage()} className={linkClasses("home")}>
          Home
        </button>
        <button
          onClick={() => goToLibraryPage()}
          className={linkClasses("library")}
        >
          Library
        </button>
        <button
          onClick={() => goToSettingsPage()}
          className={linkClasses("settings")}
        >
          Settings
        </button>
      </div>
      <div className="flex w-1/4 items-center justify-end gap-4"></div>
    </nav>
  );
};

export default Navigation;
