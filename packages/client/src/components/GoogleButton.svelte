<script lang="ts">
    import normal from '../assets/btn_google_signin_dark_normal_web@2x.png'
    import focus from '../assets/btn_google_signin_dark_focus_web@2x.png'
    import pressed from '../assets/btn_google_signin_dark_pressed_web@2x.png'
</script>

<svelte:head>
    <link rel="prefetch" href={normal} />
    <link rel="prefetch" href={focus} />
    <link rel="prefetch" href={pressed} />
</svelte:head>

<button class="w-52 focus:outline-none scoped-no-highlight" on:click>
    <img alt="Sign in with Google" src={normal} class="scoped-normal-button pointer-events-none" />
    <img alt="Sign in with Google" src={focus} class="scoped-focus-button pointer-events-none" />
    <img alt="Sign in with Google" src={pressed} class="scoped-pressed-button pointer-events-none" />
</button>

<style>
    .scoped-no-highlight {
        -webkit-tap-highlight-color: transparent;
    }

    .scoped-focus-button, .scoped-pressed-button {
        display: none;
    }

    /* focus */

    button:focus .scoped-normal-button {
        display: none;
    }

    button:focus .scoped-focus-button {
        display: block;
    }

    /* pressed */

    button:active .scoped-normal-button,
    button:active .scoped-focus-button {
        display: none;
    }

    button:active .scoped-pressed-button {
        display: block;
    }
</style>