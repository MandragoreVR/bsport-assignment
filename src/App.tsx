import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import DetailOffer from "./components/DetailedOffer/DetailOffer";
import Header from "./components/Header";
import OffersList from "./components/OffersList/OffersList";
import { FullOffer } from "./types";

function App() {
  const [selectedOffer, setSelectedOffer] = useState<FullOffer>();
  const useModal = useMediaQuery("(max-width: 1280px)");
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex flex-row">
        <OffersList
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
        />
        {!useModal ? (
          <DetailOffer
            offer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
          />
        ) : (
          <Modal
            fullScreen
            onClose={() => setSelectedOffer(undefined)}
            opened={!!selectedOffer}
            padding={0}
            withCloseButton={false}
          >
            <DetailOffer
              offer={selectedOffer}
              setSelectedOffer={setSelectedOffer}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
