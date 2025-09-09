'use client';

export default function SkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto border rounded-2xl">
      {/* Skeleton Animation Container */}
      <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-2xl">
        {/* Skeleton Header */}
        <div className="bg-gray-200 px-6 py-4 border-b-2 border-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-6 bg-gray-400 rounded w-48 animate-pulse"></div>
          </div>
        </div>
        
        {/* Skeleton Animation Area */}
        <div className="relative p-8">
          {/* Main skeleton animation frame */}
          <div className="bg-gray-100 border-2 border-gray-300 rounded-xl h-96 mb-6 relative overflow-hidden">
            {/* Animated skeleton elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            
            {/* Skeleton shapes simulating physics elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-gray-300 rounded-full animate-bounce"></div>
            <div className="absolute top-16 right-16 w-12 h-12 bg-gray-300 rounded animate-pulse"></div>
            <div className="absolute bottom-16 left-1/2 w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            
            {/* Skeleton trajectory line */}
            <div className="absolute top-20 left-20 w-32 h-1 bg-gray-300 rounded animate-pulse"></div>
            <div className="absolute top-24 left-24 w-24 h-1 bg-gray-300 rounded animate-pulse"></div>
            <div className="absolute top-28 left-28 w-20 h-1 bg-gray-300 rounded animate-pulse"></div>
          </div>
          
          {/* Skeleton controls */}
          <div className="flex gap-4 mb-6">
            <div className="h-12 bg-gray-300 rounded-xl w-24 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-xl w-24 animate-pulse"></div>
            <div className="h-12 bg-gray-300 rounded-xl w-24 animate-pulse"></div>
          </div>
          
          {/* Skeleton parameter controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6">
                <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
                <div className="h-2 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Skeleton info panel */}
          <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6">
            <div className="h-8 bg-gray-300 rounded w-48 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-40 animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-36 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gray-400 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gray-400 rounded-bl-lg"></div>
      </div>
      
      {/* Loading text with animation */}
      <div className="text-center mt-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="text-xl font-bold text-black">Analyzing physics concepts and generating animation...</p>
        <p className="text-gray-600 mt-2">This may take a few moments</p>
      </div>
    </div>
  );
}
