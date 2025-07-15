import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
    ResetPasswordSchema,
    type ResetPasswordType,
} from './reset-password-schema';
import useResetPassword from './useResetPassword';
import ResetPasswordForm from './ResetPasswordForm';
import Header from '../../../layouts/Header';
import Footer from '../../../layouts/Footer';

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordType>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(ResetPasswordSchema),
    });

    const mutation = useResetPassword({ setError });

    const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
        mutation.mutate(data);
    };

    return (
        <>
            <Header />

            <section>
                <main>
                    <ResetPasswordForm
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
