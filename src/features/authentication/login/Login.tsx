import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { LoginFormSchema, type LoginFormType } from './login-schema';

import LoginForm from './LoginForm';
import useLogin from './useLogin';
import Header from '../../../layouts/Header';
import Footer from '../../../layouts/Footer';

export default function Login() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormType>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(LoginFormSchema),
    });

    const mutation = useLogin({ setError });

    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        mutation.mutate(data);
    };

    return (
        <>
            <Header />

            <section>
                <main>
                    <LoginForm
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
