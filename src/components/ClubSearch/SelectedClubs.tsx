import Image from 'next/image';
import { type Club } from '~/utils/constants';
import { useSelectedClubs } from '~/context/SelectedClubsContext';

interface SelectedClubsProps {
  selectedClubs: Club[];
}

const SelectedClubs = ({ selectedClubs }: SelectedClubsProps) => {
  const { setSelectedClubs } = useSelectedClubs();
  
  const handleClearClub = (clubToClear: Club) => {
    setSelectedClubs((prev) => prev.filter(club => `${club.name}${club.specs.year}` !== `${clubToClear.name}${clubToClear.specs.year}`));
  };

  return (
    <>
      {selectedClubs.map((club) => {
        const { brand, name, specs } = club;
        const year = specs?.year ?? 'N/A';
        const imgSrc = specs?.img_src;

        return (
          <div key={club.name} className="mt-4 border border-gray-300 p-2">
            <div>
            <h2>{brand.name} - {name}</h2>
            <p>Year: {year}</p>
            {imgSrc && (
              <Image
                src={imgSrc}
                alt={`${brand.name} ${name}`}
                width={200}
                height={200}
                className="w-full h-auto"
              />
            )}
            </div>
            <button onClick={() => handleClearClub(club)} className="text-red-500">
              Clear
            </button>
          </div>
        );
      })}
    </>
  );
};

export default SelectedClubs;
