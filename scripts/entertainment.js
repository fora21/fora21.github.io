// Services Slider
let currentSlide = 0;
let slideInterval;
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50;

function initServicesSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const sliderContainer = document.querySelector('.slider-container');
    
    // Очищаем контейнер точек перед созданием новых
    dotsContainer.innerHTML = '';
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Добавляем обработчики для свайпа
    addSwipeSupport(sliderContainer);
    
    // Start auto slide
    startAutoSlide();
    
    // Pause on hover
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Функция добавления поддержки свайпа
function addSwipeSupport(element) {
    if (!element) return;
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    element.style.touchAction = 'pan-y';
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
        stopAutoSlide();
        
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        
        setTimeout(startAutoSlide, 5000);
    }
    
    touchStartX = 0;
    touchEndX = 0;
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Promotions Modal
function openPromotion(promoId) {
    const modal = document.getElementById('promotionModal');
    const modalContent = document.getElementById('modalContent');
    
    const promotions = {
        1: {
            title: "Свадьба у нас!",
            content: `
                <h2>Свадьба у нас!</h2>
                <p>В такой знаменательный день для молодоженов, наша база отдыха предлагает 30% скидку при бронировании домиков Шале или Швейцарских апартаментов в день проведения торжества!</p>
                <p><strong>Что входит в акцию:</strong></p>
                <ul>
                    <li>Скидка 30% на проживание для молодоженов</li>
                    <li>Подарок от базы отдыха</li>
                    <li>Фотозона в подарок</li>
                    <li>Бесплатные украшения для зала</li>
                </ul>
                <p>Для бронирования свяжитесь с нами по телефону: +7 (924) 543 76-23</p>
            `
        },
        2: {
            title: "День рождения",
            content: `
                <h2>День рождения</h2>
                <p>За неделю до дня рождения имениннику предоставляется скидка в размере 20%!</p>
                <p><strong>Что входит в акцию:</strong></p>
                <ul>
                    <li>Скидка 20% на проживание имениннику</li>
                    <li>Действует за 7 дней до дня рождения</li>
                    <li>При предъявлении документа, удостоверяющего личность</li>
                    <li>Дополнительный подарок от базы отдыха</li>
                </ul>
            `
        },
        3: {
            title: "Путевка выходного дня на двоих",
            content: `
                <h2>Путевка выходного дня на двоих</h2>
                <p>Путевка на двое суток на двоих от 8 000. Посещение спа, завтрак, обед и ужин - всё включено! Скидка до 33%.</p>
                <p><strong>Включено в путевку:</strong></p>
                <ul>
                    <li>Проживание 2 суток в комфортабельном номере</li>
                    <li>Питание: завтрак, обед, ужин (шведский стол)</li>
                    <li>Посещение СПА-зоны</li>
                    <li>Бесплатный Wi-Fi</li>
                    <li>Парковка</li>
                </ul>
            `
        },
        4: {
            title: "Раннее бронирование",
            content: `
                <h2>Раннее бронирование</h2>
                <p>Забронируйте отдых за 3 месяца до заезда и получите скидку 15% на проживание и 5% на все развлечения!</p>
                <p><strong>Преимущества раннего бронирования:</strong></p>
                <ul>
                    <li>Гарантированное размещение в выбранные даты</li>
                    <li>Лучшие цены на проживание</li>
                    <li>Дополнительные скидки на развлечения</li>
                    <li>Бесплатная отмена за 14 дней до заезда</li>
                </ul>
            `
        },
        5: {
            title: "Корпоративный отдых",
            content: `
                <h2>Корпоративный отдых</h2>
                <p>При заказе корпоративного мероприятия для группы от 10 человек - организация тимбилдинга в подарок!</p>
                <p><strong>Что мы предлагаем для корпоративов:</strong></p>
                <ul>
                    <li>Организация тимбилдинга (на выбор)</li>
                    <li>Отдельный конференц-зал</li>
                    <li>Индивидуальное меню</li>
                    <li>Трансфер от города</li>
                    <li>Фотограф на мероприятие</li>
                </ul>
            `
        }
    };
    
    const promotion = promotions[promoId];
    if (promotion) {
        modalContent.innerHTML = promotion.content;
        modal.style.display = 'block';
    }
}

function closePromotion() {
    const modal = document.getElementById('promotionModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('promotionModal');
    if (event.target === modal) {
        closePromotion();
    }
});

// Promotions Horizontal Slider
let currentPromotionSlide = 0;
let promotionSlideInterval;

function initPromotionsSlider() {
    const slider = document.getElementById('promotionsSlider');
    const prevBtn = document.getElementById('promotionsPrev');
    const nextBtn = document.getElementById('promotionsNext');
    const indicatorsContainer = document.getElementById('promotionsIndicators');
    const slides = document.querySelectorAll('.promotion-slide');
    const slidesCount = slides.length;
    
    // Добавляем переменные для свайпа
    let promoTouchStartX = 0;
    let promoTouchEndX = 0;
    const PROMO_SWIPE_THRESHOLD = 50;

    // Create indicators
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < slidesCount; i++) {
        const indicator = document.createElement('div');
        indicator.className = `slider-indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToPromotionSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    // Добавляем обработчики для свайпа на слайдер акций
    function handlePromoTouchStart(e) {
        promoTouchStartX = e.touches[0].clientX;
    }
    
    function handlePromoTouchMove(e) {
        promoTouchEndX = e.touches[0].clientX;
    }
    
    function handlePromoTouchEnd() {
        const diff = promoTouchStartX - promoTouchEndX;
        
        if (Math.abs(diff) > PROMO_SWIPE_THRESHOLD) {
            stopAutoPromotionSlide();
            
            if (diff > 0) {
                goToPromotionSlide(currentPromotionSlide + 1);
            } else {
                goToPromotionSlide(currentPromotionSlide - 1);
            }
            
            // Перезапускаем автопрокрутку только на десктопе
            if (window.innerWidth > 768) {
                setTimeout(startAutoPromotionSlide, 5000);
            }
        }
        
        promoTouchStartX = 0;
        promoTouchEndX = 0;
    }
    
    // Добавляем обработчики свайпа
    slider.addEventListener('touchstart', handlePromoTouchStart, { passive: true });
    slider.addEventListener('touchmove', handlePromoTouchMove, { passive: true });
    slider.addEventListener('touchend', handlePromoTouchEnd, { passive: true });
    
    // Оптимизация для тач-устройств
    slider.style.touchAction = 'pan-y';

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        stopAutoPromotionSlide();
        goToPromotionSlide(currentPromotionSlide - 1);
        startAutoPromotionSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoPromotionSlide();
        goToPromotionSlide(currentPromotionSlide + 1);
        startAutoPromotionSlide();
    });

    // Auto slide (только на десктопе)
    startAutoPromotionSlide();

    // Pause on hover (только на десктопе)
    if (window.innerWidth > 768) {
        slider.addEventListener('mouseenter', stopAutoPromotionSlide);
        slider.addEventListener('mouseleave', startAutoPromotionSlide);
    }
}

function goToPromotionSlide(index) {
    const slides = document.querySelectorAll('.promotion-slide');
    const indicators = document.querySelectorAll('.slider-indicator');
    const slidesCount = slides.length;

    if (index >= slidesCount) {
        currentPromotionSlide = 0;
    } else if (index < 0) {
        currentPromotionSlide = slidesCount - 1;
    } else {
        currentPromotionSlide = index;
    }

    // Update slider position
    const slider = document.getElementById('promotionsSlider');
    const slideWidth = slides[0].offsetWidth + 30; // width + gap
    slider.style.transform = `translateX(-${currentPromotionSlide * slideWidth}px)`;

    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentPromotionSlide);
    });
}

function startAutoPromotionSlide() {
    stopAutoPromotionSlide();
    // Автопрокрутка только на десктопе
    if (window.innerWidth > 768) {
        promotionSlideInterval = setInterval(() => {
            goToPromotionSlide(currentPromotionSlide + 1);
        }, 5000);
    }
}

function stopAutoPromotionSlide() {
    if (promotionSlideInterval) {
        clearInterval(promotionSlideInterval);
    }
}

// Обновляем функцию инициализации в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initServicesSlider();
    initPromotionsSlider();
});