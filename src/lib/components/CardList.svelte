<script lang="ts">
  import type { Snippet } from 'svelte'
  import { fly } from 'svelte/transition'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<div>
  {@render children()}
</div>

<style>
  div {
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: var(--md) var(--md) 0;
    margin: 0;
    gap: var(--md);
    flex-grow: 2;
    height: 100%;
    list-style: none;
    background: var(--gradient);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
</style>
