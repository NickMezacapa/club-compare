import Head from "next/head"

import { useUserContext } from '~/context/UserContext'
import ClubSearch from '~/components/ClubSearch'
import Navbar from '~/components/Navbar'

export default function Home() {
  const { handicap, areaOfImprovement, setHandicap, setAreaOfImprovement } = useUserContext()

  return (
    <>
      <Head>
        <title>Golf Club Comparison Tool</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex relative min-h-screen flex-col items-center bg-[#ffffff] text-[#2e2e2e]">
        <Navbar />
        <div className="relative z-10 container flex flex-col gap-6 px-4 py-16 max-w-5xl">
          <h1 className="text-6xl font-bold tracking-tight">
            HEAD-TO-HEAD COMPARISON
          </h1>
          <p>Pick two options to compare head-to-head. We’ll show the stats from our testing side by side for you to see which one ranks highest on the aspects that matter to you most. May the best club win.</p>
        </div>

        <section className="relative z-10 container flex justify-evenly flex-col sm:flex-row border mt-[-2rem] sm:mt-0 border-blue-500 max-w-5xl">
          <div className='border border-[hsla(0, 0%, 59.2%, 0.3)] w-[65%] mx-auto sm:mx-0 p-4 h-1/2 rounded-lg bg-gray-200 shadow-md max-w-sm'>
            <h2 className="text-2xl font-bold mb-4">Enter Your Details <span className='font-thin'>(optional)</span></h2>
            <label className="flex flex-col mb-4 border border-[hsla(0, 0%, 59.2%, 0.3)] text-gray-600">
            <span className="mb-1">Approximate handicap:</span>
            <input
              type="text"
              value={handicap}
              onChange={(e) => setHandicap(e.target.value)}
              className="p-2 border rounded-lg"
            />
          </label>

          <label className="flex flex-col mt-6 mb-5 border border-[hsla(0, 0%, 59.2%, 0.3)] text-gray-600">
            <span className="mb-1">What area of your game do you want to improve?</span>
            <input
              type="text"
              value={areaOfImprovement}
              onChange={(e) => setAreaOfImprovement(e.target.value)}
              className="p-2 border rounded-lg"
            />
          </label>
        </div>
        <div className='flex flex-col'>
          <h1 className="text-2xl font-bold mt-8 sm:mt-0 mb-4">Search for Golf Clubs</h1>
          <ClubSearch />
        </div>
        </section>
      </main>
    </>
  )
}
