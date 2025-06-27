import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

const FormSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .refine((password) => /[A-Z]/.test(password), {
            message: 'Password must contain at least one uppercase letter',
        })
        .refine((password) => /[a-z]/.test(password), {
            message: 'Password must contain at least one lowercase letter',
        })
        .refine((password) => /[0-9]/.test(password), {
            message: 'Password must contain at least one number',
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: 'Password must contain at least one special character',
        }),
});
type FormType = z.infer<typeof FormSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormType>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            // Use React Query here.
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(data);
            // Automatically redirect to /login if is success
        } catch (error) {
            setError('root', { message: 'Form Error.' });
        }
    };

    // The data validation should be identical to the one on the server.

    // Add toggle password visibility feature
    return (
        <>
            <header>
                <h3>Header</h3>
            </header>

            <section>
                <main>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign Up</h1>
                        <p>To be able to use our services.</p>

                        {errors.root && <p>{errors.root.message}</p>}

                        <section>
                            <label htmlFor="username">Username</label>
                            <p>Write down your username.</p>
                            <input
                                {...register('username')}
                                type="text"
                                name="username"
                                id="username"
                            />
                            {errors.username && (
                                <p>{errors.username.message}</p>
                            )}
                        </section>

                        <section>
                            <label htmlFor="email">Email</label>
                            <p>Write down your email address.</p>
                            <input
                                {...register('email')}
                                type="email"
                                name="email"
                                id="email"
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </section>

                        <section>
                            <label htmlFor="password">Password</label>
                            <p>Write down your password.</p>
                            <input
                                {...register('password')}
                                type="password"
                                name="password"
                                id="password"
                            />
                            {errors.password && (
                                <p>{errors.password.message}</p>
                            )}
                        </section>

                        <section>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                            <button type="reset">Reset</button>
                        </section>
                    </form>
                </main>
            </section>

            <footer>
                <h3>Footer</h3>
            </footer>
        </>
    );
}
