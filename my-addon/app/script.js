document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('demoBtn');
    const status = document.getElementById('statusText');

    btn.addEventListener('click', () => {
        status.textContent = 'Button clicked! 🚀';
        status.style.color = 'var(--success)';
        
        setTimeout(() => {
            status.textContent = 'Ready';
            status.style.color = 'var(--muted)';
        }, 2000);
    });
});