<script lang="ts">
  let { desc }: { desc: string } = $props()
</script>

<span>{desc}</span>

<style>
  span {
    padding-top: var(--xxs);
    margin-bottom: var(--md);
    min-height: 100px;
    font-size: var(--fsb);
    color: var(--cb);
    border-top: 1px solid var(--cb);
  }
</style>
