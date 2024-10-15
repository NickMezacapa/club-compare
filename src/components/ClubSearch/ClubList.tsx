// components/ClubList.tsx
import { type Club } from '~/utils/constants';

interface ClubListProps {
  clubs: Club[];
  onClubSelect: (club: Club) => void;
}

const ClubList = ({ clubs, onClubSelect }: ClubListProps) => {
  return (
    <ul className="mt-4">
      {clubs.map((club) => (
        <li key={club.name} className="border-b py-2">
          <button onClick={() => onClubSelect(club)}>
            {club.brand.name} - {club.name} ({club.specs?.year ?? 'no year'})
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ClubList;
