import { useState } from 'react';
import type {
    UseFormHandleSubmit,
    SubmitHandler,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';

interface UpdateUserFormProps {
    handleSubmit: UseFormHandleSubmit<
        {
            username?: string | undefined;
            email?: string | undefined;
            password?: string | undefined;
            bio?: string | undefined;
        },
        {
            username?: string | undefined;
            email?: string | undefined;
            password?: string | undefined;
            bio?: string | undefined;
        }
    >;
    onSubmit: SubmitHandler<{
        username?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        bio?: string | undefined;
    }>;
    errors: FieldErrors<{
        username?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        bio?: string | undefined;
    }>;
    register: UseFormRegister<{
        username?: string | undefined;
        email?: string | undefined;
        password?: string | undefined;
        bio?: string | undefined;
    }>;
    isSubmitting: boolean;
}

export default function UpdateUserForm({
    handleSubmit,
    onSubmit,
    errors,
    register,
    isSubmitting,
}: UpdateUserFormProps) {
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
                <label htmlFor="username">Username (optional)</label>
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
                <label htmlFor="email">Email (optional)</label>
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
                <label htmlFor="password">Password (optional)</label>
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
                <label htmlFor="bio">Biography (optional)</label>
                <p>Write down your biography.</p>
                <input {...register('bio')} type="text" name="bio" id="bio" />
                {errors.bio && <p>{errors.bio.message}</p>}
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
