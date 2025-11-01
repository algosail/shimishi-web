<script lang="ts">
  import type { FileStream } from 'jazz-tools'

  import { isFileList, isFileStream } from '$lib/utils/getImageUrl'

  interface Props {
    label: string
    value: FileStream | FileList | undefined | null
  }

  let { label, value = $bindable() }: Props = $props()

  $effect(() => {
    if (!value) {
      value = new DataTransfer().files
    }
  })

  const clear = () => {
    value = new DataTransfer().files
  }
</script>

<div>
  {#if value && isFileStream(value)}
    <span>{value.getChunks()?.fileName ?? 'Изображение'}</span>
    <button onclick={clear}>Удалить</button>
  {:else if value && isFileList(value) && value.length}
    <span>{value.item(0)?.name}</span>
    <button onclick={clear}>Удалить</button>
  {:else}
    <label for="image">{label}</label>
  {/if}
  {#if value && isFileList(value)}
    <input accept="image" bind:files={value} id="image" name="image" type="file" />
  {/if}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  input[type='file'] {
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  label[for='image'] {
    border-bottom: 1px solid var(--cg);
    cursor: pointer;
  }

  label[for='image']:focus {
    background: var(--cg);
  }

  label[for='image']:hover {
    border-bottom: 1px solid var(--cb);
  }
</style>
