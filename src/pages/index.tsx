import Head from "next/head";

import { useUserContext } from '~/context/UserContext';
import ClubSearch from '~/components/ClubSearch';

export default function Home() {
  const { handicap, areaOfImprovement, setHandicap, setAreaOfImprovement } = useUserContext()

  return (
    <>
      <Head>
        <title>Golf Club Comparison Tool</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-[#1d1d1f]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Compare <span className="text-[hsl(228,100%,70%)]">Golf</span> Clubs
          </h1>
        </div>

        <div className="container mx-auto mt-8 flex items-center flex-col">
          <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>

          <input
            type="text"
            value={handicap}
            onChange={(e) => setHandicap(e.target.value)}
            placeholder="Enter your approximate handicap (optional)"
            className="p-2 border mb-4"
          />

          <input
            type="text"
            value={areaOfImprovement}
            onChange={(e) => setAreaOfImprovement(e.target.value)}
            placeholder="What area of your game do you want to improve? (optional)"
            className="p-2 border mb-4"
          />

          <h1 className="text-2xl font-bold mb-4">Search for Golf Clubs</h1>
          <ClubSearch />
        </div>
      </main>
    </>
  );
}
