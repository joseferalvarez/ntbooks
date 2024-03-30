import { PageSearch } from 'iconoir-react';

export default function Search({ setSearch }: { setSearch: (text: string) => void }) {
  return (
    <form>
      <label className="flex w-fit items-center gap-[10px] rounded border-[1px] border-solid border-grey-nt p-[10px]">
        <PageSearch height={20} />
        <input
          className="border-none outline-none"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
        ></input>
      </label>
    </form>
  );
}
