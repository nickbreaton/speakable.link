<script lang="ts">
    import "firebase/auth"
    import { auth } from './stores/auth'
    import { Route } from 'tinro'
    import Dashboard from './pages/Dashboard.svelte';
    import Landing from './pages/Landing.svelte';
    import NotFound from './pages/NotFound.svelte';
</script>

{#if !$auth.isPending}
    <Route>
        <Route path="/">
            {#if $auth.user}
                <Dashboard />
            {:else}
                <Landing />
            {/if}
        </Route>
        <Route fallback>
            <NotFound />
        </Route>
    </Route>
{/if}

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>