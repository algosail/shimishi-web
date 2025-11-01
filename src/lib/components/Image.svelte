<script lang="ts">
  import type { FileStream } from 'jazz-tools'
  import { getImageUrl, isFileStream } from '$lib/utils/getImageUrl'

  interface Props {
    file: FileStream | FileList | undefined | null
    alt: string
  }

  let { file, alt }: Props = $props()
  let src = $state<string | null>(null)

  const conver = async (file: FileStream | FileList | undefined | null) => {
    if (!file) {
      src = null
      return
    }
    src = await getImageUrl(file)
  }

  $effect(() => {
    conver(file)
  })
</script>

{#if src}
  <img {src} {alt} />
{/if}

<style>
  img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>
