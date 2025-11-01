<script lang="ts">
  import { goto } from '$app/navigation'

  import { co, FileStream } from 'jazz-tools'
  import { CoState } from 'jazz-tools/svelte'
  import { Course, Radical } from '$lib/schema'
  import type { PageProps } from './$types'
  import CardList from '$lib/components/CardList.svelte'
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'
  import RadicalForm from '$lib/components/RadicalForm.svelte'
  import type { RadicalValue } from '$lib/components/RadicalForm.svelte'
  import { isFileList } from '$lib/utils/getImageUrl'

  let { params }: PageProps = $props()

  const course = new CoState(Course, params.courseId, {
    resolve: { radicals: true },
  })

  const onclose = () => {
    goto(`/courses/${params.courseId}/radicals`)
  }

  const onsave = async (values: RadicalValue) => {
    if (!course.current) return

    const owner = course.current.$jazz.owner

    let image: FileStream | undefined = undefined

    if (values.image && isFileList(values.image)) {
      const file = values.image.item(0)
      if (file) {
        image = await co.fileStream().createFromBlob(file, { owner })
      }
    }

    const radical = Radical.create({ ...values, image }, { owner })
    const res = course.current.radicals.$jazz.push(radical)

    onclose()
  }
</script>

<CardList --gradient="var(--gv-z)">
  <RadicalForm title="Новый Радикал" {onsave} {onclose} />
  {#each course.current?.radicals as radical}
    {#if radical}
      <ListCard
        key={radical.$jazz.id}
        href={`/courses/${params.courseId}/radicals/${radical.$jazz.id}`}
        type="Радикал"
      >
        <CardTitle title={radical.character} />
        <CardDesc desc={radical.name} />
      </ListCard>
    {/if}
  {/each}
</CardList>
