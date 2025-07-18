import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import CreateCustomShelfForm from './CreateCustomShelfForm';
import {
    CreateCustomShelfFormSchema,
    type CreateCustomShelfFormType,
} from './create-custom-shelf-schema';
import useCreateCustomShelf from './useCreateCustomShelf';

export default function CreateCustomShelf() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateCustomShelfFormType>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(CreateCustomShelfFormSchema),
    });

    const mutation = useCreateCustomShelf({ setError });

    const onSubmit: SubmitHandler<CreateCustomShelfFormType> = async (data) => {
        mutation.mutate(data);
    };

    // Also allow the possibility to change the visibility ?
    // => Or make it "Private" by default and change it in "update-shelf" ?

    return (
        <CreateCustomShelfForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            isSubmitting={isSubmitting}
        />
    );
}
