const searchBook = async (title: string) => {
    const response = await fetch(`${import.meta.env.VITE_OPEN_LIBRARY_URL}/search.json?q=${encodeURI(title.replaceAll(' ', '+'))}`);
    const data = await response.json();
    return data;
}
const trendingBooks = async() => {
    const response = await fetch(import.meta.env.VITE_OPEN_LIBRARY_TRENDING);
    const data = await response.json();
    return data;
}

export {searchBook, trendingBooks};