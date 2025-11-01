<script lang="ts">
  import { AccountCoState } from 'jazz-tools/svelte'
  import { Account } from '$lib/schema'

  const me = new AccountCoState(Account, {
    resolve: { root: { courses: true } },
  })

  const logout = () => {
    me.logOut()
  }
</script>

<main>
  <h1>{me.current?.profile?.name}</h1>
  <div class="container">
    <div class="box">
      <p>В процессе разработки...</p>
      <button onclick={logout}>Выйти из профиля</button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 42px);
  }

  h1 {
    padding: var(--sm) var(--sm) var(--md);
    margin: 0;
    font-size: var(--fst);
  }

  .container {
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: var(--md) var(--md) 0;
    margin: 0;
    gap: var(--md);
    flex-grow: 2;
    height: 100%;
    list-style: none;
    background: var(--gr-ki);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .box {
    width: calc(100vw - var(--md) * 2);
    max-width: 600px;
    flex-shrink: 0;
    padding: var(--md) var(--md) var(--md);
    background: var(--cw);
    scroll-snap-align: start;
    scroll-margin-left: var(--sm);
  }
</style>
