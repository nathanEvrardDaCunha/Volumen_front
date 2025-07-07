import { zodResolver } from '@hookform/resolvers/zod';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
    UpdateUserFormSchema,
    type UpdateUserFormType,
} from './update-user-schema';
import UpdateUserForm from './UpdateUserForm';
import useUpdateUser from './useUpdateUser';

export default function UpdateUser() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserFormType>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            bio: '',
        },
        resolver: zodResolver(UpdateUserFormSchema),
    });

    const mutation = useUpdateUser({ setError });

    const onSubmit: SubmitHandler<UpdateUserFormType> = async (data) => {
        mutation.mutate(data);
    };

    // The data validation should be identical to the one on the server.
    return (
        <>
            <Header />

            <section>
                <main>
                    <UpdateUserForm
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
