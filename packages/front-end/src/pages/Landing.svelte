<script>
    import GoogleButton from '../components/GoogleButton.svelte'
    import { auth } from '../stores/auth'
</script>

<div class="grid place-items-center text-center p-8 text-gray-900">
    <h1 class="font-display text-3xl relative mb-4">
        speakable.link
    </h1>
    <span class="text-lg mb-4">
        Generate easy-to-say links instantly!
    </span>
    <GoogleButton on:click={$auth.signIn} />
</div>
