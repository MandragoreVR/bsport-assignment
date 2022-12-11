import { useMediaQuery } from "@mantine/hooks";
import { FullOffer } from "../../types";
import getDurationStringFromLengthInMinutes from "../../utils/getDurationStringFromLengthInMinutes";
import getFrenchDateFromISO from "../../utils/getFrenchDateFromISO";
import getFrenchTimeFromISO from "../../utils/getFrenchTimeFromISO";

interface RowCardProps {
  offer: FullOffer;
  selectedOfferId?: number;
  setSelectedOffer: (offer?: FullOffer) => void;
}

/**
 * This component is the row card used to display the offers list.
 * @param offer The offer to display
 * @param selectedOfferId The ID of the selected offer (to highlight the offer if it is selected)
 * @param setSelectedOffer The function to set the selected offer
 * @returns The row card
 */
const RowCard = ({
  offer,
  selectedOfferId,
  setSelectedOffer,
}: RowCardProps) => {
  const photoURL = offer.meta_activity?.cover_main ?? "default-sport.jpg";
  const isWidthXs = useMediaQuery("(max-width: 640px)");
  return (
    <div
      className={`pr-1 pl-2 py-2 h-[140px] cursor-pointer grid grid-cols-2 grid-rows-1 gap-x-4 hover:bg-[#f1f1f1] rounded-lg ${
        selectedOfferId === offer.id ? "bg-[#f1f1f1]" : ""
      } active:bg-[#e1e1e1]`}
      style={{
        gridTemplateColumns: "2fr 5fr",
      }}
      onClick={() => setSelectedOffer(offer)}
    >
      <div className="w-full justify-center flex min-w-[160px] sm:min-w-0">
        <img
          className="max-h-[130px]"
          src={photoURL}
          alt={offer.meta_activity?.alt_cover_main ?? "Photo de l'offre"}
        />
      </div>
      <div className="self-center pr-3">
        <p className="font-medium text-2xl line-clamp-1 mb-1">
          <span>{offer.meta_activity?.name}</span>
        </p>
        <p className="text-lg line-clamp-2 xs:line-clamp-1 mb-1">
          <span>
            {!isWidthXs
              ? getFrenchDateFromISO(offer.date_start)
              : new Date(offer.date_start).toLocaleDateString("fr-FR")}{" "}
            - {getFrenchTimeFromISO(offer.date_start)} (
            {getDurationStringFromLengthInMinutes(offer.duration_minute)})
          </span>
        </p>
        {!isWidthXs && (
          <p className="font-medium text-base line-clamp-1 mb-1">
            <span>{offer.establishment?.location.address}</span>
          </p>
        )}
        {offer.available && !offer.full ? (
          <span className="flex justify-end font-semibold text-xs text-green-600 flex-grow">
            Places disponibles
          </span>
        ) : (
          <span className="flex justify-end font-semibold text-xs text-red-600 flex-grow">
            Places indisponibles
          </span>
        )}
      </div>
    </div>
  );
};
export default RowCard;
