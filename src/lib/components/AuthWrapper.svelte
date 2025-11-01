<script lang="ts">
  import type { Snippet } from 'svelte'
  import { usePassphraseAuth } from 'jazz-tools/svelte'

  import { wordlist } from '$lib/wordlist'

  let { children }: { children?: Snippet } = $props()
  let step = $state<'initial' | 'create' | 'login'>('initial')
  let loginPassphrase = $state('')
  let username = $state('')
  let isCopied = $state(false)

  const auth = usePassphraseAuth({ wordlist })

  const onLogin = () => {
    step = 'login'
  }

  const onCreate = () => {
    step = 'create'
  }

  const onBack = () => {
    step = 'initial'
    loginPassphrase = ''
  }

  const onLoginSubmit = async () => {
    await auth.logIn(loginPassphrase)
  }

  const onCopy = async () => {
    await navigator.clipboard.writeText(auth.passphrase)
    isCopied = true
  }

  const onSignUp = async () => {
    await auth.signUp(username)
  }
</script>

{#if auth.state === 'anonymous'}
  <div class="wrapper">
    {#if step === 'initial'}
      <h1>Auth</h1>
    {:else if step === 'login'}
      <h1>Log In</h1>
    {:else if step === 'create'}
      <h1>Create Account</h1>
    {/if}
    <div class="container">
      <div class="block">
        {#if step === 'initial'}
          <button onclick={onLogin}>Log In</button>
          <button onclick={onCreate}>Create Account</button>
        {:else if step === 'login'}
          <textarea bind:value={loginPassphrase} placeholder="Enter your passphrase"></textarea>
          <button onclick={onLoginSubmit}> Log In </button>
          <button onclick={onBack}>Back</button>
        {:else if step === 'create'}
          <p>Your passphrase (save this somewhere safe):</p>
          <textarea rows="4" bind:value={auth.passphrase} readonly></textarea>
          <button onclick={onCopy}>{isCopied ? 'Copied!' : 'Copy Passphrase'}</button>
          <input type="text" bind:value={username} placeholder="Enter your username" />
          <button onclick={onSignUp} disabled={!username || !isCopied}>Create Account</button>
          <button onclick={onBack}>Back</button>
        {/if}
      </div>
    </div>
  </div>
{:else}
  {@render children?.()}
{/if}

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  h1 {
    margin: 0;
    padding: var(--size-md);
    font-size: var(--font-size-title);
  }

  p {
    margin: 0;
    font-size: var(--font-size-base);
  }

  .container {
    display: flex;
    align-items: flex-start;
    flex-grow: 2;
    background: var(--gv-ka);
  }

  .block {
    display: flex;
    flex-direction: column;
    gap: var(--size-sm);
    width: 100%;
    max-width: 480px;
    padding: 0 var(--size-md) var(--size-lg);
    background: var(--cw);
  }

  textarea {
    padding: 0 var(--size-xs);
    font-family: inherit;
    font-size: var(--font-size-base);
    background: transparent;
    border: none;
    border-left: 1px solid var(--cg);
    outline: none;
    resize: none;
  }

  input {
    padding: var(--size-xs) 0;
    font-family: inherit;
    font-size: var(--font-size-base);
    border: none;
    border-bottom: 1px solid var(--cg);
  }
</style>
