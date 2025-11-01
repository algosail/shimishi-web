<script lang="ts">
  import { goto } from '$app/navigation'
  import { co } from 'jazz-tools'
  import { CoState, AccountCoState } from 'jazz-tools/svelte'
  import { Radical, Account } from '$lib/schema'

  import type { PageProps } from './$types'

  import { isFileList } from '$lib/utils/getImageUrl'
  import RadicalForm from '$lib/components/RadicalForm.svelte'
  import type { RadicalValue } from '$lib/components/RadicalForm.svelte'

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

  const onclose = () => {
    goto(`/courses/${params.courseId}/${params.chapterId}/radicals/${params.radicalId}`)
  }

  let onsave = async (values: RadicalValue) => {
    if (!radical.current) return

    const owner = radical.current.$jazz.owner

    if (values.image && isFileList(values.image)) {
      const file = values.image.item(0)
      if (file) {
        const image = await co.fileStream().createFromBlob(file, { owner })
        radical.current.$jazz.set('image', image)
      } else {
        radical.current.$jazz.set('image', undefined)
      }
    }

    radical.current.$jazz.set('character', values.character)
    radical.current.$jazz.set('name', values.name)
    radical.current.$jazz.set('nameAlternatives', values.nameAlternatives)
    radical.current.$jazz.set('mnemonic', values.mnemonic)

    onclose()
  }
</script>

{#if radical.current}
  <RadicalForm
    title="Редактировать"
    defaultValues={{
      ...radical.current,
      nameAlternatives: radical.current.nameAlternatives ?? [],
    }}
    {onclose}
    {onsave}
  />
{/if}
