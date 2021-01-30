<script>
    import { auth } from '../stores/auth'
</script>

Dashboard

<button on:click={$auth.signOut}>
    Sign Out
</button>