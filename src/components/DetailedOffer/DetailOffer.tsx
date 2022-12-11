import { FullOffer } from "../../types";
import getDurationStringFromLengthInMinutes from "../../utils/getDurationStringFromLengthInMinutes";
import getFrenchDateFromISO from "../../utils/getFrenchDateFromISO";
import getFrenchTimeFromISO from "../../utils/getFrenchTimeFromISO";
import BookingsList from "./BookingsList";
import CoachCard from "./CoachCard";
import DetailCardHeader from "./DetailCardHeader";
import LeafletMap from "./Map/LeafletMap";

interface DetailOfferProps {
  offer?: FullOffer;
}

const DetailOffer = ({ offer }: DetailOfferProps) => {
  if (!offer) return null;
  return (
    <div className="flex flex-col border-2 w-[40vw] h-[85vh] mt-5 overflow-auto pb-4">
      <DetailCardHeader
        offerName={offer.meta_activity?.name}
        offerPicture={offer.meta_activity?.cover_main}
        offerPictureAlt={offer.meta_activity?.alt_cover_main}
      />
      <CoachCard coachId={offer.coach} />
      <div className="mt-3 mx-3">
        <div className="float-right flex flex-col ml-5 mb-3 space-y-3">
          <img
            src={offer.establishment?.cover ?? "gym-default.jpg"}
            alt="Establishment"
            className="h-[200px]"
          />
          <BookingsList bookingsIds={offer.bookings ?? []} />
        </div>
        <p className="text-justify">
          <span className="font-bold">Description de l'activité : </span>
          {offer.meta_activity?.description}
        </p>
        <p>
          <span className="font-bold">Date : </span>
          {getFrenchDateFromISO(offer.date_start)}, à{" "}
          {getFrenchTimeFromISO(offer.date_start)}
        </p>
        <p>
          <span className="font-bold">Durée : </span>
          {getDurationStringFromLengthInMinutes(offer.duration_minute)}
        </p>
        <p>
          <span className="font-bold">Niveau : </span>
          {offer.custom_level ?? offer.level ?? "Niveau inconnu"}
        </p>
        <p>
            <span className="font-bold">Adresse : </span>
            {offer.establishment?.location.address}
        </p>
        {offer.establishment?.location.latitude &&
          offer.establishment?.location.longitude && (
            <LeafletMap
              establishmentLatitude={offer.establishment?.location.latitude}
              establishmentLongitude={offer.establishment?.location.longitude}
            />
          )}
      </div>
    </div>
  );
};

export default DetailOffer;
