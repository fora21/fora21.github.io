function initSlider() {
    const slider = document.getElementById('reviewsSlider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Минимальная дистанция для свайпа

    const reviews = [
        {
            name: "Анна и Сергей",
            text: "Выбирали базу для побега из города на выходные и не прогадали! Брали домик «Шале» с террасой и джакузи. Это было нечто... Вечером с бокалом вина в теплой воде смотришь на звезды — красота нереальная. Персонал очень вежливый, завтраки вкусные, особенно сырники. Из небольших недочетов — дорога от парковки до домика грунтовая, в туфлях на каблуках не очень удобно. Но для полного релакса — идеальное место.",
            date: "23.06.2025",
            image: "reviews/review1.jpg"
        },
        {
            name: "Олег",
            text: "Ездил на неделю на рыбалку. Останавливался в стандартном номере в основном корпусе. Всё строго, без изысков, но всё необходимое есть: кровать удобная, душ горячий, телевизор. Главное — озеро! Клевало отлично, щука, окунь.",
            date: "29.11.2025",
            image: "reviews/review2.jpg"
        },
        {
            name: "Семья Сироткины",
            text: "Приехал с женой и двумя детьми. Останавливались в двухкомнатном домике «У озера». Очень понравилось! Дети были в восторге от собственной площадки и аниматора Оксаны — каждый день какие-то мастер-классы, конкурсы. В номере чисто, уютно, есть чайник, холодильник. Минус: Wi-Fi ловит только у ресепшена, но для нас это даже плюс, отдохнули от гаджетов. Обязательно приедем зимой, посмотрим, как тут на лыжах кататься! Спасибо!",
            date: "10.08.2025",
            image: "reviews/review3.jpg"
        }
    ];

    // Очищаем слайдер перед созданием карточек
    slider.innerHTML = '';

    // Create review cards
    reviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.style.display = index === 0 ? 'block' : 'none';
        reviewCard.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <img src="images/${review.image}" alt="${review.name}" 
                     style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;">
                <div>
                    <h4 style="color: #03B7A0; margin-bottom: 5px;">${review.name}</h4>
                    <span style="color: #666; font-size: 0.9em;">${review.date}</span>
                </div>
            </div>
            <p>${review.text}</p>
        `;
        slider.appendChild(reviewCard);
    });

    function showSlide(index) {
        const slides = slider.querySelectorAll('.review-card');
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        currentSlide = index;
    }

    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= reviews.length) newIndex = 0;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = reviews.length - 1;
        showSlide(newIndex);
    }

    function startAutoSlide() {
        // Автопрокрутка только на десктопе
        if (window.innerWidth > 768) {
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Инициализация автопрокрутки
    startAutoSlide();

    // Обработчики для кнопок (только на десктопе)
    if (prevBtn && nextBtn && window.innerWidth > 768) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    // Скрываем кнопки навигации на мобильных
    if (window.innerWidth <= 768) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    // Обработчики для свайпа
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchMove(e) {
        touchEndX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd() {
        const diff = touchStartX - touchEndX;
        
        // Если свайп достаточно длинный
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoSlide();
            
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
            
            // На мобильных не перезапускаем автопрокрутку
            if (window.innerWidth > 768) {
                startAutoSlide();
            }
        }
    }

    // Добавляем обработчики свайпа
    const reviewsSliderContainer = document.querySelector('.reviews-slider');
    if (reviewsSliderContainer) {
        reviewsSliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        reviewsSliderContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        reviewsSliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Добавляем CSS для лучшего UX при свайпе
        reviewsSliderContainer.style.touchAction = 'pan-y';
    }

    // Перезапуск автопрокрутки при изменении размера окна
    window.addEventListener('resize', function() {
        stopAutoSlide();
        startAutoSlide();
        
        // Обновляем видимость кнопок при изменении размера
        if (window.innerWidth <= 768) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = '';
            if (nextBtn) nextBtn.style.display = '';
        }
    });

    // Остановка автопрокрутки при наведении (только на десктопе)
    if (window.innerWidth > 768 && slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Инициализация слайдера при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('reviewsSlider')) {
        initSlider();
    }
});