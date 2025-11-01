import { co, z } from 'jazz-tools'

export const Radical = co.map({
  character: z.string(),
  name: z.string(),
  nameAlternatives: z.array(z.string()),
  mnemonic: z.string(),
  image: co.optional(co.fileStream()),
})

export const Kanji = co.map({
  character: z.string(),
  radicals: co.list(Radical),
  meaning: z.string(),
  meaningAlternatives: z.array(z.string()),
  meaningMnemonic: z.string(),
  onyomi: z.array(z.string()),
  kunyomi: z.array(z.string()),
  nanori: z.array(z.string()),
  readingMnemonic: z.string(),
})

export const Word = co.map({
  japanese: z.string(),
  kanji: co.list(Kanji),
  partOfSpeech: z.array(z.string()),
  meaning: z.string(),
  meaningAlternatives: z.array(z.string()),
  meaningMnemonic: z.string(),
  reading: z.string(),
  readingMnemonic: z.string(),
  audio: co.optional(co.fileStream()),
  context: z.array(
    z.object({
      expression: z.string(),
      combinations: z.array(z.string()),
    }),
  ),
})

export const Sentence = co.map({
  japanese: z.string(),
  meaning: z.string(),
  audio: co.optional(co.fileStream()),
  grammarMap: z.string(),
})

export const Grammar = co.map({
  title: z.string(),
  subTitle: z.string(),
  explanation: z.string(),
  prompt: z.string(),
  fakeHelpers: z.array(z.string()),
  examples: co.list(Sentence),
})

export const Lesson = co.map({
  title: z.string(),
  subTitle: z.string(),
  content: z.string(),
  wordsCondition: co.list(Word),
  grammarCondition: co.list(Grammar),
  unlockGrammar: co.list(Grammar),
})

export const Chapter = co.map({
  index: z.number(),
  radicals: co.list(Radical),
  kanji: co.list(Kanji),
  vocabulary: co.list(Word),
  grammar: co.list(Grammar),
  lessons: co.list(Lesson),
})

export const Course = co.map({
  name: z.string(),
  description: z.string(),
  chapters: co.list(Chapter),
  radicals: co.list(Radical),
  kanji: co.list(Kanji),
  vocabulary: co.list(Word),
  grammar: co.list(Grammar),
  lessons: co.list(Lesson),
})

export const UserChapter = co.map({
  course: Course,
  chapter: Chapter,
})

export const UserRadical = co.map({
  radical: Radical,
  level: z.number().min(0).max(9),
  currentStrike: z.number().min(0),
  longestStrike: z.number().min(0),
  meaningSuccess: z.number().min(0),
  meaningFailure: z.number().min(0),
})

export const UserKanji = co.map({
  kanji: Kanji,
  level: z.number().min(0).max(9),
  currentStrike: z.number().min(0),
  longestStrike: z.number().min(0),
  meaningSuccess: z.number().min(0),
  meaningFailure: z.number().min(0),
  readingSuccess: z.number().min(0),
  readingFailure: z.number().min(0),
})

export const UserWord = co.map({
  word: Word,
  level: z.number().min(0).max(9),
  currentStrike: z.number().min(0),
  longestStrike: z.number().min(0),
  meaningSuccess: z.number().min(0),
  meaningFailure: z.number().min(0),
  readingSuccess: z.number().min(0),
  readingFailure: z.number().min(0),
})

export const UserGrammar = co.map({
  grammar: Grammar,
  level: z.number().min(0).max(9),
  currentStrike: z.number().min(0),
  longestStrike: z.number().min(0),
  meaningSuccess: z.number().min(0),
  meaningFailure: z.number().min(0),
  readingSuccess: z.number().min(0),
  readingFailure: z.number().min(0),
})

export const RadicalReview = co.map({
  type: z.literal('radical'),
  item: Radical,
  userData: UserRadical,
  start: z.date(),
})

export const KanjiReview = co.map({
  type: z.literal('kanji'),
  item: Kanji,
  userData: UserKanji,
  start: z.date(),
  isMeaningSuccess: z.optional(z.boolean()),
  isReadingSuccess: z.optional(z.boolean()),
})

export const WordReview = co.map({
  type: z.literal('word'),
  item: Word,
  userData: UserWord,
  start: z.date(),
  isMeaningSuccess: z.optional(z.boolean()),
  isReadingSuccess: z.optional(z.boolean()),
})

export const Review = co.discriminatedUnion('type', [RadicalReview, KanjiReview, WordReview])

export const Root = co.map({
  courses: co.list(Course),
  chapters: co.list(UserChapter),
  radicals: co.list(UserRadical),
  kanji: co.list(UserKanji),
  words: co.list(UserWord),
  grammar: co.list(UserGrammar),
  lessonsCompleted: co.list(Lesson),
  reviews: co.list(Review),
})

export const Profile = co.map({
  name: z.string(),
})

export const Account = co
  .account({
    root: Root,
    profile: Profile,
  })
  .withMigration((account) => {
    if (!account.$jazz.has('root')) {
      account.$jazz.set('root', {
        courses: [],
        chapters: [],
        radicals: [],
        kanji: [],
        words: [],
        grammar: [],
        lessonsCompleted: [],
        reviews: [],
      })
    }
  })
