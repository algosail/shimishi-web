<script lang="ts">
  import favicon from '$lib/assets/favicon.svg'
  import { JazzSvelteProvider } from 'jazz-tools/svelte'

  import { PUBLIC_JAZZ_API_KEY } from '$env/static/public'

  import { Account } from '$lib/schema'
  import AuthWrapper from '$lib/components/AuthWrapper.svelte'
  import Header from '$lib/components/Header.svelte'

  let { children } = $props()

  const apiKey = PUBLIC_JAZZ_API_KEY
  const sync = { peer: `wss://cloud.jazz.tools/?key=${apiKey}` }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<JazzSvelteProvider {sync} AccountSchema={Account}>
  <AuthWrapper>
    <Header />
    {@render children?.()}
  </AuthWrapper>
</JazzSvelteProvider>
