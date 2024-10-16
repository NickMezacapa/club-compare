import { SelectedClubsProvider } from './SelectedClubsContext';
import { UserContextProvider } from './UserContext';

interface AppContextType {
    children?: React.ReactNode
}
export const AppContext = ({ children }: AppContextType) => (
    <UserContextProvider>
        <SelectedClubsProvider>
            {children}
        </SelectedClubsProvider>
    </UserContextProvider>
)
