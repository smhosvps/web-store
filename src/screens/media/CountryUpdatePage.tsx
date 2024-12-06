import { useParams } from 'react-router-dom';
import CountryForm from '../../components/location/CountryForm';
import { useGetCountryByIdQuery, useUpdateCountryMutation } from '../../redux/features/country/countryApi';

export default function CountryUpdatePage({}) {
  const { id } = useParams<{ id: string }>();
  const [updateCountry] = useUpdateCountryMutation();
  const { data: country, isLoading, error } = useGetCountryByIdQuery<any>(id || '');

  const handleSubmit = async (data: any) => {
    if (id) {
      await updateCountry({ id, country: data }).unwrap();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).message}</div>;
  if (!country) return <div>Country not found</div>;

  return (
    <div className="container mx-auto px-4">
      <CountryForm initialData={country} onSubmit={handleSubmit} isUpdate />
    </div>
  );
};


