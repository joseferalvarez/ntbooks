import { useEffect, useState } from 'react';
import { IBook } from '../schemas/book';

export default function Popup({
  currentBook,
  setCurrentBook,
}: {
  currentBook: IBook;
  setCurrentBook: (currentBook: IBook) => void;
}) {
  const [description, setDescription] = useState<string>('');
  //const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (!currentBook) return;
    getBookData();
  }, [currentBook]);

  const getBookData = async () => {
    const response = await fetch(`${import.meta.env.VITE_OPEN_LIBRARY_DETAIL}${currentBook.key}.json`);
    const data = await response.json();
    
    if(data.description.value){
      setDescription(data.description.value);
    }else{
      setDescription(data.description);
    }
    //setSubjects(data.subjects);
  };
  return (
    <div className="fixed top-[0px] left-[0px] w-[100%] min-h-[100vh] bg-grey-tr-nt flex justify-center items-center">
      <div className="absolute w-[100%] h-[100%]  z-[1]" onClick={() => setCurrentBook(null)}></div>
      <div className="w-[90%] max-w-[1300px] h-[90%] bg-white rounded-lg shadow-lg flex px-[30px] py-[40px] z-[2] justify-stretch gap-[40px]">
        <img
          className="w-[40%] h-[80vh] object-contain"
          src={`${import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL}/${currentBook.cover_i}.jpg`}
        />
        <div className="flex flex-col grow">
          <h2 className="text-3xl font-semibold">{currentBook.title}</h2>
          <p className="text-2xl pt-[20px]">
            {currentBook.author_name && currentBook.author_name.length > 1 && currentBook.author_name.map((author, index) =>
              index === currentBook.author_name.length - 1 ? author : `${author} & `
            )}
            {currentBook.author_name && currentBook.author_name.length === 1 && (currentBook.author_name[0])}
          </p>
          {currentBook.publisher && <p className="text-2xl pt-[20px]">{currentBook.publisher[0]}</p>}
          {description && <p className="text-lg mt-[25px] max-h-[350px] overflow-scroll">{description}</p>}
        </div>
      </div>
    </div>
  );
}
