import { IBook } from "../schemas/book";
import { MultiplePages, Calendar, Language } from "iconoir-react";

export default function Book({book}: {book: IBook}) {

  return (
    <div className="flex flex-col p-[15px] shadow-md rounded bg-white min-h-[450px] gap-[10px]">
        <div className="h-[80%] w-[100%] flex justify-center items-center">
            <img className="h-[100%] w-[100%] object-contain" src={`${import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL}/${book.cover_i}.jpg`} />
        </div>
        <div className="grow flex flex-col gap-[5px]">
            <p className="book-title">{book.title}</p>
            <p className="book-author">{book.author_name}</p>
            {book.publisher && <p className="book-publisher">{book.publisher[0]}</p>}
            <div className="flex flex-row flex-wrap gap-[10px] pt-[15px] ">
                {book.language && 
                    <div className="flex items-center justify-center w-fit gap-[3px] bg-orange-nt px-[5px] py-[5px] rounded">
                        <Language height={20} />
                        <p className="book-data">{book.language[0]}</p>
                    </div>
                }
                {book.first_publish_year && 
                    <div className="flex items-center w-fit gap-[3px] bg-green-nt px-[5px] py-[5px] rounded">
                        <Calendar height={20} />
                        <p className="book-data">{book.first_publish_year}</p>
                    </div>
                }
                {book.number_of_pages_median && 
                    <div className="flex items-center w-fit gap-[3px] bg-red-nt px-[5px] py-[5px] rounded">
                        <MultiplePages height={20} />
                        <p className="book-data">{book.number_of_pages_median}</p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
