<script lang="ts">
  import type { Snippet } from 'svelte'

  import { blur } from 'svelte/transition'

  interface Props {
    onclick?: () => void
    href?: string
    type: string
    key: string
    children: Snippet
  }

  let { onclick, href, type, key, children }: Props = $props()
</script>

{#if href}
  {#key key}
    <a {href} in:blur>
      <span>{type}</span>
      {@render children()}
    </a>
  {/key}
{:else}
  {#key key}
    <button {onclick} in:blur>
      <span>{type}</span>
      {@render children()}
    </button>
  {/key}
{/if}

<style>
  button,
  a {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 200px;
    height: 100%;
    padding: var(--sm) var(--sm) var(--md);
    text-align: left;
    background: var(--cw);
    color: var(--cb);
    transform-origin: 0% 100%;
    transition: 0.2s;
    scroll-snap-align: start;
    scroll-margin-left: var(--sm);
  }

  button:hover,
  a:hover {
    padding-bottom: var(--xxl);
  }

  span {
    width: 100%;
    padding-bottom: var(--xxs);
    font-size: var(--fsc);
    text-transform: uppercase;
    color: var(--color);
  }
</style>
