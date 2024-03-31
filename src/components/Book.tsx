import { IBook } from '../schemas/book';
import { MultiplePages, Calendar, Language } from 'iconoir-react';

export default function Book({ book, setCurrentBook }: { book: IBook; setCurrentBook: (book: IBook) => void }) {

  return (
    <div
      className="flex min-h-[450px] flex-col gap-[10px] rounded bg-white p-[15px] shadow-md"
      onClick={() => setCurrentBook(book)}
    >
      <div className="flex h-[80%] w-[100%] items-center justify-center">
        <img
          className="h-[100%] w-[100%] object-contain"
          src={`${import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL}/${book.cover_i}.jpg`}
        />
      </div>
      <div className="flex grow flex-col gap-[5px]">
        <p className="book-title">{book.title}</p>
        <p className="book-author">
          {book.author_name &&
            book.author_name.length > 1 &&
            book.author_name.map((author, index) => (index < book.author_name.length - 1 ? `${author} & ` : author))}
          {book.author_name && book.author_name.length === 1 && book.author_name}
        </p>
        {book.publisher && <p className="book-publisher">{book.publisher}</p>}
        <div className="flex flex-row flex-wrap gap-[10px] pt-[15px] ">
          {book.language && (
            <div className="flex w-fit items-center justify-center gap-[3px] rounded bg-orange-nt px-[5px] py-[5px]">
              <Language height={20} />
              <p className="book-data">{book.language}</p>
            </div>
          )}
          {book.first_publish_year && (
            <div className="flex w-fit items-center gap-[3px] rounded bg-green-nt px-[5px] py-[5px]">
              <Calendar height={20} />
              <p className="book-data">{book.first_publish_year}</p>
            </div>
          )}
          {book.number_of_pages_median && (
            <div className="flex w-fit items-center gap-[3px] rounded bg-red-nt px-[5px] py-[5px]">
              <MultiplePages height={20} />
              <p className="book-data">{book.number_of_pages_median}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
