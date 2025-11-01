<script lang="ts">
  interface Props {
    value: number
    label: string
  }

  let { value, label }: Props = $props()
</script>

<div>
  <span class="value">{value}</span>
  <span class="label">{label}</span>
</div>

<style>
  div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: var(--xxs);
    margin-bottom: var(--md);
    /*min-height: 50px;*/
    font-size: var(--fsb);
    color: var(--cb);
    border-top: 1px solid var(--cb);
  }

  .value {
    font-size: var(--fsl);
    font-family: 'DepartureMono';
  }

  .label {
    font-size: var(--fss);
    /*font-family: 'DepartureMono';*/
    text-transform: uppercase;
  }
</style>
