import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

import { api } from '~/utils/api'; 
import { type Club } from '~/utils/constants';

import ClubSearchInput from './ClubSearchInput';
import ClubList from './ClubList';
import SelectedClubs from './SelectedClubs';

const ClubSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [throttledSearchTerm, setThrottledSearchTerm] = useState(searchTerm);
  const [selectedClubs, setSelectedClubs] = useState<Club[]>([]);

  const throttledUpdate = throttle((term: string) => {
    setThrottledSearchTerm(term);
  }, 300);

  const { data: clubs, isLoading } = api.club.searchClubs.useQuery(throttledSearchTerm, {
    enabled: throttledSearchTerm.length > 0,
    select: (data) => data as unknown as Club[],
  });

  const handleSelectClub = (club: Club) => {
    if (selectedClubs.length >= 2) return;
    setSelectedClubs((prev) => [...prev, club]);
    setSearchTerm('')
  };

  const showSearchSuggestions = clubs && clubs.length > 0 && selectedClubs.length < 2;

  useEffect(() => {
    throttledUpdate(searchTerm);
  }, [searchTerm, throttledUpdate]);

  return (
    <div className='border border-red-500'>
      <ClubSearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} numClubs={selectedClubs.length} />

      {isLoading && <p>Loading...</p>}

      {showSearchSuggestions && (
        <ClubList clubs={clubs} onClubSelect={handleSelectClub} />
      )}
      
      {!isLoading && clubs?.length === 0 && <p>No clubs found</p>}
      {selectedClubs.length === 1 && (<p>Select one more club!</p>)}
      <SelectedClubs selectedClubs={selectedClubs} />
    </div>
  );
};

export default ClubSearch;
