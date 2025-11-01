<script lang="ts">
  import { goto } from '$app/navigation'

  import { CoState, AccountCoState } from 'jazz-tools/svelte'
  import { Account, Course } from '$lib/schema'

  import type { LayoutProps } from './$types'

  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'

  let { params, children }: LayoutProps = $props()

  const me = new AccountCoState(Account)

  const course = new CoState(Course, params.courseId, {
    resolve: { radicals: true },
  })

  let index = $derived(
    course.current?.radicals.findIndex((it) => it?.$jazz.id === params.radicalId) ?? 0,
  )

  let prev = $derived(course.current?.radicals.slice(0, index))
  let next = $derived(course.current?.radicals.slice(index + 1))
</script>

<CardList --gradient="var(--gv-z)">
  <ListCard
    key="add-button"
    href={`/courses/${params.courseId}/${params.chapterId}/radicals/add`}
    type="Радикал"
  >
    <CardTitle title="Добавить" />
    <CardDesc desc="Новый Радикал для кандзи" />
  </ListCard>
  {#each prev as radical}
    {#if radical}
      <ListCard
        key={radical.$jazz.id}
        href={`/courses/${params.courseId}/${params.chapterId}/radicals/${radical.$jazz.id}`}
        type="Радикал"
      >
        <CardTitle title={radical.character} />
        <CardDesc desc={radical.name} />
      </ListCard>
    {/if}
  {/each}
  {@render children()}
  {#each next as radical}
    {#if radical}
      <ListCard
        key={radical.$jazz.id}
        href={`/courses/${params.courseId}/${params.chapterId}/radicals/${radical.$jazz.id}`}
        type="Радикал"
      >
        <CardTitle title={radical.character} />
        <CardDesc desc={radical.name} />
      </ListCard>
    {/if}
  {/each}
</CardList>
