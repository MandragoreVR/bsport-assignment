import { Skeleton } from "@mantine/core";

const RowCardSkeleton = () => (
  <div
    className="h-[140px] grid grid-cols-2 grid-rows-1 gap-x-4 pl-2"
    style={{
      gridTemplateColumns: "2fr 5fr",
    }}
  >
    <Skeleton
      height="120px"
      width="120px"
      className="justify-self-center self-center rounded-lg"
    />
    <div className="flex flex-col self-center">
      <Skeleton height="20px" width={300} className="rounded-md mb-3" />
      <Skeleton height="20px" width={370} className="rounded-md mb-3" />
      <Skeleton height="20px" width={350} className="rounded-md mb-3" />
    </div>
  </div>
);

export default RowCardSkeleton;
