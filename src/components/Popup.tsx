import { useEffect, useState } from 'react';
import { IBook } from '../schemas/book';
import { saveNotionBook } from '../functions/notionApi';
import { Language } from 'iconoir-react';
import { Calendar } from 'iconoir-react';
import { MultiplePages } from 'iconoir-react';

export default function Popup({
  currentBook,
  setCurrentBook,
}: {
  currentBook: IBook;
  setCurrentBook: (currentBook: IBook) => void;
}) {
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (!currentBook) return;
    getBookData();
  }, [currentBook]);

  const getBookData = async () => {
    const response = await fetch(`${import.meta.env.VITE_OPEN_LIBRARY_DETAIL}${currentBook.key}.json`);
    const data = await response.json();

    if (data?.description.value) {
      setDescription(data.description.value);
    } else {
      setDescription(data.description);
    }
  };

  const formatIsbn = (isbns: string[]) => {
    return isbns.filter((isbn) => isbn.length === 10);
  }

  return (
    <div className="fixed left-[0px] top-[0px] flex min-h-[100vh] w-[100%] items-center justify-center bg-grey-tr-nt">
      <div className="absolute z-[1] h-[100%]  w-[100%]" onClick={() => setCurrentBook(null)}></div>
      <div className="z-[2] flex h-[90%] w-[90%] max-w-[1300px] justify-stretch gap-[40px] rounded-lg bg-white px-[30px] py-[40px] shadow-lg">
        <img
          className="h-[80vh] w-[40%] object-contain"
          src={`${import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL}/${currentBook.cover_i}.jpg`}
        />
        <div className="flex grow flex-col justify-center">
          <h2 className="text-3xl font-semibold">{currentBook.title}</h2>
          <p className="pt-[20px] text-2xl">
            {currentBook.author_name &&
              currentBook.author_name.length > 1 &&
              currentBook.author_name.map((author, index) =>
                index === currentBook.author_name.length - 1 ? author : `${author} & `
              )}
            {currentBook.author_name && currentBook.author_name.length === 1 && currentBook.author_name[0]}
          </p>
          {currentBook.publisher && <p className="pt-[10px] text-lg">{currentBook.publisher[0]}</p>}

          <div className="flex flex-row gap-[10px] pt-[20px]">
            {currentBook.language && (
              <div className="flex w-fit items-center justify-center gap-[3px] rounded bg-orange-nt px-[5px] py-[5px]">
                <Language height={20} />
                <p className="book-data">{currentBook.language[0]}</p>
              </div>
            )}

            {currentBook.first_publish_year && (
            <div className="flex w-fit items-center gap-[3px] rounded bg-green-nt px-[5px] py-[5px]">
              <Calendar height={20} />
              <p className="book-data">{currentBook.first_publish_year}</p>
            </div>
          )}

          {currentBook.number_of_pages_median && (
            <div className="flex w-fit items-center gap-[3px] rounded bg-red-nt px-[5px] py-[5px]">
              <MultiplePages height={20} />
              <p className="book-data">{currentBook.number_of_pages_median}</p>
            </div>
          )}
          </div>

          {description && <p className="mt-[25px] max-h-[350px] overflow-scroll text-base font-light">{description}</p>}

          <div className="flex flex-row flex-wrap gap-[10px] pt-[20px]">
            {formatIsbn(currentBook.isbn) &&
              formatIsbn(currentBook.isbn).map((id) => (
                <a className="text-xs py-[3px] px-[5px] bg-blue-nt rounded" href={`${import.meta.env.VITE_AMAZON_URL}/${id}`} target='_blank'>
                  {id}
                </a>
              ))}
          </div>

          <input
            className="mt-[20px] w-fit cursor-pointer self-end rounded-lg bg-orange-nt px-[20px] py-[10px] text-lg"
            type="button"
            value="Guardar en notion"
            onClick={() => saveNotionBook({book: currentBook})}
          />
        </div>
      </div>
    </div>
  );
}
