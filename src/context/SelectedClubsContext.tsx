import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Club } from '~/utils/constants'

interface SelectedClubsContextType {
    selectedClubs: Club[]
    setSelectedClubs: React.Dispatch<React.SetStateAction<Club[]>>
}

const SelectedClubsContext = createContext<SelectedClubsContextType | undefined>(undefined)

export const SelectedClubsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedClubs, setSelectedClubs] = useState<Club[]>([])
    
    return (
        <SelectedClubsContext.Provider value={{ selectedClubs, setSelectedClubs }}>
            {children}
        </SelectedClubsContext.Provider>
    )
}

export const useSelectedClubs = () => {
    const context = useContext(SelectedClubsContext)
    if (!context) {
        throw new Error('useSelectedClubs must be used within a SelectedClubsProvider')
    }
    return context
}
