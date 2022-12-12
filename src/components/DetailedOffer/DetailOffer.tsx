import { FullOffer } from "../../types";
import getDurationStringFromLengthInMinutes from "../../utils/getDurationStringFromLengthInMinutes";
import getFrenchDateFromISO from "../../utils/getFrenchDateFromISO";
import getFrenchTimeFromISO from "../../utils/getFrenchTimeFromISO";
import BookingsList from "./BookingsList";
import CoachCard from "./CoachCard";
import DetailCardHeader from "./DetailCardHeader";
import LeafletMap from "./LeafletMap";
import { IconX } from "@tabler/icons";
import React from "react";

interface DetailOfferProps {
  offer?: FullOffer;
  setSelectedOffer: (offer?: FullOffer) => void;
}

/**
 * This component is the main component of the DetailedOffer panel.
 * It displays all the useful information about the selected offer.
 * @param offer The offer to display
 * @param setSelectedOffer The function to call with "undefined" to close the DetailedOffer panel
 * @returns The DetailedOffer panel when a selected offer is provided, null otherwise
 */
const DetailOffer = ({ offer, setSelectedOffer }: DetailOfferProps) => {
  if (!offer) return null;
  return (
    <div className="flex flex-col border-0 w-full h-full mt-0 xl:border-2 xl:w-[40vw] xl:h-[85vh] xl:mt-5 overflow-auto pb-4">
      <DetailCardHeader
        offerName={offer.meta_activity?.name}
        offerPicture={offer.meta_activity?.cover_main}
        offerPictureAlt={offer.meta_activity?.alt_cover_main}
      />
      {/* Close icon */}
      <div
        onClick={() => setSelectedOffer(undefined)}
        className="transition bg-[#00000033] hover:bg-[#ddd1] cursor-pointer rounded-full p-1 absolute top-3 right-3 xl:hidden"
      >
        <IconX size={20} stroke={1.5} />
      </div>
      <CoachCard coachId={offer.coach} />
      <div className="mt-3 mx-3">
        <div className="xs:float-right flex flex-col ml-5 mb-3 space-y-3 items-center">
          <img
            src={offer.establishment?.cover ?? "gym-default.jpg"}
            alt="Establishment"
            className="h-[200px]"
          />
          <BookingsList bookingsIds={offer.bookings ?? []} />
        </div>
        <p className="text-justify">
          <span className="font-bold">Description de l&apos;activité : </span>
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
