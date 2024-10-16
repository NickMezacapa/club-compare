import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

import { api } from '~/utils/api';
import { type Club } from '~/utils/constants'
import { useSelectedClubs } from '~/context/SelectedClubsContext'

import ClubSearchInput from './ClubSearchInput'
import ClubList from './ClubList'
import SelectedClubs from './SelectedClubs'

const ClubSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [throttledSearchTerm, setThrottledSearchTerm] = useState(searchTerm)
  const { selectedClubs, setSelectedClubs } = useSelectedClubs()

  const router = useRouter()

  const throttledUpdate = throttle((term: string) => {
    setThrottledSearchTerm(term)
  }, 300)

  const { data: clubs, isLoading } = api.club.searchClubs.useQuery(throttledSearchTerm, {
    enabled: throttledSearchTerm.length > 0,
    select: (data) => data as unknown as Club[],
  })

  const handleSelectClub = (club: Club) => {
    if (selectedClubs.length >= 2) return;
    setSelectedClubs((prev) => [...prev, club])
    setSearchTerm('')
  }

  const handleCompareClubs = async () => {
    if (selectedClubs.length === 2) {
        const [club1, club2] = selectedClubs
        const slug = `${club1?.name}-${club2?.name}`
        
        await router.push(`/compare/${slug}`)
    }
  }

  const showSearchSuggestions = clubs && clubs.length > 0 && selectedClubs.length < 2

  useEffect(() => {
    throttledUpdate(searchTerm);
  }, [searchTerm, throttledUpdate])

  return (
    <div className='border border-red-500'>
      <ClubSearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} numClubs={selectedClubs.length} />

      {isLoading && <p>Loading...</p>}

      {selectedClubs.length === 2 && (
      <button 
        className="mt-4 bg-blue-500 text-white p-2 rounded-md" 
        onClick={handleCompareClubs}
      >
        Compare Clubs
      </button>
    )}

      {showSearchSuggestions && (
        <ClubList clubs={clubs} onClubSelect={handleSelectClub} />
      )}
      
      {!isLoading && clubs?.length === 0 && <p>No clubs found</p>}
      {selectedClubs.length === 1 && (<p>Select one more club!</p>)}
      <SelectedClubs selectedClubs={selectedClubs} />
    </div>
  );
};

export default ClubSearch
