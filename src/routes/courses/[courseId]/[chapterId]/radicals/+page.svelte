<script lang="ts">
  import { goto } from '$app/navigation'

  import { CoState } from 'jazz-tools/svelte'
  import { Chapter } from '$lib/schema'
  import type { PageProps } from './$types'

  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'

  let { params }: PageProps = $props()

  let isCreate = $state(false)

  const chapter = new CoState(Chapter, params.chapterId, {
    resolve: { radicals: true },
  })

  const onadd = () => {
    goto(`/courses/${params.courseId}/${params.chapterId}/radicals/add`)
  }
</script>

<CardList --gradient="var(--gv-z)">
  <ListCard key="add-button" onclick={onadd} type="Радикал">
    <CardTitle title="Добавить" />
    <CardDesc desc="Новый радикал для кандзи" />
  </ListCard>
  {#each chapter.current?.radicals as radical}
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
