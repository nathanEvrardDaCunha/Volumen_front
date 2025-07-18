import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Header from '../../../layouts/Header';
import Footer from '../../../layouts/Footer';
import CreateCustomShelfForm from './CreateCustomShelfForm';
import {
    CreateCustomShelfFormSchema,
    type CreateCustomShelfFormType,
} from './create-custom-shelf-schema';
import useCreateCustomShelf from './useCreateCustomShelf';

export default function CreateCustomShelf() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateCustomShelfFormType>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(CreateCustomShelfFormSchema),
    });

    const mutation = useCreateCustomShelf({ setError });

    const onSubmit: SubmitHandler<CreateCustomShelfFormType> = async (data) => {
        mutation.mutate(data);
    };

    return (
        <>
            <Header />

            <section>
                <main>
                    <CreateCustomShelfForm
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        register={register}
                        isSubmitting={isSubmitting}
                    />
                </main>
            </section>

            <Footer />
        </>
    );
}
