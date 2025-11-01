<script lang="ts">
  import { goto } from '$app/navigation'
  import { CoState, AccountCoState } from 'jazz-tools/svelte'
  import { Radical, Account } from '$lib/schema'

  import type { PageProps } from './$types'

  import RadicalCard from '$lib/components/RadicalCard.svelte'

  let { params }: PageProps = $props()

  const me = new AccountCoState(Account)

  let radical = $derived(
    new CoState(Radical, params.radicalId, {
      resolve: { image: true },
    }),
  )

  let isWriter = $derived(
    me.current && radical.current ? me.current.canWrite(radical.current) : false,
  )

  const onedit = () => {
    goto(`/courses/${params.courseId}/radicals/${params.radicalId}/edit`)
  }
</script>

{#if radical.current}
  <RadicalCard data={radical.current} onedit={isWriter ? onedit : undefined} />
{/if}
