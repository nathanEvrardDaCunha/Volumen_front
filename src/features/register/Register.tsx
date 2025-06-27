import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

type APIError = {
    name: string;
    cause: string;
    stack: string;
};

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

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: async (formData: FormType) => {
            try {
                console.log(import.meta.env.VITE_API_URL);
                const result = await fetch(
                    `${import.meta.env.VITE_API_URL}/user`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    }
                );

                if (!result.ok) {
                    let errorData: APIError;
                    try {
                        errorData = await result.json();
                    } catch (parseError) {
                        errorData = {
                            name: 'Server Error',
                            cause: `Server responded with status: ${result.status}.`,
                            stack: '',
                        };
                    }
                    throw errorData;
                }

                return await result.json();
            } catch (error) {
                const networkError: APIError = {
                    name: 'Network Error',
                    cause: 'Could not connect to the server. Please check your network connection.',
                    stack: error instanceof Error ? error.stack || '' : '',
                };
                throw networkError;
            }
        },
        onError: (error: APIError) => {
            setError('root', { message: error.cause });
            console.error(`${error.name}: ${error.cause}`);
            throw error;
        },
        onSuccess: () => {
            navigate('/login');
        },
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        mutation.mutate(data);
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

                        {errors.root && <h1>{errors.root.message}</h1>}

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
