import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Sidebar Loading Skeleton Component
export const SidebarLoadingSkeleton = () => {
  return (
    <div className="w-full space-y-2 p-2">
      {/* Filter header skeleton */}
      {/* <div className="flex items-center gap-2 px-2 py-1">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-4 w-14 rounded" />
      </div> */}
      
      {/* Filter checkbox skeleton */}
      {/* <div className="px-2 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div> */}
      
      {/* Contact items skeletons */}
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-2 rounded-md">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1 flex-1">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};