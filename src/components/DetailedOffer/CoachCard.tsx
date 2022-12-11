import { Avatar, Loader } from "@mantine/core";
import { useQuery } from "react-query";
import { getCoach } from "../../api";
import { Coach } from "../../types";

interface CoachCardProps {
  coachId?: number;
}

const CoachCard = ({ coachId }: CoachCardProps) => {
  const { isLoading, data: coach } = useQuery<Coach>(`coach ${coachId}`, () =>
    getCoach(coachId ?? 0)
  );

  return (
    <div className="bg-gray-200 rounded-lg min-h-[100px] mt-3 mx-3 flex justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row items-center space-x-4 px-3">
          <Avatar
            size="xl"
            src={coach?.user?.photo}
            alt="Coach"
            className="rounded-[3rem]"
          />
          <div className="flex space-x-2 ml-2 text-3xl items-center line-clamp-1">
            <span className="font-bold">Coach : </span>
            <span>{coach?.user?.name ?? "Inconnu"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachCard;
