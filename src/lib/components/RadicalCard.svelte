<script lang="ts" module>
  import type { FileStream } from 'jazz-tools'

  export interface RadicalData {
    character: string
    name: string
    nameAlternatives?: string[]
    mnemonic: string
    image: FileStream | FileList | undefined | null
  }
</script>

<script lang="ts">
  import { blur } from 'svelte/transition'
  import { marked } from 'marked'

  import Image from './Image.svelte'
  import CardTitle from './CardTitle.svelte'
  import CardDesc from './CardDesc.svelte'

  interface Props {
    data: RadicalData
    onedit?: () => void
  }

  let { data, onedit }: Props = $props()

  let el: HTMLDivElement

  $effect(() => {
    if (!el || !data.character) return
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
</script>

<div in:blur bind:this={el} class="container">
  <div class="wrapper">
    <div class="meta">
      <span class="type">Радикал</span>
      <CardTitle title={data.character} />
      <CardDesc desc={data.name} />
      {#if data.nameAlternatives?.length}
        <CardDesc desc={data.nameAlternatives.join(', ')} />
      {/if}
    </div>
    <div class="image">
      <Image file={data.image} alt={`${data.name} Визуальная мнемоника`} />
    </div>
  </div>
  <div class="mnemonic">
    <span class="type">Мнемоника</span>
    <p>
      {@html marked(data.mnemonic)}
    </p>
  </div>
  <div class="actions">
    {#if onedit}
      <button onclick={onedit}>Изменить</button>
    {/if}
  </div>
</div>

<style>
  .container {
    width: calc(100vw - var(--md) * 2);
    max-width: 600px;
    flex-shrink: 0;
    padding: var(--md) var(--md) var(--md);
    background: var(--cw);
    scroll-snap-align: start;
    scroll-margin-left: var(--sm);
    scroll-margin-right: var(--sm);
  }

  .wrapper {
    display: flex;
  }

  .meta {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 40%;
  }

  .image {
    display: flex;
    flex-grow: 1;
    flex-basis: 60%;
  }

  .type {
    width: 100%;
    padding-bottom: var(--xxs);
    font-size: var(--fsc);
    text-transform: uppercase;
  }

  .mnemonic {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--cb);
  }

  p {
    margin: 0 0 var(--xxl);
    padding-top: var(--xs);
    border-top: 1px solid var(--cb);
  }

  .actions {
    display: flex;
    gap: var(--sm);
    padding-top: var(--xs);
    border-top: 1px solid var(--cb);
  }
</style>
