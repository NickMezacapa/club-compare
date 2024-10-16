import { createContext, useContext, useState, type ReactNode } from 'react'

interface UserContextType {
    handicap: string
    areaOfImprovement: string
    setHandicap: (handicap: string) => void
    setAreaOfImprovement: (aoi: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [handicap, setHandicap] = useState('')
    const [areaOfImprovement, setAreaOfImprovement] = useState('')

    return (
        <UserContext.Provider value={{ handicap, areaOfImprovement, setHandicap, setAreaOfImprovement }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error('Context must be used in a provider.')
    return context
}
