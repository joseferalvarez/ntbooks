import {test, expect, expectTypeOf} from "vitest";
import { searchBook } from "../functions/searchBook";
import { IBook } from "../schemas/book";

test("The Api returns one or more books", async () => {
    const data = await searchBook('The Fellowship of the ring');

    expect(data.docs).toHaveLength;
    expectTypeOf(data).toHaveProperty('numFound');
    expect(data.numFound).toBeGreaterThan(0);
});

test("The book have the required properties", async () => {
    const data = await searchBook('The Fellowship of the ring');

    data.docs.forEach((book: IBook) => {
        expectTypeOf(book).toEqualTypeOf<IBook>;
    });
});



