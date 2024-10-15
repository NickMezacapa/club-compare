/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { api } from '~/utils/api';  // adjust path as necessary
import throttle from 'lodash.throttle';

const ClubSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [throttledSearchTerm, setThrottledSearchTerm] = useState(searchTerm);

    // Throttle the search term to limit request frequency
    const throttledUpdate = throttle((term: string) => {
      setThrottledSearchTerm(term);
    }, 300);

    useEffect(() => {
      throttledUpdate(searchTerm);
    }, [searchTerm, throttledUpdate]);

    const { data: clubs, isLoading } = api.club.searchClubs.useQuery(throttledSearchTerm, {
      enabled: throttledSearchTerm.length > 0,
    });

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

        {clubs && clubs.length > 0 && (
          <ul className="mt-4">
            {clubs.map((club) => {
              return (
                <li key={club.name} className="border-b py-2">
                {club.brand.name} - {club.name} (
                  {/* @ts-ignore */}
                  {club.specs?.year ?? 'no year'}
                )
              </li>
            )})}
          </ul>
        )}
        {!isLoading && clubs?.length === 0 && <p>No clubs found</p>}
      </div>
    );
};

export default ClubSearch;
