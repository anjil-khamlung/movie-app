import GridSkeleton from "./GridSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Slider Skeleton */}
      <div className="relative w-full h-55 sm:h-87.5 md:h-125 bg-gray-800 rounded-xl overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-10 left-6 sm:left-10 space-y-4 w-2/3">
          <div className="h-8 w-64 bg-gray-700 rounded"></div>
          <div className="h-4 w-full max-w-lg bg-gray-700 rounded"></div>
          <div className="h-4 w-5/6 max-w-md bg-gray-700 rounded"></div>

          <div className="flex gap-3 pt-2">
            <div className="h-10 w-28 bg-gray-700 rounded-lg"></div>
            <div className="h-10 w-28 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="h-8 w-56 bg-gray-700 rounded mt-10 mb-6"></div>

      {/*  GridSkeleton */}
      <GridSkeleton count={6} />
    </div>
  );
};

export default HomeSkeleton;
