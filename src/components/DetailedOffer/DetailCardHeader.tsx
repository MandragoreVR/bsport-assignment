interface DetailCardHeaderProps {
  offerName?: string;
  offerPicture?: string;
  offerPictureAlt?: string;
}

/**
 * This component is the header of the DetailedOffer page.
 * It displays the name of the offer and its picture with a gradient.
 * @param offerName The name of the offer
 * @param offerPicture The picture of the offer
 * @param offerPictureAlt The alt text of the picture
 * @returns The header of the DetailedOffer page
 */
const DetailCardHeader = ({
  offerName,
  offerPicture,
  offerPictureAlt,
}: DetailCardHeaderProps) => {
  const photoURL = offerPicture ?? "default-sport.jpg";
  return (
    <div className="aspect-[2] min-h-[350px] w-full text-white relative group flex flex-col justify-end p-4 overflow-hidden">
      {/* Gradient on the picture */}
      <div className="w-full h-1/3 z-10 absolute bottom-0 left-0 bg-gradient-to-t from-[#2e2e2efc] to-[#00000000] opacity-100 group-hover:opacity-50 transition duration-200"></div>

      <div className="absolute top-0 left-0 z-0 flex w-full h-full justify-center">
        <img src={photoURL} alt={offerPictureAlt} />
      </div>

      <div className="capitalize absolute z-50 text-4xl font-extrabold">
        {offerName}
      </div>
    </div>
  );
};

export default DetailCardHeader;
