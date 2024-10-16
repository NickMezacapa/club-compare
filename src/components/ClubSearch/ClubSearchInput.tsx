interface ClubSearchInputProps {
    searchTerm: string
    onSearchChange: (term: string) => void
    numClubs: number
  }
  
  const ClubSearchInput = ({ searchTerm, onSearchChange, numClubs }: ClubSearchInputProps) => {
    return (
      <input
        type="text"
        value={numClubs === 2 ? '' : searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a club..."
        className="border p-2 rounded-md"
      />
    )
  }
  
  export default ClubSearchInput
  