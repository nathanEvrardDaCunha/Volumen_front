import { useState } from 'react';
import type {
    UseFormHandleSubmit,
    SubmitHandler,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';

interface RegisterFormProps {
    handleSubmit: UseFormHandleSubmit<
        {
            username: string;
            email: string;
            password: string;
        },
        {
            username: string;
            email: string;
            password: string;
        }
    >;
    onSubmit: SubmitHandler<{
        email: string;
        password: string;
        username: string;
    }>;
    errors: FieldErrors<{
        username: string;
        email: string;
        password: string;
    }>;
    register: UseFormRegister<{
        username: string;
        email: string;
        password: string;
    }>;
    isSubmitting: boolean;
}

export function RegisterForm({
    handleSubmit,
    onSubmit,
    errors,
    register,
    isSubmitting,
}: RegisterFormProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function onToggleClick() {
        setIsPasswordVisible((previous) => !previous);
    }

    return (
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
                {errors.username && <p>{errors.username.message}</p>}
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
                {errors.password && <p>{errors.password.message}</p>}
            </section>

            <section>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="reset">Reset</button>
            </section>
        </form>
    );
}
