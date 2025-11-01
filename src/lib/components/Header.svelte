<script lang="ts">
  import { page } from '$app/state'

  import { AccountCoState } from 'jazz-tools/svelte'
  import { Account } from '$lib/schema'

  const me = new AccountCoState(Account)
</script>

<header>
  <span class="noto-sans-jp-400 title">シミシ</span>
  <nav>
    <a href="/" class:current={page.url.pathname === '/'}>Прогресс</a>
    <a href="/courses" class:current={page.url.pathname === '/courses'}>Курсы</a>
  </nav>
  <span class="noto-sans-400 profile">{me.current?.profile?.name}</span>
</header>

<style>
  header {
    display: flex;
    align-items: baseline;
    padding: var(--sm);
    font-size: var(--fss);
  }

  .title {
    font-weight: 600;
  }

  nav {
    display: flex;
    align-items: baseline;
    gap: var(--sm);
    margin: 0 var(--sm);
  }

  .current {
    font-weight: 600;
    border-color: transparent;
    pointer-events: none;
  }

  .profile {
    margin-left: auto;
  }
</style>
