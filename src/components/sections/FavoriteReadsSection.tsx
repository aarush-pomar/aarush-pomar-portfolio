import type { FavoriteRead } from '../../data/favoriteReads'

export default function FavoriteReadsSection({ books }: { books: FavoriteRead[] }) {
  if (books.length === 0) return null

  return (
    <div className="rounded-[32px] border-2 border-[#1a1a1a]/15 bg-white p-5 font-newscycle text-[#1c1b1c] sm:rounded-[40px] sm:p-7 md:rounded-[48px] md:p-8">
      <h2 className="font-lato pb-6 text-xl font-black uppercase tracking-tight text-black sm:text-2xl md:text-3xl">
        Favorite Reads: Aarush&rsquo;s Book Notes
      </h2>
      <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
        {books.map((book) => (
          <figure key={book.title} className="flex flex-col">
            <div className="flex h-64 items-center justify-center sm:h-80">
              <img
                src={book.coverSrc}
                alt={`${book.title} by ${book.author} cover`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <blockquote className="mt-4 text-center text-base italic text-[#1a1a1a]/70 sm:text-lg">
              &ldquo;{book.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-left text-sm leading-[1.7] text-[#1c1b1c] sm:text-base">
              {book.note}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
