import type {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from 'react-hook-form';

interface ResetPasswordFormProps {
    handleSubmit: UseFormHandleSubmit<
        {
            email: string;
        },
        {
            email: string;
        }
    >;
    onSubmit: SubmitHandler<{
        email: string;
    }>;
    errors: FieldErrors<{
        email: string;
    }>;
    register: UseFormRegister<{
        email: string;
    }>;
    isSubmitting: boolean;
}

export default function ResetPasswordForm({
    handleSubmit,
    onSubmit,
    errors,
    register,
    isSubmitting,
}: ResetPasswordFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Reset Password</h1>
            <p>To be able to connect to your account.</p>

            {errors.root && (
                // Put everything in the 'message' then deconstruct it to have distinct 'hint', 'cause' and 'name' ?
                <>
                    <h1>{errors.root.message}</h1>
                </>
            )}

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
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="reset">Reset</button>
            </section>
        </form>
    );
}
