<script>
    import { auth } from '../stores/auth'
    import { history } from '../stores/history'
    import { shortenLink } from '../utils/api'

    let link
</script>

Dashboard

<pre>
    {JSON.stringify($history, null, 4)}
</pre>

<button on:click={$auth.signOut}>
    Sign out
</button>

<hr>

<div>
    <input type="url" bind:value={link} required class="bg-gray-200">
    <button on:click={() => shortenLink(link)}>Shorten</button>
</div>