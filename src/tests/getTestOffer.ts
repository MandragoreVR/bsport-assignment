import { FullOffer } from "../types";

interface TestOfferProps {
  available?: boolean;
  date_start?: string;
  description?: string;
  establishmentName?: string;
  establishmentAddress?: string;
  id?: number;
  metaActivityName?: string;
}

const getTestOffer = ({
  available = true,
  date_start = "2022-12-25T00:00:00Z",
  description = "Test Description",
  establishmentName = "Test Establishment",
  establishmentAddress = "Test Address",
  id = 123,
  metaActivityName = "Test Meta Activity",
}: TestOfferProps): FullOffer => ({
  activity: 123,
  available,
  bookings: [],
  coach: 123,
  company: 6,
  custom_level: 1,
  date_start,
  duration_minute: 60,
  establishment: {
    title: establishmentName,
    location: { geometry: "", address: establishmentAddress },
  },
  full: false,
  id,
  level: 1,
  meta_activity: {
    custom_restriction_rule: [],
    description,
    id: 123,
    name: metaActivityName,
    SCT: 1,
  },
  group: 1,
});

export default getTestOffer;
