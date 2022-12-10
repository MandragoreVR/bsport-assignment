import { FullOffer } from "../../types";
import DetailCardHeader from "./DetailCardHeader";

interface DetailOfferProps {
  offer?: FullOffer;
}

const DetailOffer = ({ offer }: DetailOfferProps) => {
  if (!offer) return null;
  return (
    <div className="flex flex-col border-2 w-[40vw] h-[85vh] mt-5">
      <DetailCardHeader
        offerName={offer.meta_activity?.name}
        offerPicture={offer.meta_activity?.cover_main}
        offerPictureAlt={offer.meta_activity?.alt_cover_main}
      />
    </div>
  );
};

export default DetailOffer;
