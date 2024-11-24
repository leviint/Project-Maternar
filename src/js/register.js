document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const modal = document.getElementById('success-modal');
    const closeModalButton = document.getElementById('close-modal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});