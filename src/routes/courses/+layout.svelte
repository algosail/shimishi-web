<script lang="ts">
  import { AccountCoState } from 'jazz-tools/svelte'
  import { Account } from '$lib/schema'

  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'

  import type { LayoutProps } from './$types'

  let { children }: LayoutProps = $props()

  const me = new AccountCoState(Account, {
    resolve: { root: { courses: true } },
  })
</script>

<main>
  <h1>Мои курсы</h1>
  <CardList --gradient="var(--gh-j)">
    {@render children()}
    {#each me.current?.root.courses || [] as course}
      {#if course}
        <ListCard key={course.$jazz.id} href={`/courses/${course.$jazz.id}`} type="Курс">
          <CardTitle title={course.name} />
          <CardDesc desc={course.description} />
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

  h1 {
    padding: var(--sm) var(--sm) var(--md);
    margin: 0;
    font-size: var(--fst);
  }
</style>
