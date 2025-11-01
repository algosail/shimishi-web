<script lang="ts">
  import { Group } from 'jazz-tools'
  import { AccountCoState } from 'jazz-tools/svelte'
  import { Account, Course } from '$lib/schema'

  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'
  import CreateCourse from '$lib/components/CreateCourse.svelte'
  import type { CreateCourseValue } from '$lib/components/CreateCourse.svelte'

  const me = new AccountCoState(Account, {
    resolve: { root: { courses: true } },
  })

  let create = $state(false)

  const oncreate = (values: CreateCourseValue) => {
    const group = Group.create()

    const course = Course.create(
      {
        ...values,
        chapters: [],
        radicals: [],
        kanji: [],
        vocabulary: [],
        grammar: [],
        sentences: [],
        lessons: [],
      },
      { owner: group },
    )

    me.current?.root.courses.$jazz.push(course)

    create = false
  }
</script>

<main>
  <h1>Мои курсы</h1>
  {#if create}
    <CreateCourse onclose={() => (create = false)} {oncreate} />
  {:else}
    <CardList --gradient="var(--gh-j)">
      <ListCard onclick={() => (create = true)} type="Курс">
        <CardTitle title="Создать" />
        <CardDesc desc="Создай свой курс" />
      </ListCard>
      {#each me.current?.root.courses || [] as course}
        {#if course}
          <ListCard href={`/courses/${course.$jazz.id}`} type="Курс">
            <CardTitle title={course.name} />
            <CardDesc desc={course.description} />
          </ListCard>
        {/if}
      {/each}
    </CardList>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 42px);
  }

  h1 {
    padding: var(--sm);
    margin: 0;
    /*font-family: 'DepartureMono';*/
    font-size: var(--fst);
  }
</style>
