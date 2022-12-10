import { FullOffer } from "../../types";
import getDurationStringFromLengthInMinutes from "../../utils/getDurationStringFromLengthInMinutes";
import getFrenchDateFromISO from "../../utils/getFrenchDateFromISO";
import getFrenchTimeFromISO from "../../utils/getFrenchTimeFromISO";

interface RowCardProps {
  offer: FullOffer;
  selectedOfferId?: number;
  setSelectedOffer: (offer?: FullOffer) => void;
}

const RowCard = ({
  offer,
  selectedOfferId,
  setSelectedOffer,
}: RowCardProps) => {
  const photoURL = offer.meta_activity?.cover_main ?? "default_sport.jpg";
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
      <div className="w-full justify-center flex">
        <img
          className="max-h-[130px]"
          src={photoURL}
          alt={offer.meta_activity?.alt_cover_main ?? "Photo de l'offre"}
        />
      </div>
      <div className="self-center pr-3">
        <p className="font-medium text-2xl line-clamp-1 mb-1">
          <div>{offer.meta_activity?.name}</div>
        </p>
        <p className="text-lg line-clamp-1 mb-1">
          <div>
            {getFrenchDateFromISO(offer.date_start)} -{" "}
            {getFrenchTimeFromISO(offer.date_start)} (
            {getDurationStringFromLengthInMinutes(offer.duration_minute)})
          </div>
        </p>
        <p className="font-medium text-base line-clamp-1 mb-1">
          <div>{offer.establishment?.location.address}</div>
        </p>
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
