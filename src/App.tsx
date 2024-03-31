import { useEffect, useState } from 'react';
import { IBook } from './schemas/book';
import { searchBook, trendingBooks } from './functions/searchBook';
import Book from './components/Book';
import Search from './components/Search';
import Logo from './components/Logo';
import Popup from './components/Popup';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function App() {
  const [books, setBooks] = useState<IBook[]>();
  const [search, setSearch] = useState<string>();
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);

  //TODO:Aqui puedo crear solo un estado que sea un objeto y se llame Controllers
  const [event, setEvent] = useState(null); //Timeout state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (event) clearTimeout(event);

    if (!search) {
      getBooks('', getResultsNumber(), false);
      return;
    }

    const newEvent = setTimeout(() => {
      getBooks(search, getResultsNumber(), false);
    }, 1500);

    setEvent(newEvent);
  }, [search]);

  const getBooks = async (text: string, results: number, next: boolean) => {
    const apiData = text ? await searchBook(text, next ? page + 1 : 1, results) : await trendingBooks(next ? page + 1 : 1, results);

    if(!apiData || !apiData.length){
      setHasMore(false);
    }
    
    if(next){
      setBooks([...books, ...apiData]);
      setPage(page+1);
    }else{
      setBooks(apiData);
      setPage(1);
    }
  };

  const getResultsNumber = () => {
    const STANDAR_RESOLUTION: number = 1920;
    const STANDAR_RESULTS: number = 21; //3 rows
    const resolution: number = window.innerWidth;

    return Math.round(((resolution * STANDAR_RESULTS) / STANDAR_RESOLUTION));
  }

  return (
    <div className="min-h-[100vh] bg-slate-50">
      <div className="flex flex-col">
        <div className="fixed flex w-[100%] flex-row items-center justify-between bg-white px-[75px] py-[20px] shadow-md">
          <div
            className="flex h-[100%] w-fit cursor-pointer items-center justify-center gap-[10px]"
            onClick={() => setSearch('')}
          >
            <Logo />
            <h1 className="text-3xl font-semibold">NTBooks</h1>
          </div>
          <Search
            search={{
              search: search,
              setSearch: setSearch,
            }}
          />
        </div>
        <div>
          {books &&
            books.length > 1 &&
              <InfiniteScroll
                className="grid w-[100%] auto-rows-auto grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[15px] px-[75px] pb-[40px] pt-[120px]"
                dataLength={books.length}
                next={() => {
                  getBooks(search ? search : '', getResultsNumber(), true);
                }}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>You have seen it all</p>}
              >
                {books.map((book: IBook, index) => <Book key={index} book={book} setCurrentBook={setCurrentBook} />)}
              </InfiniteScroll>
            }
        </div>
      </div>
      {currentBook && <Popup currentBook={currentBook} setCurrentBook={setCurrentBook} />}
    </div>
  );
}
