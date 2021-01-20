import App from "./App.svelte"

window.addEventListener('load', () => {
    new App({ target: document.getElementById('root') })
})
