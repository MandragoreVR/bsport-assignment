import DateFilter from "./DateFilter";
import React from "react";

interface FilterProps {
  setPageIndex: (pageIndex: number) => void;
}

/**
 * The component that groups all the filters. For now, there is only one filter, but this aims at wrapping the filters
 * in case there are more in the future.
 * @param setPageIndex The function to set the page index to 1 when a filter changes
 * @returns The filters
 */
const Filters = ({ setPageIndex }: FilterProps) => {
  return (
    <div className="pt-3">
      <DateFilter setPageIndex={setPageIndex} />
    </div>
  );
};

export default Filters;
