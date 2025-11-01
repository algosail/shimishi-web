<script lang="ts">
  import ListCard from '$lib/components/ListCard.svelte'
  import CardTitle from '$lib/components/CardTitle.svelte'
  import CardDesc from '$lib/components/CardDesc.svelte'
</script>

<ListCard key="create" href="/courses/add" type="Курс">
  <CardTitle title="Создать" />
  <CardDesc desc="Создай свой курс" />
</ListCard>
