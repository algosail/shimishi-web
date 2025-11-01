<script lang="ts">
  let { title }: { title: string } = $props()
</script>

<span>{title}</span>

<style>
  span {
    padding-top: var(--md);
    margin-bottom: var(--md);
    min-height: 100px;
    font-size: var(--fsl);
    font-weight: 600;
    color: var(--cb);
    border-top: 1px solid var(--cb);
  }
</style>
