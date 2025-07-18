import type {
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from 'react-hook-form';

interface CreateCustomShelfFormProps {
    handleSubmit: UseFormHandleSubmit<
        {
            name: string;
        },
        {
            name: string;
        }
    >;
    onSubmit: SubmitHandler<{
        name: string;
    }>;
    errors: FieldErrors<{
        name: string;
    }>;
    register: UseFormRegister<{
        name: string;
    }>;
    isSubmitting: boolean;
}

export default function CreateCustomShelfForm({
    handleSubmit,
    onSubmit,
    errors,
    register,
    isSubmitting,
}: CreateCustomShelfFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create Custom Shelf</h1>
            <p>To organize your books like you want.</p>

            {errors.root && (
                // Put everything in the 'message' then deconstruct it to have distinct 'hint', 'cause' and 'name' ?
                <>
                    <h1>{errors.root.message}</h1>
                </>
            )}

            <section>
                <label htmlFor="name">Name</label>
                <p>Write down your shelf name.</p>
                <input
                    {...register('name')}
                    type="text"
                    name="name"
                    id="name"
                />
                {errors.name && <p>{errors.name.message}</p>}
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
