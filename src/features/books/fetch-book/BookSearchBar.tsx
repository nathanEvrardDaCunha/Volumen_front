import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useFetchBook from './useFetchBook';
import {
    FetchBookFormSchema,
    type FetchBookFormType,
} from './fetch-book-schema';

export default function BookSearchBar() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FetchBookFormType>({
        defaultValues: {
            query: '',
        },
        resolver: zodResolver(FetchBookFormSchema),
    });

    const mutation = useFetchBook({ setError });

    const onSubmit: SubmitHandler<FetchBookFormType> = async (data) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <section>
                    <label htmlFor="query">Book information</label>
                    <p>Search book by authors, title or related keywords.</p>
                    <input
                        {...register('query')}
                        type="text"
                        name="query"
                        id="query"
                    />
                    {errors.query && <p>{errors.query.message}</p>}
                </section>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="reset">Reset</button>
            </section>
        </form>
    );
}
