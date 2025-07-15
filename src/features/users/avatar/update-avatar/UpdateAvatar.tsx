import { useForm, type SubmitHandler } from 'react-hook-form';
import {
    UpdateAvatarSchema,
    type UpdateAvatarType,
} from './update-avatar-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateAvatar from './useUpdateAvatar';
import UpdateAvatarForm from './UpdateAvatarForm';
import useFetchAvatar from '../fetch-avatar/useFetchAvatar';

export default function UpdateAvatar() {
    const query = useFetchAvatar();

    // Add a fallback image in case server fail or someone tamper with the avatar logic ?

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UpdateAvatarType>({
        resolver: zodResolver(UpdateAvatarSchema),
    });

    const mutation = useUpdateAvatar({ setError });

    const onSubmit: SubmitHandler<UpdateAvatarType> = async (data) => {
        mutation.mutate(data);
    };

    // The data validation should be identical to the one on the server.
    return (
        <>
            <section>
                <img src={`/${query.data?.data.avatar_id}`} alt="User avatar" />

                <UpdateAvatarForm
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                    register={register}
                    isSubmitting={isSubmitting}
                />
            </section>
        </>
    );
}
