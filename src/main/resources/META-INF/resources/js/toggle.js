// [추가] 다크/라이트 모드 토글 JavaScript

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        btn.textContent = '☀️ LIGHT';
    } else {
        btn.textContent = '🌙 DARK';
    }
}
