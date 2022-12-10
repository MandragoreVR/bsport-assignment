interface DetailCardHeaderProps {
  offerName?: string;
  offerPicture?: string;
  offerPictureAlt?: string;
}

const DetailCardHeader = ({
  offerName,
  offerPicture,
  offerPictureAlt,
}: DetailCardHeaderProps) => {
  const photoURL = offerPicture ?? "default_sport.jpg";
  return (
    <div className="aspect-[2] min-h-[350px] w-full text-white relative group flex flex-col justify-end p-4 overflow-hidden">
      {/* Gradient on the picture */}
      <div className="w-full h-1/3 z-10 absolute bottom-0 left-0 bg-gradient-to-t from-[#2e2e2efc] to-[#00000000] opacity-100 group-hover:opacity-50"></div>

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
