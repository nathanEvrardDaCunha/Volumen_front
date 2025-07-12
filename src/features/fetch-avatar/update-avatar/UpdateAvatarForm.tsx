import type {
    UseFormHandleSubmit,
    SubmitHandler,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';
import {
    UpdateAvatarSchema,
    type UpdateAvatarType,
} from './update-avatar-schema';

// If this interface work fine => Go to every interface and replace the hardcoded values by a schema type

interface UpdateAvatarFormProps {
    handleSubmit: UseFormHandleSubmit<UpdateAvatarType>;
    onSubmit: SubmitHandler<UpdateAvatarType>;
    errors: FieldErrors<UpdateAvatarType>;
    register: UseFormRegister<UpdateAvatarType>;
    isSubmitting: boolean;
}

const avatarOptions = UpdateAvatarSchema.shape.avatar_id.options;

const formatAvatarName = (filename: string) => {
    return filename
        .replace('.jpg', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function UpdateAvatarForm({
    handleSubmit,
    onSubmit,
    errors,
    register,
    isSubmitting,
}: UpdateAvatarFormProps) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Choose Avatar</h1>
            <p>To display your creativity.</p>

            {errors.root && (
                // Put everything in the 'message' then deconstruct it to have distinct 'hint', 'cause' and 'name' ?
                <>
                    <h1>{errors.root.message}</h1>
                </>
            )}

            <section>
                <label htmlFor="avatar_id">Avatar</label>
                <p>Select your avatar.</p>

                <select
                    {...register('avatar_id')}
                    id="avatar_id"
                    name="avatar_id"
                >
                    {avatarOptions.map((avatarFile) => (
                        <option key={avatarFile} value={avatarFile}>
                            {formatAvatarName(avatarFile)}
                        </option>
                    ))}
                </select>

                {errors.avatar_id && <p>{errors.avatar_id.message}</p>}
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
