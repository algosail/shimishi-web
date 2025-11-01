<script lang="ts" module>
  export interface CreateCourseValue {
    name: string
    description: string
  }
</script>

<script lang="ts">
  import { fly } from 'svelte/transition'

  interface Props {
    onclose: () => void
    oncreate: (value: CreateCourseValue) => void
  }

  let { onclose, oncreate }: Props = $props()

  let values = $state<CreateCourseValue>({ name: '', description: '' })

  const onCreate = () => oncreate(values)
</script>

<div in:fly={{ y: 200 }} class="wrapper">
  <section class="container">
    <div class="head">
      <h2>Новый курс</h2>
      <button onclick={onclose}>Закрыть</button>
    </div>
    <div class="form">
      <input bind:value={values.name} placeholder="Имя курса" />
      <textarea bind:value={values.description} placeholder="Описание"></textarea>
      <button onclick={onCreate}>Создать</button>
    </div>
  </section>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 2;
    padding: var(--sm);
    background: var(--gv-ll);
  }

  .container {
    width: 100%;
    max-width: 440px;
    padding: var(--md) var(--md) var(--lg);
    background: var(--cw);
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
    font-family: 'DepartureMono';
    margin: 0;
  }
</style>
