document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    // Функция для запуска музыки
    function startMusic() {
        if (!isPlaying) {
            music.play().then(() => {
                isPlaying = true;
                musicBtn.textContent = 'ӘУЕНДІ ӨШІРУ 🔇'; // Меняем текст, так как музыка пошла
                // Удаляем слушатели, чтобы они не срабатывали повторно при каждом скролле
                document.removeEventListener('click', startMusic);
                document.removeEventListener('touchstart', startMusic);
                window.removeEventListener('scroll', startMusic);
            }).catch(error => {
                console.log("Браузер заблокировал автоплей, ждем прямого клика по кнопке:", error);
            });
        }
    }

    // Автоматический запуск при любом первом действии гостя на странице
    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);
    window.addEventListener('scroll', startMusic);

    // Ручное управление через кнопку (вкл/выкл)
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывал глобальный клик страницы
        if (isPlaying) {
            music.pause();
            musicBtn.textContent = 'ӘУЕНДІ ҚОСУ 🎵';
            isPlaying = false;
        } else {
            music.play();
            musicBtn.textContent = 'ӘУЕНДІ ӨШІРУ 🔇';
            isPlaying = true;
        }
    });

    // Логика счетчика гостей (Плюс / Минус)
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');
    const guestCountInput = document.getElementById('guest-count');

    if (minusBtn && plusBtn && guestCountInput) {
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(guestCountInput.value) || 1;
            if (currentValue > 1) {
                guestCountInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(guestCountInput.value) || 1;
            guestCountInput.value = currentValue + 1;
        });
    }

    // Анимация элементов при скролле (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
});