import { FullOffer } from "../../types";
import Filters from "./Filters";
import RowCard from "./RowCard";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getOffers } from "../../api";

const OffersList = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const { data: offers } = useQuery<FullOffer[]>("offers", () =>
    getOffers(
      startDate ?? new Date().toISOString().split("T")[0],
      1,
      endDate ?? undefined
    )
  );
  return (
    <div className="flex flex-col border-2 border-red-600 w-[40vw] max-w-[575px] h-[85vh] ml-20 mt-5">
      <Filters />
      <div className="overflow-auto mt-4">
        {(offers ?? []).map((offer: FullOffer) => (
          <RowCard key={offer.id} offer={offer} setSelectedOffer={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default OffersList;
