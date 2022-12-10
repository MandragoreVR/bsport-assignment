import "dayjs/locale/fr";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";
import { useSearchParams } from "react-router-dom";

interface DateFilterProps {
  setPageIndex: (pageIndex: number) => void;
}

const DateFilter = ({ setPageIndex }: DateFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const onStartDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(12); // to prevent time zone issues
      searchParams.set("startDate", date.toISOString().split("T")[0]);
      if (endDate && date > new Date(endDate)) {
        searchParams.delete("endDate");
      }
      setSearchParams(searchParams, { replace: true });
      setPageIndex(1);
    }
  };

  const onEndDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(12); // to prevent time zone issues
      console.log("the formatted date", date.toISOString().split("T")[0]);

      searchParams.set("endDate", date.toISOString().split("T")[0]);
      if (startDate && date < new Date(startDate)) {
        searchParams.set("startDate", date.toISOString().split("T")[0]);
      }
    } else {
      searchParams.delete("endDate");
    }
    setSearchParams(searchParams, { replace: true });
    setPageIndex(1);
  };

  return (
    <div className="flex flex-row space-x-3 justify-center px-3">
      <DatePicker
        className="min-w-[250px] max-w-[250px]"
        clearable={false}
        dropdownType="popover"
        icon={<IconCalendar size={20} />}
        label="À partir du :"
        labelProps={{ className: "pl-4" }}
        locale="fr"
        minDate={new Date()}
        onChange={onStartDateChange}
        radius="md"
        size="lg"
        value={startDate ? new Date(startDate) : new Date()}
      />
      <DatePicker
        className="min-w-[250px] max-w-[250px]"
        dropdownType="popover"
        icon={<IconCalendar size={20} />}
        label="Jusqu'au :"
        labelProps={{ className: "pl-4" }}
        locale="fr"
        placeholder="Sélectionnez une date"
        minDate={new Date()}
        onChange={onEndDateChange}
        radius="md"
        size="lg"
        value={endDate ? new Date(endDate) : null}
      />
    </div>
  );
};

export default DateFilter;