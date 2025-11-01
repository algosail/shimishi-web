<script lang="ts" module>
  import type { FileStream } from 'jazz-tools'

  export interface RadicalValue {
    character: string
    name: string
    nameAlternatives: string[]
    mnemonic: string
    image: FileList | FileStream | undefined | null
  }
</script>

<script lang="ts">
  import { blur } from 'svelte/transition'

  import { getImageUrl, isFileStream } from '$lib/utils/getImageUrl'
  import ImageInput from './ImageInput.svelte'

  interface Props {
    title: string
    defaultValues?: RadicalValue
    onsave: (values: RadicalValue) => void
    onclose?: () => void
    ondelete?: () => void
  }

  let { title, defaultValues, onsave, onclose, ondelete }: Props = $props()

  let values = $state<RadicalValue>(
    defaultValues ?? {
      character: '',
      name: '',
      nameAlternatives: [],
      mnemonic: '',
      image: new DataTransfer().files,
    },
  )

  const addalternative = () => {
    values.nameAlternatives.push('')
  }

  const delalternative = (i: number) => {
    values.nameAlternatives = [
      ...values.nameAlternatives.slice(0, i),
      ...values.nameAlternatives.slice(i + 1),
    ]
  }

  let el: HTMLDivElement

  $effect(() => {
    if (!el) return
    el.scrollIntoView({
      behavior: 'smooth',
    })
  })
</script>

<div in:blur bind:this={el} class="container">
  <div class="head">
    <h2>{title}</h2>
    {#if onclose}
      <button onclick={onclose}>Закрыть</button>
    {/if}
  </div>
  <div class="form">
    <input type="text" name="character" bind:value={values.character} placeholder="Символ" />
    <input type="text" name="name" bind:value={values.name} placeholder="Имя" />
    <ul>
      {#each values.nameAlternatives as altName, i}
        <li>
          <input
            type="text"
            bind:value={values.nameAlternatives[i]}
            placeholder="Альтернативное имя"
          />
          <button onclick={() => delalternative(i)}>Удалить</button>
        </li>
      {/each}
    </ul>
    <button onclick={addalternative}>Добавиль альтернативное имя</button>
    <ImageInput bind:value={values.image} label="Добавить изображение" />
    <textarea name="mnemonic" bind:value={values.mnemonic} placeholder="Мнемоника"></textarea>
    <div class="button-group">
      <button onclick={() => onsave(values)}>Сохранить</button>
      {#if ondelete}
        <button onclick={ondelete}>Уладить</button>
      {/if}
    </div>
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
  }

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: var(--lg);
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--md);
  }

  h2 {
    margin: 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--sm);
    margin: 0;
    padding: 0;
  }

  ul:empty {
    display: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: var(--sm);
  }

  li input {
    flex-grow: 2;
  }
</style>
