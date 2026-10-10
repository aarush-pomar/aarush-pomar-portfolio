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
    note: 'Dorian cares so much about staying beautiful that he stops caring about the person he is becoming. That gap interests me. It’s easy to put effort into how other people see you, but his portrait keeps a record of everything an attractive appearance can hide.',
  },
  {
    title: 'Caste: The Origins of Our Discontents',
    author: 'Isabel Wilkerson',
    coverSrc: casteOriginsWilkerson,
    quote: 'It is about power—which groups have it and which do not.',
    note: 'My research focuses on caste awareness across generations, so I’m interested in Wilkerson’s comparison of social hierarchies in India and America. What stands out is how unequal treatment can become so familiar that people stop questioning it. It raises a question I want to explore: what do we accept as normal simply because we grew up around it?',
  },
  {
    title: 'Poor Economics',
    author: 'Abhijit V. Banerjee and Esther Duflo',
    coverSrc: poorEconomics,
    quote: 'the poor are no less rational than anyone else—quite the contrary.',
    note: 'It’s easy to judge a financial decision without understanding the choices someone actually has. This book takes those choices seriously. That approach fits what interests me about economics: understanding why a decision makes sense to the person making it before deciding what would help.',
  },
  {
    title: 'The Namesake',
    author: 'Jhumpa Lahiri',
    coverSrc: theNamesake,
    quote: 'That’s the thing about books. They let you travel without moving your feet.',
    note: 'What draws me to Gogol’s story is how differently a name can feel to a child and to their parents. For him, it can be something to escape; for his father, it carries a history. That disagreement makes the question of belonging feel personal and surprisingly ordinary.',
  },
  {
    title: 'Just Mercy',
    author: 'Bryan Stevenson',
    coverSrc: justMercy,
    quote: 'Each of us is more than the worst thing we’ve ever done.',
    note: 'Through my work with the Remedy Project, I’ve become interested in how people are treated after incarceration. Stevenson’s insistence on seeing the whole person speaks to that interest. His account makes the question of justice concrete: who gets heard, who gets help, and whose life is dismissed?',
  },
  {
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    coverSrc: americanah,
    quote: 'She had, finally, spun herself fully into being.',
    note: 'Ifemelu’s move to America changes how other people see her, even when she hasn’t changed in the same way. I’m interested in that part of immigration: arriving somewhere new and discovering that other people already have a story about who you are. Finding a home can involve pushing back against it.',
  },
  {
    title: 'Annihilation of Caste',
    author: 'B. R. Ambedkar',
    coverSrc: annihilationOfCaste,
    quote: 'The caste system is not merely a division of labour. It is also a division of labourers.',
    note: 'This distinction gets at why caste interests me as an economics question, too. It shapes who is expected to do certain work and who gets the freedom to choose. Ambedkar’s argument challenges the idea that a practice deserves to continue simply because it has existed for generations.',
  },
  {
    title: 'The White Tiger',
    author: 'Aravind Adiga',
    coverSrc: whiteTiger,
    quote: 'The story of a poor man’s life is written on his body, in a sharp pen.',
    note: 'Balram’s ambition is understandable, but the choices he makes are hard to defend. That’s what makes his story interesting to me. As someone who runs a business, I’m drawn to the uncomfortable questions it raises about success, who gets access to it, and what people sacrifice to reach it.',
  },
  {
    title: 'Gone',
    author: 'Michael Grant',
    coverSrc: gone,
    quote: 'One minute the teacher was talking about the Civil War. And the next minute he was gone.',
    note: 'The premise hooks me: everyone fifteen and older disappears, and the kids have to figure out what happens next. Beyond the powers and chaos, I’m interested in how quickly they start choosing leaders and drawing sides. The threat outside is frightening, but so is what they do to each other.',
  },
  {
    title: 'Caste Matters',
    author: 'Suraj Yengde',
    coverSrc: casteMatters,
    quote: 'Meanwhile, comradeship is a bond of trust that is developed through personal, social and economic sacrifices.',
    note: 'My interest in caste includes how people talk about it—and what they choose not to say. Yengde brings the consequences of caste into that conversation. His distinction between being an ally and being a comrade raises a harder question: what are we willing to give up to challenge inequality?',
  },
  {
    title: 'Interpreter of Maladies',
    author: 'Jhumpa Lahiri',
    coverSrc: interpreterOfMaladies,
    quote: 'As ordinary as it all appears, there are times when it is beyond my imagination.',
    note: 'I’m drawn to the small misunderstandings in these stories—the things people assume, leave unsaid, or struggle to explain. They give immigrant life a texture that broad descriptions can miss. Sharing a home or a background doesn’t necessarily mean two people understand what the other is going through.',
  },
  {
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    coverSrc: godOfSmallThings,
    quote: 'Things can change in a day.',
    note: 'What interests me here is how rules about caste and family reach into something as personal as love. People can treat those rules as normal even when the consequences are cruel. The small details of a family’s life make the weight of those expectations difficult to ignore.',
  },
]
