const Header = ({ title, description }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {title}
        </h1>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </header>
  );
};

export default Header;
