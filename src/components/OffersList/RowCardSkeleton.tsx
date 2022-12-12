import { Skeleton } from "@mantine/core";

/**
 * This component is a skeleton displayed in place of the RowCard component while the data is loading
 */
const RowCardSkeleton = () => (
  <div
    className="h-[140px] grid grid-cols-2 grid-rows-1 gap-x-4 pl-2"
    style={{
      gridTemplateColumns: "2fr 5fr",
    }}
  >
    <Skeleton
      className="justify-self-center self-center rounded-lg"
      height="120px"
      width="120px"
    />
    <div className="flex flex-col self-center">
      <Skeleton className="rounded-md mb-3" height="20px" width="60%" />
      <Skeleton className="rounded-md mb-3" height="20px" width="90%" />
      <Skeleton className="rounded-md mb-3" height="20px" width="80%" />
    </div>
  </div>
);

export default RowCardSkeleton;
