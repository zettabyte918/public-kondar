const Main = ({ children }) => {
  return (
    <main className="bg-gray-100">
      <div className="max-w-7xl  py-6 sm:px-6 lg:px-8">
        <div className="px-2 py-4 sm:px-0">{children}</div>
      </div>
    </main>
  );
};

export default Main;
