import { useEffect, useState } from "react"
import { IBook } from "./schemas/book";
import { searchBook, trendingBooks } from "./functions/searchBook";
import Book from "./components/Book";
import Search from "./components/Search";
import Logo from "./components/Logo";

export default function App() {

  const [books, setBooks] = useState<IBook[]>();
  const [search, setSearch] = useState<string>();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if(event) clearTimeout(event);
    
    if(!search){
      getBooks('');
      return;
    }
   
    const newEvent = setTimeout(() => {
      getBooks(search);
    }, 500);

    setEvent(newEvent);
  }, [search]);

  const getBooks = async (text: string) => {
    const apiData = text ? await searchBook(text) : await trendingBooks();
    setBooks(filterBooks(text ? apiData.docs : apiData.works));
  }

  const filterBooks = (books: IBook[]) => {
    return books.filter((book) => {
      if(!book.cover_i) return;
      return book;
    })
  }

  const getBookData = (book: IBook) => {
    return {
      title: book.title,
      key: book.key,
      author_key: book.author_key,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      edition_count: book.edition_count,
      publisher: book.publisher,
      language: book.language,
      isbn: book.isbn,
      number_of_pages_median: book.number_of_pages_median
    }
  }

  return (
    <div className="bg-slate-50 min-h-[100vh]">
      <div className="flex flex-col">
        <div className="px-[75px] py-[20px] w-[100%] flex bg-white shadow-md flex-row items-center justify-between fixed">
          <div className="w-fit flex justify-center items-center h-[100%] gap-[10px]">
            <Logo />
            <h1 className="text-3xl font-semibold">NTBooks</h1>
          </div>
          <Search setSearch={setSearch} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] auto-rows-auto gap-[15px] w-[100%] px-[75px] pt-[120px] pb-[40px]">
          {books && books.length > 1 && books.map((book: IBook) => (<Book key={book.cover_i} book={getBookData(book)}/>))}
        </div>
      </div>
    </div>
  )
}
