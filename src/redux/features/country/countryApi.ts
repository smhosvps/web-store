import { apiSlice } from "../api/apiSlice";

interface Country {
    _id: string;
    name: string;
    capital: string;
    countryCode: string;
    currency: string;
    languages: string[];
    continent: string;
    regions: Region[];
}

interface Region {
    _id: string;
    name: string;
    capital?: string;
    uniqueFeatures?: string[];
    description?: string;
    churches: Church[];
}

interface Church {
    _id: string;
    name: string;
    latitude: number,
    longitude: number,
    landmarks?: string[];
    address: string;
    description?: string;
}



export const countryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.query<Country[], void>({
            query: () => '/get-country'
        }),
        getCountryById: builder.query<Country, string>({
            query: (id) => `/get-country/${id}`
        }),
        createCountry: builder.mutation<Country, Partial<Country>>({
            query: (newCountry) => ({
                url: '/create-country',
                method: 'POST',
                body: newCountry,
            }),
        }),
        updateCountry: builder.mutation<Country, { id: string; country: Partial<Country> }>({
            query: ({ id, country }) => ({
                url: `/update-country/${id}`,
                method: 'PUT',
                body: country,
            }),
        }),
        deleteCountry: builder.mutation<void, string>({
            query: (id) => ({
                url: `/delete-country/${id}`,
                method: 'DELETE',
            }),
        }),
        addRegion: builder.mutation<Country, { countryId: string; region: Partial<Region> }>({
            query: ({ countryId, region }) => ({
                url: `/country/${countryId}/add-regions`,
                method: 'POST',
                body: region,
            }),
        }),
        updateRegion: builder.mutation<Country, { countryId: string; regionId: string; region: Partial<Region> }>({
            query: ({ countryId, regionId, region }) => ({
                url: `/country/${countryId}/update-regions/${regionId}`,
                method: 'PUT',
                body: region,
            }),
        }),
        deleteRegion: builder.mutation<Country, { countryId: string; regionId: string }>({
            query: ({ countryId, regionId }) => ({
                url: `/country-delete/${countryId}/regions/${regionId}`,
                method: 'DELETE',
            })
        }),
        addChurch: builder.mutation<Country, { countryId: string; regionId: string; city: Partial<Church> }>({
            query: ({ countryId, regionId, city }) => ({
                url: `/country/${countryId}/regions/${regionId}/add-churches`,
                method: 'POST',
                body: city,
            }),
        }),
        updateChurch: builder.mutation<Country, { countryId: string; regionId: string; churchId: string; church: Partial<Church> }>({
            query: ({ countryId, regionId, churchId, church }) => ({
                url: `/country/${countryId}/regions/${regionId}/update-church/${churchId}`,
                method: 'PUT',
                body: church,
            })
        }),
        deleteCity: builder.mutation<Country, { countryId: string; regionId: string; churchId: string }>({
            query: ({ countryId, regionId, churchId }) => ({
                url: `/${countryId}/regions/${regionId}/delete-church/${churchId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useGetCountryByIdQuery,
    useCreateCountryMutation,
    useUpdateCountryMutation,
    useDeleteCountryMutation,
    useAddRegionMutation,
    useUpdateRegionMutation,
    useDeleteRegionMutation,
    useAddChurchMutation,
    useUpdateChurchMutation,
    useDeleteCityMutation,
} = countryApi;