const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 animate-pulse ml-40 mr-40 mt-5">
      <div className="bg-gray-800 rounded overflow-hidden">
        <div className="h-[50vh] md:h-[60vh] bg-gray-700"></div>

        <div className="p-5 flex gap-6">
          <div className="w-32 md:w-50 h-55 bg-gray-700 rounded-lg"></div>

          <div className="flex-1 space-y-4">
            <div className="h-8 w-1/2 bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-700 rounded w-3/4"></div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <div className="h-10 w-40 bg-gray-700 rounded"></div>
              <div className="h-10 w-40 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
          </div>
          
    </div>
  );
};

export default MovieDetailsSkeleton;
