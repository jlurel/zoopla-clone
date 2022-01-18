const PropertyLoader = () => {
  return (
    <div className="flex flex-col md:flex-row min-w-full w-full my-6 rounded-sm shadow-sm border border-gray-500 animate-pulse">
      <div className="bg-slate-400 md:w-2/5 h-[310px]"></div>
      <div className="flex-1 flex flex-col p-4">
        <div className="h-5 w-40 mb-2 bg-slate-400 rounded"></div>
        <div className="h-4 w-20 mb-2 bg-slate-400 rounded"></div>
        <div className="h-5 w-40 mb-2 bg-slate-400 rounded"></div>
        <div className="h-4 w-52 mb-2 bg-slate-400 rounded"></div>
      </div>
    </div>
  );
};

export default PropertyLoader;
