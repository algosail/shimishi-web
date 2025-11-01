<script lang="ts">
  import { page } from '$app/state'
  import { CoState } from 'jazz-tools/svelte'
  import { Course, Chapter } from '$lib/schema'
  import type { LayoutProps } from './$types'

  let { params, children }: LayoutProps = $props()

  const course = new CoState(Course, params.courseId)

  const chapter = new CoState(Chapter, params.chapterId)

  const radicalsUrl = `/courses/${params.courseId}/${params.chapterId}/radicals`
  const kanjiUrl = `/courses/${params.courseId}/${params.chapterId}/kanji`
  const vocabularyUrl = `/courses/${params.courseId}/${params.chapterId}/vocabulary`
  const grammarUrl = `/courses/${params.courseId}/${params.chapterId}/grammar`
  const lessonsUrl = `/courses/${params.courseId}/${params.chapterId}/lessons`

  const isCurrent = (url: string) => page.url.pathname === url
</script>

<main>
  <div>
    <h1>Глава {chapter.current?.index}</h1>
    <p><a href={`/courses/${params.courseId}/`}>{course.current?.name}</a></p>
  </div>
  <nav>
    <a href={radicalsUrl} class:current={isCurrent(radicalsUrl)}>Радикалы</a>
    <a href={kanjiUrl} class:current={isCurrent(kanjiUrl)}>Кандзи</a>
    <a href={vocabularyUrl} class:current={isCurrent(vocabularyUrl)}>Слова</a>
    <a href={grammarUrl} class:current={isCurrent(grammarUrl)}>Правила</a>
    <a href={lessonsUrl} class:isCurrent(lessonsUrl)>Уроки</a>
  </nav>
  {@render children()}
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
    padding: var(--md) var(--sm) 0;
    gap: var(--lg);
  }

  h1 {
    margin: 0;
    font-size: var(--fst);
  }

  p {
    margin: 0;
  }

  nav {
    display: flex;
    align-items: baseline;
    gap: var(--sm);
    padding: var(--xs) var(--sm) var(--md);
    font-size: var(--fss);
    overflow-x: auto;
  }

  .current {
    /*font-weight: 600;*/
    border-color: transparent;
    pointer-events: none;
  }
</style>
