<script lang="ts">
  import { CoState } from 'jazz-tools/svelte'
  import { Course, Chapter } from '$lib/schema'
  import type { PageProps } from './$types'

  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'
  import CardStat from '$lib/components/CardStat.svelte'

  let { params }: PageProps = $props()

  const course = new CoState(Course, params.courseId, {
    resolve: { chapters: true },
  })

  const onadd = () => {
    if (!course.current) return

    const chapter = Chapter.create(
      {
        index: course.current?.chapters.length,
        radicals: [],
        kanji: [],
        vocabulary: [],
        grammar: [],
        lessons: [],
      },
      { owner: course.current.$jazz.owner },
    )

    course.current.chapters.$jazz.push(chapter)
  }
</script>

<main>
  <div>
    <h1>{course.current?.name}</h1>
    <p>{course.current?.description}</p>
  </div>
  <CardList --gradient="var(--gh-x)">
    <ListCard key="add-chapter" onclick={onadd} type="Глава">
      <CardTitle title="Добавить" />
      <CardDesc desc="Новая глава со следующим номером" />
    </ListCard>
    {#each course.current?.chapters || [] as chapter}
      {#if chapter}
        <ListCard
          key={chapter.$jazz.id}
          href={`/courses/${params.courseId}/${chapter.$jazz.id}`}
          type="Глава"
        >
          <CardTitle title={chapter.index.toString().padStart(2, '0')} />
          <CardStat value={chapter.radicals?.length ?? 0} label="Радикалы" />
          <CardStat value={chapter.kanji?.length ?? 0} label="Кандзи" />
          <CardStat value={chapter.vocabulary?.length ?? 0} label="Слова" />
          <CardStat value={chapter.grammar?.length ?? 0} label="Правила" />
          <CardStat value={chapter.lessons?.length ?? 0} label="Уроки" />
        </ListCard>
      {/if}
    {/each}
  </CardList>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 42px);
  }

  div {
    display: flex;
    align-items: baseline;
    padding: var(--md) var(--sm);
    gap: var(--lg);
  }

  h1 {
    margin: 0;
    font-size: var(--fst);
  }

  p {
    margin: 0;
  }
</style>
