import { Loader, Spoiler } from "@mantine/core";
import { useQuery } from "react-query";
import { getBookings } from "../../api";
import { BookingWithFullMember } from "../../types";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

interface BookingsListProps {
  bookingsIds: number[];
}

/**
 * Component that fetches the bookings of an offer (and the members of these bookings)
 * and displays them. If there are too many bookings, they are hidden behind a spoiler.
 * @param bookingsIds The IDs of the bookings to fetch
 * @returns The bookings list
 */
const BookingsList = ({ bookingsIds }: BookingsListProps) => {
  const { isLoading, data } = useQuery<BookingWithFullMember[]>(
    `bookings: ${bookingsIds.join(",")}`,
    () => getBookings(bookingsIds)
  );

  if (isLoading)
    return (
      <div className="flex flex-col">
        <p className="border-b-2 border-black">Réservations :</p>
        <Loader className="ml-5 mt-2" />
      </div>
    );

  return (
    <div className="flex flex-col w-[70%] xs:w-full">
      <p className="border-b-2 border-black">Réservations :</p>
      {!data || data.length === 0 ? (
        <p>Aucune réservation pour le moment !</p>
      ) : (
        <Spoiler
          hideLabel={
            <div className="text-black hover:underline decoration-black flex flex-row items-center">
              Réduire <IconChevronUp size={20} className="pb-[1px]" />
            </div>
          }
          maxHeight={100}
          showLabel={
            <div className="text-black hover:underline decoration-black flex flex-row items-center">
              Voir toutes les réservations{" "}
              <IconChevronDown size={20} className="pb-[1px]" />
            </div>
          }
        >
          <ul className="list-disc ml-5">
            {data.map((booking) => (
              <li key={booking.id}>{booking.member?.name}</li>
            ))}
          </ul>
        </Spoiler>
      )}
    </div>
  );
};

export default BookingsList;
