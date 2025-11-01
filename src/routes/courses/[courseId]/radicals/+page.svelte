<script lang="ts">
  import { goto } from '$app/navigation'

  import { CoState } from 'jazz-tools/svelte'
  import { Course } from '$lib/schema'
  import type { PageProps } from './$types'

  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'

  let { params }: PageProps = $props()

  let isCreate = $state(false)

  const course = new CoState(Course, params.courseId, {
    resolve: { radicals: true },
  })

  const onadd = () => {
    goto(`/courses/${params.courseId}/radicals/add`)
  }
</script>

<CardList --gradient="var(--gv-z)">
  <span>{course.current?.radicals.length}</span>
  <ListCard key="add-button" onclick={onadd} type="Радикал">
    <CardTitle title="Добавить" />
    <CardDesc desc="Новый радикал для кандзи" />
  </ListCard>
  {#each course.current?.radicals as radical}
    {#if radical}
      <ListCard
        key={radical.$jazz.id}
        href={`/courses/${params.courseId}/radicals/${radical.$jazz.id}`}
        type="Радикал"
      >
        <CardTitle title={radical.character} />
        <CardDesc desc={radical.name} />
      </ListCard>
    {/if}
  {/each}
</CardList>

<style>
  span {
    position: absolute;
    top: var(--md);
    left: var(--md);
    color: var(--cw);
    font-size: var(--fst);
  }
</style>
