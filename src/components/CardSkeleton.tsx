const CardSkeleton = () => (
    <div className="bg-gray-200 animate-pulse rounded-md h-64">
      <div className="h-36 bg-gray-300 rounded-t-md"></div>
      <div className="p-4">
        <div className="h-4 w-1/2 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
  export default CardSkeleton;