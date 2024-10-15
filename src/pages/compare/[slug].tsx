import { useRouter } from 'next/router';
import { useFetchClub } from '~/hooks/useFetchClub';

import ClubDetails from '~/components/ClubCompare/ClubDetails';

const ComparePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Split the slug to get the club names
  const [club1name, club2name] = (slug as string).split('-');

  // Fetch club details based on the names
  const { data: club1, isLoading: loadingClub1 } = useFetchClub(club1name!);
  const { data: club2, isLoading: loadingClub2 } = useFetchClub(club2name!);

  if (loadingClub1 || loadingClub2) return <p>Loading clubs...</p>;
  if (!club1 || !club2) return <p>Clubs not found.</p>;

  return (
    <div className="flex space-x-4 p-4">
      <ClubDetails club={club1} />
      <ClubDetails club={club2} />
    </div>
  );
};

export default ComparePage;
