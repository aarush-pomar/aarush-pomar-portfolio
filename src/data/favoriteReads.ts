import dorianGray from '../assets/photos/books/dorian-gray.jpg'
import casteOriginsWilkerson from '../assets/photos/books/caste-origins-wilkerson.jpg'
import poorEconomics from '../assets/photos/books/poor-economics.jpg'
import theNamesake from '../assets/photos/books/the-namesake.jpg'
import justMercy from '../assets/photos/books/just-mercy.jpg'
import americanah from '../assets/photos/books/americanah.jpg'
import annihilationOfCaste from '../assets/photos/books/annihilation-of-caste.jpg'
import whiteTiger from '../assets/photos/books/white-tiger.jpg'
import gone from '../assets/photos/books/gone.jpg'
import casteMatters from '../assets/photos/books/caste-matters.jpg'
import interpreterOfMaladies from '../assets/photos/books/interpreter-of-maladies.jpg'
import godOfSmallThings from '../assets/photos/books/god-of-small-things.jpg'

export interface FavoriteRead {
  title: string
  author: string
  coverSrc: string
  quote: string
  note: string
}

// Personal notes are Aarush's own drafts (not confirmed reading-completion
// claims) -- see handoff notes for which entries still need his sign-off.
// Order is deliberately interleaved by topic (caste / immigration / justice /
// economics / fiction) so no row ends up reading as all-one-subject.
export const FAVORITE_READS: FavoriteRead[] = [
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    coverSrc: dorianGray,
    quote: 'Nowadays people know the price of everything and the value of nothing.',
    note: 'Dorian cares so much about staying beautiful that he stops questioning the person he’s becoming, even as he hurts others. I like how the portrait keeps track of what he hides from everyone else. It makes me wonder how easily looking like a good person can replace actually being one.',
  },
  {
    title: 'Caste: The Origins of Our Discontents',
    author: 'Isabel Wilkerson',
    coverSrc: casteOriginsWilkerson,
    quote: 'It is about power—which groups have it and which do not.',
    note: 'My research looks at caste awareness across generations. Wilkerson’s comparison of India and America gives me another way to think about it. Unfair treatment can start to feel normal when you grow up around it. What makes someone question a system their family accepts? What makes someone else defend it?',
  },
  {
    title: 'Poor Economics',
    author: 'Abhijit V. Banerjee and Esther Duflo',
    coverSrc: poorEconomics,
    quote: 'the poor are no less rational than anyone else—quite the contrary.',
    note: 'I’m interested in economics because a decision that looks irrational from the outside can make sense once you understand someone’s options. Banerjee and Duflo take those options seriously. I like that they begin by listening to people and asking what shapes their choices before deciding what might actually help them.',
  },
  {
    title: 'The Namesake',
    author: 'Jhumpa Lahiri',
    coverSrc: theNamesake,
    quote: 'That’s the thing about books. They let you travel without moving your feet.',
    note: 'Gogol wants to get away from his name. His father remembers the experience that led him to choose it. I like how something ordinary can mean such different things to two people in one family. It made me think about what parents pass down and what children choose to keep.',
  },
  {
    title: 'Just Mercy',
    author: 'Bryan Stevenson',
    coverSrc: justMercy,
    quote: 'Each of us is more than the worst thing we’ve ever done.',
    note: 'My work with the Remedy Project has made me think more about rebuilding a life after incarceration. Stevenson shows how much we can miss when someone is reduced to their criminal record. I kept thinking about who gets a second chance, who gets listened to, and who never gets either.',
  },
  {
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    coverSrc: americanah,
    quote: 'She had, finally, spun herself fully into being.',
    note: 'Ifemelu’s move to America changes how people see her before she has a chance to introduce herself. That part of the story stayed with me. I keep thinking about what it takes to build a life somewhere new while also pushing back against everyone else’s ideas of who you are.',
  },
  {
    title: 'Annihilation of Caste',
    author: 'B. R. Ambedkar',
    coverSrc: annihilationOfCaste,
    quote: 'The caste system is not merely a division of labour. It is also a division of labourers.',
    note: 'Ambedkar’s distinction between dividing work and dividing people helped me see why caste belongs in conversations about economics. Choosing a job means something different when your options have been decided for you at birth. I’m left wondering how often the word “tradition” keeps people from questioning unfair arrangements around them.',
  },
  {
    title: 'The White Tiger',
    author: 'Aravind Adiga',
    coverSrc: whiteTiger,
    quote: 'The story of a poor man’s life is written on his body, in a sharp pen.',
    note: 'Balram wants a way out, and I understand that ambition even when I can’t defend his choices. Running my own business makes his story especially uncomfortable to read. It leaves me thinking about who gets a fair chance to succeed and what happens when getting ahead means hurting someone else.',
  },
  {
    title: 'Gone',
    author: 'Michael Grant',
    coverSrc: gone,
    quote: 'One minute the teacher was talking about the Civil War. And the next minute he was gone.',
    note: 'Everyone fifteen and older disappears. That alone was enough to get me reading. The powers are fun, but I kept watching how quickly the kids formed groups and picked leaders. I wanted to know who they would trust once the adults were gone, and how long that trust would last.',
  },
  {
    title: 'Caste Matters',
    author: 'Suraj Yengde',
    coverSrc: casteMatters,
    quote: 'Meanwhile, comradeship is a bond of trust that is developed through personal, social and economic sacrifices.',
    note: 'Yengde’s distinction between an ally and a comrade made me think about what support costs. I pay attention to how people talk about caste, including what they leave unsaid. It’s easy to agree that something is unfair. Speaking up gets harder when you risk losing something that matters to you.',
  },
  {
    title: 'Interpreter of Maladies',
    author: 'Jhumpa Lahiri',
    coverSrc: interpreterOfMaladies,
    quote: 'As ordinary as it all appears, there are times when it is beyond my imagination.',
    note: 'Lahiri writes about immigrant life through conversations that go wrong and feelings people struggle to explain. I like those small, awkward moments because they feel familiar. Two people can share a home, a language, or a history and still have trouble understanding what the other person is trying to say.',
  },
  {
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    coverSrc: godOfSmallThings,
    quote: 'Things can change in a day.',
    note: 'I keep thinking about how much power a family can have over who someone is even allowed to love. Roy shows just how personal caste can be in everyday life. The rules aren’t abstract when you see what they do to people who are simply trying to love each other.',
  },
]
