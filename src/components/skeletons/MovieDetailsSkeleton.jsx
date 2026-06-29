const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900 animate-pulse px-4 sm:px-6 lg:px-10 xl:px-20 py-5">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
        {/* Backdrop */}
        <div className="h-52 sm:h-72 md:h-[50vh] lg:h-[60vh] bg-gray-700"></div>

        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
          {/* Poster */}
          <div className="w-40 h-60 sm:w-48 sm:h-72 bg-gray-700 rounded-lg mx-auto sm:mx-0 flex-shrink-0"></div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            {/* Title */}
            <div className="h-8 w-3/4 sm:w-1/2 bg-gray-700 rounded"></div>

            {/* Overview */}
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-11/12 bg-gray-700 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-700 rounded"></div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 w-3/4 bg-gray-700 rounded"></div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <div className="h-10 w-full sm:w-40 bg-gray-700 rounded"></div>
              <div className="h-10 w-full sm:w-40 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
