/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import throttle from 'lodash.throttle';

import { api } from '~/utils/api'; // adjust path as necessary
import { type Club } from '~/utils/constants';

const ClubSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [throttledSearchTerm, setThrottledSearchTerm] = useState(searchTerm);
  const [selectedClubs, setSelectedClubs] = useState<Club[]>([]);

  const throttledUpdate = throttle((term: string) => {
      setThrottledSearchTerm(term);
  }, 300);

  useEffect(() => {
      throttledUpdate(searchTerm);
  }, [searchTerm, throttledUpdate]);

  const { data: clubs, isLoading } = api.club.searchClubs.useQuery(throttledSearchTerm, {
      enabled: throttledSearchTerm.length > 0,
      select: (data) => data as unknown as Club[], 
  });

  const handleSelectClub = (club: Club) => {
      if (selectedClubs.length >= 2) return;

      setSelectedClubs((prev) => {
          const newClubs = [...prev, club];
          // Clear the search input if two clubs are selected
          if (newClubs.length === 2) setSearchTerm(""); // Clear the input field
          return newClubs;
      });
  };

  const showSearchSuggestions = clubs && clubs.length > 0 && selectedClubs.length < 2

  return (
      <div className='border border-red-500'>
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a club..."
              className="border p-2 rounded-md"
          />
          {isLoading && <p>Loading...</p>}

          {showSearchSuggestions && ( // Show clubs only if less than 2 are selected
              <ul className="mt-4">
                  {clubs.map((club) => (
                      <li key={club.name} className="border-b py-2">
                          <button onClick={() => handleSelectClub(club)}>
                              {club.brand.name} - {club.name} (
                              {/* @ts-ignore */} {/* year will always be present */}
                              {club.specs?.year ?? 'no year'}
                              )
                          </button>
                      </li>
                  ))}
              </ul>
          )}
          {!isLoading && clubs?.length === 0 && <p>No clubs found</p>}

          {selectedClubs.map((club) => {
              const { brand, name, specs } = club; // Destructure properties
              const year = specs?.year ?? 'N/A'; // Access year property
              const imgSrc = specs?.img_src; // Access img_src property

              return (
                  <div key={club.name} className="mt-4 border border-gray-300 p-2">
                      <h2>{brand.name} - {name}</h2>
                      <p>Year: {year}</p>
                      {imgSrc && (
                        <Image 
                        src={imgSrc} 
                        alt={`${brand.name} ${name}`} 
                        width={200} // Adjust width as needed
                        height={200} // Use a fixed height or define auto based on aspect ratio
                        className="w-full h-auto"
                    />
                      )} 
                  </div>
              );
          })}
      </div>
  );
};
export default ClubSearch;
