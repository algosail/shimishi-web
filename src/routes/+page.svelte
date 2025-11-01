<script lang="ts">
  const dt = new Date()
  const today = dt.toLocaleDateString()
</script>

<main>
  <h1>{today}</h1>
</main>

<style>
  h1 {
    padding: var(--sm);
    margin: 0;
    font-family: 'DepartureMono';
    font-size: var(--fst);
  }
</style>
