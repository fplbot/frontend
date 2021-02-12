export default function SearchBar() {
    return (
        <form className="search-bar" action="/search">
            <input
                name="search"
                placeholder="Magnus Carlsen"
                aria-label="Search for fpl player"
                className="search-bar__input w-72 py-2 px-4 mr-4 text-fpl-purple border-2 border-fpl-purple rounded focus:outline-none"
            />
            <button
                className="search-bar__submit font-bold rounded shadow hover:shadow-xl transition duration-500 py-3 px-3 text-white hover:text-fpl-purple bg-fpl-purple hover:bg-fpl-green mt-4"
            >
                Search
            </button>
        </form>
    )
}