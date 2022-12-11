import { useState } from "react";
import DetailOffer from "./components/DetailedOffer/DetailOffer";
import Header from "./components/Header";
import OffersList from "./components/OffersList/OffersList";
import { FullOffer } from "./types";

function App() {
  const [selectedOffer, setSelectedOffer] = useState<FullOffer>();
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex flex-row">
        <OffersList
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
        />
        <DetailOffer offer={selectedOffer} />
      </div>
    </div>
  );
}

export default App;
