// Ejemplo rápido para tu lógica
const toggleBtn = document.querySelector('.nav__mode');
const body = document.body;
const themeText = document.querySelector(".theme-text");

toggleBtn?.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Opcional: Cambiar el icono de luna/sol si usas FontAwesome
    const icon = toggleBtn.querySelector('i');
    if(body.classList.contains('dark-mode')) {
        themeText.textContent = "Light Mode"
        icon?.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeText.textContent = "Dark Mode"
        icon?.classList.replace('fa-sun', 'fa-moon');
    }
});