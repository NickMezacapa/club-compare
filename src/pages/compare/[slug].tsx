import { useRouter } from 'next/router';
import { useUserContext } from '~/context/UserContext';
import { useFetchClub } from '~/hooks/useFetchClub';

import ClubDetails from '~/components/ClubCompare/ClubDetails';

const ComparePage = () => {
  const router = useRouter();
  let { slug } = router.query;

  if (!slug) slug = ''

  // Extract user handicap and wanted area of improvement from context
  const { handicap, areaOfImprovement } = useUserContext()

  // Split the slug to get the club names
  const [club1name, club2name] = (slug as string).split('-');

  // Fetch club details based on the names
  const { data: club1, isLoading: loadingClub1 } = useFetchClub(club1name!);
  const { data: club2, isLoading: loadingClub2 } = useFetchClub(club2name!);

  if (loadingClub1 || loadingClub2) return <p>Loading clubs...</p>;
  if (!club1 || !club2) return <p>Clubs not found.</p>;

  return (
    <section className="flex flex-col items-center space-x-4 p-4">
      <div className='h-auto mx-auto text-center'>
        <h2>
          <span className='font-semibold text-blue-500'>Your Handicap:</span> {handicap || 'N/A'}
        </h2>
        <h2>
          <span className='font-semibold text-blue-500'>Area of Improvement:</span> {areaOfImprovement || 'N/A'}
        </h2>
      </div>
      <section className='flex p-4 space-x-4 max-w-5xl mx-auto'>
        <ClubDetails club={club1} />
        <ClubDetails club={club2} />
      </section>
    </section>
  );
};

export default ComparePage;
 