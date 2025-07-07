import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { RegisterFormSchema, type RegisterFormType } from './register-schema';
import { useRegister } from './useRegister';
import { RegisterForm } from './RegisterForm';

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

    // The data validation should be identical to the one on the server.
    return (
        <>
            <header>
                <h3>Header</h3>
            </header>

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

            <footer>
                <h3>Footer</h3>
            </footer>
        </>
    );
}
