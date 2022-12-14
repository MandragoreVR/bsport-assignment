import axios from "axios";
import { authenticationToken, apiURL, companyId, pageSize } from "./consts";
import {
  Booking,
  BookingWithFullMember,
  BSportApiResponse,
  Coach,
  Establishment,
  FullOffer,
  Member,
  MetaActivity,
  Offer,
} from "./types";

const apiInstance = axios.create({
  headers: { Authorization: `Token ${authenticationToken}` },
});

// ******* Retrieval of the offers *******

/**
 * This function fetches the required meta activities from the API.
 * @param metaActivitiesIds - The ids of the meta activities to fetch.
 * @returns The meta activities.
 */
const getMetaActivities = async (
  metaActivitiesIds: Set<number>
): Promise<MetaActivity[]> => {
  if (metaActivitiesIds.size === 0) return [];
  const response = await apiInstance.get<BSportApiResponse<MetaActivity>>(
    `${apiURL}/meta-activity?company=${companyId}&id__in=${Array.from(
      metaActivitiesIds
    ).join(",")}`
  );
  return response.data.results;
};

/**
 * This function fetches the required establishments from the API.
 * @param establishmentsIds - The ids of the establishments to fetch.
 * @returns The establishments.
 */
const getEstablishments = async (
  establishmentsIds: Set<number>
): Promise<Establishment[]> => {
  if (establishmentsIds.size === 0) return [];
  const response = await apiInstance.get<BSportApiResponse<Establishment>>(
    `${apiURL}/establishment?company=${companyId}&id__in=${Array.from(
      establishmentsIds
    ).join(",")}`
  );
  return response.data.results;
};

/**
 * This function fetches the offers from the API.
 * @param fromDate - The date from which to fetch the offers.
 * @param pageIndex - The index of the page to fetch.
 * @param toDate - The date until which to fetch the offers.
 * @returns The offers (with the full meta activites and establishments objects)
 * and the total number of offers.
 */
export const getOffers = async (
  fromDate: string,
  pageIndex: number,
  toDate?: string
): Promise<{ results: FullOffer[]; count: number }> => {
  const params = new URLSearchParams();
  params.set("company", companyId.toString());
  params.set("min_date", fromDate);
  if (toDate) params.set("max_date", toDate);
  params.set("ordering", "date_start");
  params.set("page_size", pageSize.toString());
  params.set("page", pageIndex.toString());
  const response = await apiInstance.get<BSportApiResponse<Offer>>(
    `${apiURL}/offer?${params.toString()}`
  );
  const { results, count } = response.data;

  // Fetch meta activities
  const metaActivitiesIds = results.reduce<Set<number>>(
    (previous: Set<number>, offer: Offer): Set<number> => {
      if (offer.meta_activity) previous.add(offer.meta_activity);
      return previous;
    },
    new Set()
  );
  const metaActivities = await getMetaActivities(metaActivitiesIds);

  // Fetch establishments
  const establishmentsIds = results.reduce<Set<number>>(
    (previous: Set<number>, offer: Offer): Set<number> => {
      if (offer.establishment_override)
        previous.add(offer.establishment_override);
      else if (offer.establishment) previous.add(offer.establishment);
      return previous;
    },
    new Set()
  );
  const establishments = await getEstablishments(establishmentsIds);

  // Enrich offers with all the data
  const enrichedOffers: FullOffer[] = results.map((offer): FullOffer => {
    const metaActivity = metaActivities.find(
      (metaActivity) => metaActivity.id === offer.meta_activity
    );
    const establishment = establishments.find(
      (establishment) =>
        (offer.establishment_override &&
          establishment.id === offer.establishment_override) ||
        establishment.id === offer.establishment
    );
    return { ...offer, meta_activity: metaActivity, establishment };
  });

  return { results: enrichedOffers, count };
};

// ******* Retrieval of the bookings *******

/**
 * This function fetches the required members from the API.
 * @param membersIds - The ids of the members to fetch.
 * @returns The members.
 */
const getMembers = async (membersIds: Set<number>): Promise<Member[]> => {
  if (membersIds.size === 0) return [];
  const response = await apiInstance.get<BSportApiResponse<Member>>(
    `${apiURL}/member?company=${companyId}&id__in=${Array.from(membersIds).join(
      ","
    )}`
  );
  return response.data.results;
};

/**
 * This function fetches the required bookings from the API.
 * @param bookingIds  - The ids of the bookings to fetch.
 * @returns The bookings (with the full member object).
 */
export const getBookings = async (
  bookingIds: number[]
): Promise<BookingWithFullMember[]> => {
  if (bookingIds.length === 0) return [];
  const response = await apiInstance.get<BSportApiResponse<Booking>>(
    `${apiURL}/booking?id__in=${bookingIds.join(",")}`
  );
  const { results } = response.data;

  // Fetch members
  const membersIds = results.reduce<Set<number>>(
    (previous: Set<number>, booking: Booking): Set<number> => {
      if (booking.member) previous.add(booking.member);
      return previous;
    },
    new Set()
  );
  const members = await getMembers(membersIds);

  // Enrich bookings with all the data
  const enrichedBookings: BookingWithFullMember[] = results.map(
    (booking): BookingWithFullMember => {
      const member = members.find((member) => member.id === booking.member);
      return { ...booking, member };
    }
  );

  return enrichedBookings;
};

// ******* Retrieval of one coach *******

/**
 * This function fetches the required coach from the API.
 * @param coachId - The id of the coach to fetch.
 * @returns The coach.
 */
export const getCoach = async (coachId: number): Promise<Coach> => {
  const response = await apiInstance.get<BSportApiResponse<Coach>>(
    `${apiURL}/coach?company=${companyId}&id__in=${coachId}`
  );
  return response.data.results[0];
};
