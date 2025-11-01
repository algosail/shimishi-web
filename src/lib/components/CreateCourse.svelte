<script lang="ts" module>
  export interface CreateCourseValue {
    name: string
    description: string
  }
</script>

<script lang="ts">
  import { blur } from 'svelte/transition'

  interface Props {
    onclose: () => void
    oncreate: (value: CreateCourseValue) => void
  }

  let { onclose, oncreate }: Props = $props()

  let values = $state<CreateCourseValue>({ name: '', description: '' })

  const onadd = () => oncreate(values)

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
    <h2>Новый курс</h2>
    <button onclick={onclose}>Закрыть</button>
  </div>
  <div class="form">
    <input bind:value={values.name} placeholder="Имя курса" />
    <textarea bind:value={values.description} placeholder="Описание"></textarea>
    <button onclick={onadd}>Добавить</button>
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
    gap: var(--sm);
  }

  h2 {
    margin: 0;
  }
</style>
