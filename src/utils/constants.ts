export interface Club {
    id?: string | number
    name: string
    brand: { name: string }
    specs: ClubSpecs
}

export interface ClubSpecs {
    year: number
    head_weight: number
    c_dimmension: number
    basic_vcog: number
    moi: number
    actual_rcog: number
    loft: number
    vcog_adjst: number
    actual_vcog: number
    vcog_cf: number
    moi_cf: number
    calc_points: number
    mpf: number
    category: string
    img_src?: string
}
