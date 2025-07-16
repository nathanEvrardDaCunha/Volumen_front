import type { BookType } from '../book-schema';
import useSaveBook from './useSaveBook';

interface SaveBookButtonProps {
    book: BookType;
}

export default function SaveBookButton({ book }: SaveBookButtonProps) {
    const mutation = useSaveBook();

    function handleOnClick() {
        mutation.mutate(book);
    }

    return <button onClick={handleOnClick}>Save</button>;
}
