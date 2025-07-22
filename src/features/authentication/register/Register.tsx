import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { RegisterFormSchema, type RegisterFormType } from './register-schema';

import RegisterForm from './RegisterForm';
import useRegister from './useRegister';
import Header from '../../../layouts/Header';
import Footer from '../../../layouts/Footer';

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormType>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        resolver: zodResolver(RegisterFormSchema),
    });

    const mutation = useRegister({ setError });

    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        mutation.mutate(data);
    };

    return (
        <>
            <Header />

            <section>
                <main>
                    <RegisterForm
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
