<script lang="ts">
    import { auth } from '../stores/auth'
</script>

{#if $auth.user}
    logged in as {$auth.user?.email}
    <button on:click={$auth.signOut}>Log out</button>
{:else}
    <button on:click={$auth.signIn}>Log In</button>
{/if}
