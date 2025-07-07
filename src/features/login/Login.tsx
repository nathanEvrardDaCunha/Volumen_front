import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { LoginFormSchema, type LoginFormType } from './login-schema';
import { useLogin } from './useLogin';
import { LoginForm } from './LoginForm';

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
            <header>
                <h3>Header</h3>
            </header>

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

            <footer>
                <h3>Footer</h3>
            </footer>
        </>
    );
}
