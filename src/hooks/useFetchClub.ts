import { api } from '~/utils/api'
import { type Club } from '~/utils/constants'

export const useFetchClub = (clubName: string) => {
    return api.club.getClubByName.useQuery(clubName, {
        select: (data) => data as unknown as Club, // Ensure it returns Club type
    })
}
