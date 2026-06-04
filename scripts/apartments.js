// === ИНСТРУКЦИЯ ДЛЯ АДМИНИСТРАТОРА ===
// 
// КАК ДОБАВИТЬ БРОНЬ:
// 
// bookedDates["shale"].push({ start: "2025-12-25", end: "2025-12-30" })
// 
// КАК УДАЛИТЬ БРОНЬ:
// 
// bookedDates["shale"] = []  // очистить все брони
// 
// ДОСТУПНЫЕ АПАРТАМЕНТЫ ДЛЯ РЕДАКТИРОВАНИЯ:
// - "shale" (Шале)
// - "hotel_standard" (Гостиница Стандарт) - НЕ БЛОКИРУЕТСЯ (всегда доступна)
// - "beach_house" (Дом у пляжа)
// - "swiss_apartment" (Швейцарские апартаменты)
// - "merchant_apartment" (Купеческие апартаменты)
// - "hostel" (Хостел) - НЕ БЛОКИРУЕТСЯ (всегда доступен)
// - "tent_places" (Палаточные места)
// - "forest_house" (Лесной домик)

// === СИСТЕМА УПРАВЛЕНИЯ БРОНИРОВАНИЯМИ ===
const bookedDates = {
    "shale": [{ start: "2025-11-29", end: "2025-12-01" }],
    "hotel_standard": [],
    "beach_house": [],
    "swiss_apartment": [],
    "merchant_apartment": [],
    "hostel": [],
    "tent_places": [],
    "forest_house": []
};

// Данные апартаментов 
const apartmentsData = [
    {
        id: "shale",
        title: "Шале",
        address: "ул. Молодежная, 5",
        area: "85м²",
        rooms: "3 комнаты",
        beds: "4+2 спальных мест",
        price: "35 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Шезлонги", "Терраса"],
        images: ["apartments/shale1.jpg","apartments/shale2.jpg","apartments/shale3.jpg","apartments/shale4.jpg","apartments/shale5.jpg","apartments/shale6.jpg","apartments/shale7.jpg","apartments/shale8.jpg","apartments/shale9.jpg","apartments/shale10.jpg"]
    },
    {
        id: "hotel_standard",
        title: "Гостиница Стандарт",
        address: "ул. Молодежная, 21",
        area: "35м²",
        rooms: "1 комната",
        beds: "2 спальных места",
        price: "8 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Холодильник", "Сейф"],
        images: ["apartments/hotel1.jpg","apartments/hotel2.jpg","apartments/hotel3.jpg","apartments/hotel4.jpg","apartments/hotel5.jpg"]
    },
    {
        id: "beach_house",
        title: "Дом у пляжа",
        address: "ул. Приозёрная, 3А",
        area: "220м²",
        rooms: "4 комнаты",
        beds: "6+2 спальных мест",
        price: "78 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Вид на озеро", "Терраса", "Можно с животными"],
        images: ["apartments/beach1.jpg","apartments/beach2.jpg","apartments/beach3.jpg","apartments/beach4.jpg","apartments/beach5.jpg"]
    },
    {
        id: "swiss_apartment",
        title: "Швейцарские апартаменты",
        address: "ул. Пушкина, 7",
        area: "45м²",
        rooms: "2 комнаты",
        beds: "2+1 спальных мест",
        price: "12 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Мини-бар", "Сейф", "Вид на природу"],
        images: ["apartments/swiss1.jpg","apartments/swiss8.jpg","apartments/swiss3.jpg","apartments/swiss4.jpg"]
    },
    {
        id: "merchant_apartment",
        title: "Купеческие апартаменты",
        address: "ул. Молодежная, 6",
        area: "95м²",
        rooms: "3 комнаты",
        beds: "4+2 спальных мест",
        price: "40 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Терраса", "Парковка"],
        images: ["apartments/merchant1.jpg","apartments/merchant2.jpg","apartments/merchant3.jpg","apartments/merchant4.jpg","apartments/merchant5.jpg"]
    },
    {
        id: "hostel",
        title: "Хостел",
        address: "ул. Молодежная, 21",
        area: "30м²",
        rooms: "1 комната",
        beds: "12 спальных мест",
        price: "2 500",
        tags: ["Ванная комната", "Телевизор", "Холодильник", "Кондиционер", "Общая кухня"],
        images: ["apartments/hostel1.jpg","apartments/hostel2.jpg","apartments/hostel3.jpg","apartments/hostel4.jpg"]
    },
    {
        id: "forest_house",
        title: "Лесной домик",
        address: "ул. Луговая, 13А",
        area: "55м²",
        rooms: "3 комнаты",
        beds: "4+2 спальных мест",
        price: "18 000",
        tags: ["Интернет", "Телевизор", "Можно с животными", "Холодильник", "Кухонная плита", "Природа", "Терраса"],
        images: ["apartments/forest1.jpg","apartments/forest2.jpg","apartments/forest3.jpg","apartments/forest4.jpg","apartments/forest5.jpg"]
    }
];

// Глобальные переменные
let currentGuests = { adults: 0, children03: 0, children416: 0 };
const MAX_GUESTS = 20;

// ---------- Инициализация ----------
document.addEventListener('DOMContentLoaded', function() {
    initGuestsDropdown();
    initDateInputs();
    renderApartments();
    initSliders();
});

// гостей 
function initGuestsDropdown() {
    const dropdown = document.getElementById('guestsDropdown');
    const display = document.getElementById('guestsDisplay');
    const selector = document.getElementById('guestsSelector');

    display.addEventListener('click', () => dropdown.classList.toggle('active'));
    document.addEventListener('click', (e) => { if (!dropdown.contains(e.target)) dropdown.classList.remove('active'); });

    document.querySelectorAll('.guest-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            const isPlus = this.classList.contains('plus');
            let total = currentGuests.adults + currentGuests.children03 + currentGuests.children416;
            if (isPlus && total >= MAX_GUESTS) {
                alert(`Нельзя забронировать больше ${MAX_GUESTS} человек в одной заявке.`);
                return;
            }
            if (isPlus) currentGuests[category]++;
            else if (currentGuests[category] > 0) currentGuests[category]--;
            updateGuestButtons();
            updateGuestsDisplay();
        });
    });
}

function updateGuestButtons() {
    document.querySelectorAll('.guest-count').forEach(el => {
        const cat = el.dataset.category;
        el.textContent = currentGuests[cat];
    });
    document.querySelectorAll('.guest-btn.minus').forEach(btn => {
        const cat = btn.dataset.category;
        btn.disabled = currentGuests[cat] === 0;
    });
}

function updateGuestsDisplay() {
    const total = currentGuests.adults + currentGuests.children03 + currentGuests.children416;
    document.getElementById('guestsDisplay').textContent = total === 0 ? 'Выберите' : `${total} гостей`;
}

//  Даты 
function initDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');
    checkIn.min = today;
    checkOut.min = today;
    checkIn.addEventListener('change', () => {
        checkOut.min = checkIn.value;
        if (checkOut.value && checkOut.value < checkIn.value) checkOut.value = '';
    });
}

// Проверка доступности
function isApartmentAvailable(apartmentId, checkIn, checkOut) {
    if (apartmentId === 'hostel' || apartmentId === 'hotel_standard') return true;
    if (!checkIn || !checkOut) return true;
    const bookings = bookedDates[apartmentId] || [];
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    for (let b of bookings) {
        let bStart = new Date(b.start);
        let bEnd = new Date(b.end);
        if (start < bEnd && end > bStart) return false;
    }
    return true;
}

function getMaxBeds(apartment) {
    let numbers = apartment.beds.match(/\d+/g);
    if (!numbers) return 0;
    return numbers.reduce((s, n) => s + parseInt(n), 0);
}

function isGuestCountValid(apartment, totalGuests) {
    if (apartment.id === 'hostel' || apartment.id === 'hotel_standard') return true;
    let maxBeds = getMaxBeds(apartment);
    return totalGuests <= maxBeds;
}

// Рендеринг
function renderApartments() {
    const container = document.getElementById('apartmentsContainer');
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const totalGuests = currentGuests.adults + currentGuests.children03 + currentGuests.children416;
    container.innerHTML = '';

    let apartmentsWithStatus = apartmentsData.map(apt => {
        let avail = isApartmentAvailable(apt.id, checkIn, checkOut);
        let guestsOk = isGuestCountValid(apt, totalGuests);
        let available = avail && guestsOk && totalGuests <= MAX_GUESTS;
        return { ...apt, available: available };
    });

    apartmentsWithStatus.sort((a,b) => (a.available === b.available) ? 0 : a.available ? -1 : 1);

    apartmentsWithStatus.forEach(apt => {
        let card = createApartmentCard(apt, apt.available);
        container.appendChild(card);
    });
}

function createApartmentCard(apt, isAvailable) {
    const card = document.createElement('div');
    card.className = `apartment-card ${!isAvailable ? 'unavailable' : ''}`;
    card.innerHTML = `
        <div class="apartment-slider">
            <div class="slider-track" id="slider-${apt.id}">
                ${apt.images.map(img => `<div class="slider-slide"><img src="../images/${img}" alt="${apt.title}"></div>`).join('')}
            </div>
            <div class="slider-dots" id="dots-${apt.id}">
                ${apt.images.map((_, i) => `<div class="slider-dot ${i===0?'active':''}" data-slide="${i}"></div>`).join('')}
            </div>
        </div>
        <div class="apartment-info">
            <div class="apartment-header">
                <h2 class="apartment-title">${apt.title}</h2>
                <div class="apartment-address"><i class="fas fa-map-marker-alt"></i><span>${apt.address}</span></div>
                <div class="apartment-features">
                    <div class="feature"><i class="fas fa-vector-square"></i><span>${apt.area}</span></div>
                    <div class="feature"><i class="fas fa-door-open"></i><span>${apt.rooms}</span></div>
                    <div class="feature"><i class="fas fa-bed"></i><span>${apt.beds}</span></div>
                </div>
            </div>
            <div class="apartment-tags-container">
                <h3 class="tags-title">Удобства:</h3>
                <div class="apartment-tags">${apt.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            </div>
            <div class="apartment-details-link">
                <a href="${apt.id}.html" class="btn-details"><i class="fas fa-info-circle"></i> Подробнее об апартаменте</a>
            </div>
        </div>
        <div class="apartment-booking-side">
            <div class="booking-content">
                <div class="apartment-price"><div class="price-main">от ${apt.price} ₽</div><div class="price-note">за 1 сутки</div></div>
                <button class="btn-book-apartment" ${!isAvailable ? 'disabled' : ''}>Забронировать <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    `;
    return card;
}

// Слайдеры
function initSliders() {
    apartmentsData.forEach(apt => {
        let track = document.getElementById(`slider-${apt.id}`);
        let dots = document.getElementById(`dots-${apt.id}`);
        if (!track || !dots) return;
        let current = 0, interval;
        let slides = apt.images.length;

        function goToSlide(index) {
            current = index;
            track.style.transform = `translateX(-${current * 100}%)`;
            Array.from(dots.children).forEach((dot, i) => dot.classList.toggle('active', i === current));
            restartAuto();
        }
        function next() { goToSlide((current + 1) % slides); }
        function startAuto() { interval = setInterval(next, 5000); }
        function stopAuto() { clearInterval(interval); }
        function restartAuto() { stopAuto(); startAuto(); }

        Array.from(dots.children).forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
        startAuto();
    });
}

// "Показать"
document.getElementById('showApartments').addEventListener('click', function() {
    renderApartments();
    setTimeout(() => initSliders(), 100);
});

// Обработчик бронирования
document.addEventListener('click', function(e) {
    let btn = e.target.closest('.btn-book-apartment');
    if (!btn) return;
    let card = btn.closest('.apartment-card');
    let title = card.querySelector('.apartment-title').textContent;
    let apt = apartmentsData.find(a => a.title === title);
    if (!apt) return;

    if (btn.disabled) {
        alert('Данный апартамент недоступен на выбранные даты или количество гостей превышает допустимое.');
        return;
    }

    let checkIn = document.getElementById('check-in').value;
    let checkOut = document.getElementById('check-out').value;
    if (!checkIn || !checkOut) {
        alert('Пожалуйста, выберите даты заезда и выезда');
        return;
    }
    let totalGuests = currentGuests.adults + currentGuests.children03 + currentGuests.children416;
    if (totalGuests > MAX_GUESTS) {
        alert(`Нельзя забронировать более ${MAX_GUESTS} человек в одной заявке.`);
        return;
    }
    // Для обычных апартаментов проверяем вместимость
    if (apt.id !== 'hostel' && apt.id !== 'hotel_standard') {
        let maxBeds = getMaxBeds(apt);
        if (totalGuests > maxBeds) {
            alert(`В апартаменте ${apt.title} максимум ${maxBeds} гостей. Уменьшите количество.`);
            return;
        }
    }

    let params = new URLSearchParams({
        checkin: checkIn,
        checkout: checkOut,
        adults: currentGuests.adults,
        children03: currentGuests.children03,
        children416: currentGuests.children416
    });
    window.location.href = `booking_${apt.id}.html?${params.toString()}`;
});

// Кнопки в шапке
document.querySelector('.btn-book')?.addEventListener('click', () => window.location.href = 'apartments.html');
document.querySelector('.mobile-btn-book')?.addEventListener('click', () => window.location.href = 'apartments.html');