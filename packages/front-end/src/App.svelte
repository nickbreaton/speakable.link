<script lang="ts">
    import { Route } from 'tinro'
    import Landing from './pages/Landing.svelte';
    import NotFound from './pages/NotFound.svelte';
    import 'firebase/auth'
    import { auth } from './stores/auth'
</script>

{#if !$auth.isPending}
    <Route>
        <Route path="/">
            <Landing />
        </Route>
        <Route fallback>
            <NotFound />
        </Route>
    </Route>
{/if}