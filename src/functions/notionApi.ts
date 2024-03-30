import { IBook } from "../schemas/book";

const saveNotionBook = async({book}: {book: IBook}) => {

    //TODO: Filtrar autores (3 como maximo), publishers (solo 1)

    await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        cover: `${import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL}/${book.cover_i}.jpg`,
        title: book.title,
        authors: book.author_name,
        notion_token: import.meta.env.VITE_NOTION_TOKEN,
        notion_database: import.meta.env.VITE_NOTION_DATABASE,
        publisher: book.publisher,
        language: book.language,
        pages: book.number_of_pages_median,
        published: book.first_publish_year,
        url: `${import.meta.env.VITE_AMAZON_URL}/${book.isbn.filter((isbn) => isbn.length === 10)[0]}`,
      })
    });
}

export {saveNotionBook};