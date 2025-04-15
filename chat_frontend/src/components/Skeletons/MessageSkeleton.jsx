import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MessagesLoadingSkeleton = () => {
    // Create alternating message patterns for a more realistic look
    const messagePatterns = [
      { align: "justify-start", width: "w-2/3" },
      { align: "justify-end", width: "w-1/2" },
      { align: "justify-start", width: "w-3/5" },
      { align: "justify-end", width: "w-3/4" },
      { align: "justify-end", width: "w-2/5" },
    //   { align: "justify-end", width: "w-1/2" },
    ];
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messagePatterns.map((pattern, index) => (
          <div key={index} className={`flex ${pattern.align}`}>
            {pattern.align === "justify-start" && (
              <Skeleton className="h-8 w-8 rounded-full mr-2 shrink-0" />
            )}
            <div className={`${pattern.width} space-y-2`}>
              {/* Random message with or without image */}
              {index % 4 === 0 && (
                <Skeleton className="h-36 w-full max-w-[200px] rounded-md" />
              )}
              <Skeleton className="h-4 w-full rounded" />
              {pattern.width !== "w-1/3" && pattern.width !== "w-2/5" && (
                <Skeleton className="h-4 w-4/5 rounded" />
              )}
              <div className="flex justify-end">
                <Skeleton className="h-3 w-12 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };