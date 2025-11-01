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

  const onadd = () => {
    goto(`/courses/${params.courseId}/radicals/add`)
  }

  const onkeydown = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & Window
    },
  ) => {
    if (e.key === 'Enter') {
      goto(`/courses/${params.courseId}/radicals/${params.radicalId}/edit`)
    }

    if (e.key === 'ArrowLeft') {
      if (prev?.[index - 1]) {
        goto(`/courses/${params.courseId}/radicals/${prev?.[index - 1]!.$jazz.id}`)
      } else {
        goto(`/courses/${params.courseId}/radicals/add`)
      }
    }

    if (e.key === 'ArrowRight' && next?.[0]) {
      goto(`/courses/${params.courseId}/radicals/${next?.[0].$jazz.id}`)
    }
  }
</script>

<svelte:window {onkeydown} />

<CardList --gradient="var(--gv-z)">
  <ListCard key="add-button" onclick={onadd} type="Радикал">
    <CardTitle title="Добавить" />
    <CardDesc desc="Новый Радикал для кандзи" />
  </ListCard>
  {#each prev as radical}
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
  {@render children()}
  {#each next as radical}
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
