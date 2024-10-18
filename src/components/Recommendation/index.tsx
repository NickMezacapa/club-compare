interface ClubRecType {
    recommendation?: string | null
}

const ClubRecommendation = ({ recommendation }: ClubRecType) => {
  return (
    <section>
    {recommendation && (
      <div className="mt-4 p-4 border border-gray-300">
        <h3 className="font-semibold">Expert Recommendation:</h3>
        <p>{recommendation}</p>
      </div>
    )}
    </section>
  )
}

export default ClubRecommendation
