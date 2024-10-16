import Image from 'next/image';
import { type Club } from '~/utils/constants'; // Import the Club type
import { type ClubSpecs } from '~/utils/constants'; // Import the Club type

interface ClubDetailsProps {
  club: Club;
}

const ClubDetails: React.FC<ClubDetailsProps> = ({ club }) => {
  const { brand, name, specs } = club;

  if (!specs || typeof specs !== 'object') {
    return <p>No specifications available</p>;
  }

  const imgSrc = specs?.img_src;

  const specLabels: { [key in keyof ClubSpecs]: string } = {
    year: 'Year',
    category: 'Category',
    head_weight: 'Head Weight',
    c_dimmension: '"C" Dimension',
    basic_vcog: 'Basic VCOG',
    moi: 'MOI',
    actual_rcog: 'Actual RCOG',
    loft: 'Loft',
    vcog_adjst: 'VCOG Adjustment',
    actual_vcog: 'Actual VCOG',
    vcog_cf: 'VCOG CF',
    moi_cf: 'MOI CF',
    calc_points: 'Calculated Points',
    mpf: 'MPF',
  };

  return (
    <div className="w-1/2 border border-gray-300 p-4">
      <h2>{brand.name} - {name}</h2>
      {/* Render other club specs here */}
      {imgSrc && (
        <Image 
          src={imgSrc} 
          alt={`${brand.name} ${name}`} 
          width={200} 
          height={200} 
          className="w-full h-auto"
        />
      )}

      {Object.keys(specLabels).map((key) => (
        <p key={key}>
          <span className='font-semibold'>{specLabels[key as keyof ClubSpecs]}</span>: {specs[key as keyof ClubSpecs] ?? 'N/A'}
        </p>
      ))}
    </div>
  );
};

export default ClubDetails;
