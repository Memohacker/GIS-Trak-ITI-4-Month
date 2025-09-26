document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            alert(`You clicked on: ${tab.textContent}`);
            // In a real application, you'd change content or load a new view here.
        });
    });
});