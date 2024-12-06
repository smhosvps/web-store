import React from 'react';
import CountryForm from '../../components/location/CountryForm';
import { useCreateCountryMutation } from '../../redux/features/country/countryApi';


const CountryFormPage: React.FC = () => {
    const [createCountry] = useCreateCountryMutation();

    const handleSubmit = async (data: any) => {
        await createCountry(data).unwrap();
    };

    return (
        <div className="container mx-auto px-4 md:px-0">
            <CountryForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CountryFormPage;


