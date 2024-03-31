import { IBook } from "../schemas/book";

const searchBook = async (title: string, page: number, results: number) => {
    const response = await fetch(`${import.meta.env.VITE_OPEN_LIBRARY_URL}/search.json?q=${encodeURI(title.replaceAll(' ', '+'))}&page=${page}&limit=${results}`);
    const data = await response.json();

    return formatBooks(data.docs);
}

const trendingBooks = async(page: number, results: number) => {
    const response = await fetch(`${import.meta.env.VITE_OPEN_LIBRARY_TRENDING}?page=${page}&limit=${results}`);
    const data = await response.json();

    return formatBooks(data.works);
}

const formatBooks = (books) => {

   const formatedBooks: IBook[] = books.map((book) => {
      if(!book.cover_i 
        || !book.author_name 
        || !book.title 
        || !book.key 
        || !book.author_key) 
        return;

      if(book.availability && book?.availability.isbn){
        book = {...book, isbn: [book.availability.isbn]};
      }

      return {
        title: book.title,
        key: book.key,
        author_key: book.author_key.length < 6 ? book.author_key : book.author_key.slice(0, 7),
        author_name: book.author_name.length < 6 ? book.author_name: book.author_name.slice(0, 7),
        cover_i: book.cover_i,
        first_publish_year: book.first_publish_year ? book.first_publish_year : undefined,
        edition_count: book.edition_count ? book.edition_count : undefined,
        publisher: book.publisher ? book.publisher[0] : '',
        language: book.language ? book.language[0] : '',
        isbn: book.isbn ? getIsbns(book.isbn) : '',
        number_of_pages_median: book.number_of_pages_median ? book.number_of_pages_median : '',
      }
    });

    return formatedBooks.filter(book => book);
}

const getIsbns = (isbns: string[]) => {
  const isbnList =  isbns.filter((isbn) => isbn.length === 10);
  return (isbnList && isbnList.length > 3) ? isbnList.slice(0,3) : isbnList;
}

export {searchBook, trendingBooks};