import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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
    hint: string;
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

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function onToggleClick() {
        setIsPasswordVisible((previous) => !previous);
    }

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: async (formData: FormType) => {
            try {
                const result = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/register`,
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
                            hint: '',
                            stack: '',
                        };
                    }
                    throw errorData;
                }

                return await result.json();
            } catch (error) {
                console.log(error);
                if (
                    error &&
                    typeof error === 'object' &&
                    'name' in error &&
                    'cause' in error
                ) {
                    throw error as APIError;
                } else {
                    const networkError: APIError = {
                        name: 'Network Error',
                        cause: 'Could not connect to the server.',
                        hint: 'Try checking your network connection.',
                        stack: error instanceof Error ? error.stack || '' : '',
                    };
                    throw networkError;
                }
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

                        {errors.root && (
                            // Put everything in the 'message' then deconstruct it to have distinct 'hint', 'cause' and 'name' ?
                            <>
                                <h1>{errors.root.message}</h1>
                            </>
                        )}

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
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="password"
                                id="password"
                            />
                            <button type="button" onClick={onToggleClick}>
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </button>
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
