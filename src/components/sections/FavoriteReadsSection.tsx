import type { FavoriteRead } from '../../data/favoriteReads'

export default function FavoriteReadsSection({ books }: { books: FavoriteRead[] }) {
  if (books.length === 0) return null

  return (
    <div className="rounded-[32px] border-2 border-[#D7E2EA]/18 bg-[#131313] p-5 sm:rounded-[40px] sm:p-7 md:rounded-[48px] md:p-8">
      <h2 className="hero-heading pb-6 text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
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
            <blockquote className="mt-4 text-center text-base italic text-[#BBCCD7] sm:text-lg">
              &ldquo;{book.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-left text-base leading-relaxed text-[#D7E2EA] sm:text-lg">
              {book.note}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
