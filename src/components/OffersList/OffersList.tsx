import { FullOffer } from "../../types";
import Filters from "./Filters";
import RowCard from "./RowCard";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getOffers } from "../../api";
import RowCardSkeleton from "./RowCardSkeleton";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

interface OffersListProps {
  selectedOffer?: FullOffer;
  setSelectedOffer: (offer?: FullOffer) => void;
}

const OffersList = ({ selectedOffer, setSelectedOffer }: OffersListProps) => {
  // pageIndex is used to fetch more results
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [offers, setOffers] = useState<FullOffer[]>([]);

  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const { isLoading, data } = useQuery<{ results: FullOffer[]; count: number }>(
    `offers from ${startDate ?? ""} to ${endDate ?? ""}, page ${pageIndex}`,
    () =>
      getOffers(
        startDate && new Date(startDate) >= new Date()
          ? startDate
          : new Date().toISOString().split("T")[0],
        pageIndex,
        endDate && new Date(endDate) >= new Date() ? endDate : undefined
      )
  );

  useEffect(() => {
    // If pageIndex > 1, we are fetching more results so we must keep the previous ones
    if (data) {
      if (pageIndex === 1) setOffers(data.results);
      else setOffers((previousOffers) => [...previousOffers, ...data.results]);
    }
  }, [data, pageIndex]);

  return (
    <div className="flex flex-col border-2 bg-gray-50 w-[40vw] min-w-[575px] max-w-[575px] h-[85vh] mt-5">
      <Filters setPageIndex={setPageIndex} />
      {isLoading && pageIndex === 1 ? (
        <div className="mt-4">
          <RowCardSkeleton />
          <RowCardSkeleton />
          <RowCardSkeleton />
          <RowCardSkeleton />
        </div>
      ) : (
        <div className="overflow-auto mt-4">
          {offers.map((offer: FullOffer) => (
            <RowCard
              key={offer.id}
              offer={offer}
              selectedOfferId={selectedOffer?.id}
              setSelectedOffer={setSelectedOffer}
            />
          ))}
          {/* We use offers.length + 1 here because in the case where data is not defined, it means we are fetching
          more results, so we want to show the "Load more results" button. */}
          {(data?.count ?? offers.length + 1) > offers.length && (
            <div
              className="w-full bg-[#f1f1f1] hover:bg-[#dcdbdb] active:bg-[#cdcccc] flex justify-center items-center text-lg cursor-pointer h-[75px] mt-2 mr-4"
              onClick={() =>
                setPageIndex((previousPageIndex) => previousPageIndex + 1)
              }
              style={{ borderRadius: "0.5em 0.5em 0 0" }}
            >
              Charger plus de résultats
              {isLoading ? (
                <Loader size={20} className="ml-3 text-primary" />
              ) : (
                <IconChevronDown className="ml-2 h-7 w-7" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OffersList;
