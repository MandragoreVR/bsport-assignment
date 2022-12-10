import DateFilter from "./DateFilter";

interface FilterProps {
  setPageIndex: (pageIndex: number) => void;
}

const Filters = ({ setPageIndex }: FilterProps) => {
  return (
    <div className="pt-3">
      <DateFilter setPageIndex={setPageIndex} />
    </div>
  );
};

export default Filters;
