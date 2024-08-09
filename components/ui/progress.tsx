"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

// Định nghĩa một hàm để xác định màu sắc dựa trên mức phát triển của cây
const getStatusColor = (status: string) => {
  switch (status) {
    case "Seed":
      return "bg-green-500" // Màu cho giai đoạn Seed
    case "Sprout":
      return "bg-yellow-500" // Màu cho giai đoạn Sprout
    case "Sapling":
      return "bg-orange-500" // Màu cho giai đoạn Sapling
    case "Mature":
      return "bg-blue-500" // Màu cho giai đoạn Mature
    case "Harvest":
      return "bg-red-500" // Màu cho giai đoạn Harvest
    default:
      return "bg-gray-500" // Màu mặc định nếu status không khớp
  }
}

// Định nghĩa kiểu cho thành phần Progress bao gồm thuộc tính status
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  status: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, status, ...props }, ref) => {
  const statusColor = getStatusColor(status);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-8 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", statusColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-base">
        {status}
      </span>
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
