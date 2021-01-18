<script>
    import { Route } from 'tinro'
    import Landing from './pages/Landing.svelte';
    import NotFound from './pages/NotFound.svelte';
</script>

<Route>
    <Route path="/">
        <Landing />
    </Route>
    <Route fallback>
        <NotFound />
    </Route>
</Route>