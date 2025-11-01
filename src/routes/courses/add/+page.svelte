<script lang="ts">
  import { goto } from '$app/navigation'

  import { Group } from 'jazz-tools'
  import { AccountCoState } from 'jazz-tools/svelte'
  import { Account, Course } from '$lib/schema'

  import CreateCourse from '$lib/components/CreateCourse.svelte'
  import type { CreateCourseValue } from '$lib/components/CreateCourse.svelte'

  const me = new AccountCoState(Account, {
    resolve: { root: { courses: true } },
  })

  let create = $state(false)

  const onclose = () => {
    goto('/courses')
  }

  const oncreate = (values: CreateCourseValue) => {
    const group = Group.create()

    const course = Course.create(
      {
        ...values,
        chapters: [],
        radicals: [],
        kanji: [],
        vocabulary: [],
        grammar: [],
        lessons: [],
      },
      { owner: group },
    )

    me.current?.root.courses.$jazz.push(course)

    onclose()
  }
</script>

<CreateCourse {onclose} {oncreate} />
