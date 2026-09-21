"use strict";

// ==================================================
// СОСТОЯНИЕ САЙТА
// ==================================================

const state = {
    selectedDate: null,
    selectedTime: null,
    escapeAttempts: 0,
    currentScreen: "welcomeScreen"
};


// ==================================================
// ЭЛЕМЕНТЫ
// ==================================================

const welcomeScreen = document.getElementById("welcomeScreen");
const dateScreen = document.getElementById("dateScreen");
const timeScreen = document.getElementById("timeScreen");
const finalScreen = document.getElementById("finalScreen");

const yesBtn = document.getElementById("yesBtn");

const attemptCounter =
    document.getElementById("attemptCounter");

const transition =
    document.getElementById("transition");

const celebration =
    document.getElementById("celebration");

const calendar =
    document.getElementById("calendar");

const monthTitle =
    document.getElementById("monthTitle");

const selectedDateInfo =
    document.getElementById("selectedDateInfo");

const dateContinueBtn =
    document.getElementById("dateContinueBtn");

const timeGrid =
    document.getElementById("timeGrid");

const chosenDate =
    document.getElementById("chosenDate");

const timeContinueBtn =
    document.getElementById("timeContinueBtn");

const finalDate =
    document.getElementById("finalDate");

const finalTime =
    document.getElementById("finalTime");

const resetBtn =
    document.getElementById("resetBtn");


// ==================================================
// КНОПКА "НЕТ"
// ==================================================

const noBtn = document.createElement("button");

noBtn.className = "no-btn";
noBtn.id = "noBtn";
noBtn.type = "button";
noBtn.textContent = "Я ещё подумаю… 🥺";

document.body.appendChild(noBtn);


// ==================================================
// ФОН
// ==================================================

function createBackground() {

    const background =
        document.getElementById("background");

    for (let i = 0; i < 24; i++) {

        const particle =
            document.createElement("div");

        particle.style.position = "absolute";

        particle.style.width =
            `${Math.random() * 4 + 2}px`;

        particle.style.height =
            `${Math.random() * 4 + 2}px`;

        particle.style.borderRadius = "50%";

        particle.style.background =
            "rgba(255,255,255,0.6)";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.boxShadow =
            "0 0 15px rgba(255,150,205,0.35)";

        particle.style.opacity =
            `${Math.random() * 0.8 + 0.2}`;

        background.appendChild(particle);
    }
}

createBackground();


// ==================================================
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// ==================================================

function switchScreen(targetScreen) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    // Кнопка "Нет" существует только
    // на первом экране
    if (targetScreen.id === "welcomeScreen") {

        noBtn.style.display = "block";

    } else {

        noBtn.style.display = "none";
    }


    setTimeout(() => {

        targetScreen.classList.add("active");

        state.currentScreen =
            targetScreen.id;

    }, 150);
}


// ==================================================
// КНОПКА "ДА"
// ==================================================

yesBtn.addEventListener("click", () => {

    yesBtn.style.transform =
        "scale(0.93)";


    // Сразу убираем кнопку "Нет"
    noBtn.style.display = "none";


    setTimeout(() => {

        yesBtn.style.transform = "";

    }, 180);


    startTransition(() => {

        showDatePicker();

    });
});


// ==================================================
// КНОПКА "НЕТ" - ПЕРЕМЕЩЕНИЕ
// ==================================================

function moveNoButton() {

    state.escapeAttempts++;


    const rect =
        noBtn.getBoundingClientRect();

    const padding = 15;


    const maxX =
        window.innerWidth -
        rect.width -
        padding;

    const maxY =
        window.innerHeight -
        rect.height -
        padding;


    const randomX =
        Math.floor(
            Math.random() *
            Math.max(
                maxX - padding,
                1
            )
        ) + padding;


    const randomY =
        Math.floor(
            Math.random() *
            Math.max(
                maxY - padding,
                1
            )
        ) + padding;


    noBtn.style.left =
        `${randomX}px`;

    noBtn.style.top =
        `${randomY}px`;

    noBtn.style.transform =
        "translate(0, 0)";


    updateEscapeText();

    updateAttemptCounter();


    createTinyHeart(
        randomX + rect.width / 2,
        randomY + rect.height / 2
    );
}


// ==================================================
// СОБЫТИЯ КНОПКИ "НЕТ"
// ==================================================

noBtn.addEventListener(
    "mouseenter",
    () => {

        moveNoButton();

    }
);


noBtn.addEventListener(
    "mousedown",
    event => {

        event.preventDefault();

        moveNoButton();

    }
);


noBtn.addEventListener(
    "touchstart",
    event => {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


noBtn.addEventListener(
    "focus",
    () => {

        moveNoButton();

    }
);


// ==================================================
// ТЕКСТ КНОПКИ "НЕТ"
// ==================================================

function updateEscapeText() {

    if (state.escapeAttempts === 3) {

        noBtn.textContent =
            "Ну пожалуйста 🥺";

    }

    else if (state.escapeAttempts === 6) {

        noBtn.textContent =
            "Я ещё думаю 😭";

    }

    else if (state.escapeAttempts === 10) {

        noBtn.textContent =
            "Не поймаешь 😈";

    }

    else if (state.escapeAttempts === 15) {

        noBtn.textContent =
            "Хватит за мной гоняться 😂";

    }

    else if (state.escapeAttempts === 20) {

        noBtn.textContent =
            "ДА Я НЕ НАЖМУСЬ 😭";

    }
}


// ==================================================
// СЧЁТЧИК
// ==================================================

function updateAttemptCounter() {

    attemptCounter.innerHTML =
        `Попыток передумать:
        <strong>
            ${state.escapeAttempts}
        </strong>`;
}


// ==================================================
// КАЛЕНДАРЬ
// ==================================================

function showDatePicker() {

    switchScreen(dateScreen);

    createCalendar();
}


function createCalendar() {

    calendar.innerHTML = "";

    const year = 2026;
    const month = 9;

    monthTitle.textContent =
        "Октябрь 2026";


    // 2 и 3 октября заняты
    const unavailableDays = [2, 3];


    const firstDay =
        new Date(
            year,
            month,
            1
        );


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    let startDay =
        firstDay.getDay();


    if (startDay === 0) {
        startDay = 7;
    }


    // Пустые клетки перед 1 октября
    for (
        let i = 1;
        i < startDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "day empty";

        calendar.appendChild(empty);
    }


    // Дни октября
    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {


        // 2 и 3 октября вообще не отображаем
        if (
            unavailableDays.includes(day)
        ) {

            continue;
        }


        const button =
            document.createElement("button");


        button.className =
            "day";


        button.textContent =
            day;


        button.type =
            "button";


        button.dataset.day =
            day;


        button.addEventListener(
            "click",
            () => {

                selectDate(day);

            }
        );


        calendar.appendChild(button);
    }
}


// ==================================================
// ВЫБОР ДАТЫ
// ==================================================

function selectDate(day) {

    // Дополнительная защита
    if (
        day === 2 ||
        day === 3
    ) {

        return;
    }


    state.selectedDate =
        new Date(
            2026,
            9,
            day
        );


    document
        .querySelectorAll(".day")
        .forEach(dayButton => {

            dayButton.classList.remove(
                "selected"
            );

        });


    const selectedButton =
        document.querySelector(
            `.day[data-day="${day}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "selected"
        );
    }


    selectedDateInfo.textContent =
        formatSelectedDate();


    dateContinueBtn.disabled =
        false;
}


// ==================================================
// ФОРМАТ ДАТЫ
// ==================================================

function formatSelectedDate() {

    if (!state.selectedDate) {

        return "";
    }


    return state.selectedDate.toLocaleDateString(
        "ru-RU",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    );
}


// ==================================================
// КНОПКА ПРОДОЛЖИТЬ ПОСЛЕ ДАТЫ
// ==================================================

dateContinueBtn.addEventListener(
    "click",
    () => {

        if (!state.selectedDate) {

            return;
        }


        startTransition(() => {

            showTimePicker();

        });
    }
);


// ==================================================
// ВРЕМЯ
// ==================================================

function showTimePicker() {

    switchScreen(timeScreen);


    chosenDate.textContent =
        `📅 ${capitalize(
            formatSelectedDate()
        )}`;


    createTimeButtons();
}


function createTimeButtons() {

    timeGrid.innerHTML = "";


    // От 10:00 до 22:00
    // каждые 30 минут

    for (
        let minutes = 10 * 60;
        minutes <= 22 * 60;
        minutes += 30
    ) {

        const hours =
            Math.floor(
                minutes / 60
            );


        const mins =
            minutes % 60;


        const time =
            `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;


        const button =
            document.createElement("button");


        button.className =
            "time-btn";


        button.textContent =
            time;


        button.type =
            "button";


        button.addEventListener(
            "click",
            () => {

                selectTime(
                    time,
                    button
                );

            }
        );


        timeGrid.appendChild(button);
    }
}


// ==================================================
// ВЫБОР ВРЕМЕНИ
// ==================================================

function selectTime(
    time,
    button
) {

    state.selectedTime =
        time;


    document
        .querySelectorAll(".time-btn")
        .forEach(btn => {

            btn.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );


    timeContinueBtn.disabled =
        false;
}


// ==================================================
// ПЕРЕХОД К ФИНАЛУ
// ==================================================

timeContinueBtn.addEventListener(
    "click",
    () => {

        if (!state.selectedTime) {

            return;
        }


        startTransition(() => {

            showFinalScreen();

        });
    }
);


// ==================================================
// ФИНАЛЬНЫЙ ЭКРАН
// ==================================================

function showFinalScreen() {

    switchScreen(finalScreen);


    finalDate.textContent =
        capitalize(
            formatSelectedDate()
        );


    finalTime.textContent =
        state.selectedTime;


    setTimeout(() => {

        createHearts();

        createConfetti();

    }, 350);
}


// ==================================================
// ПЕРЕХОД
// ==================================================

function startTransition(callback) {

    transition.classList.add(
        "active"
    );


    createCelebrationBurst();


    setTimeout(() => {

        callback();

    }, 500);


    setTimeout(() => {

        transition.classList.remove(
            "active"
        );

    }, 850);
}


// ==================================================
// ЭФФЕКТЫ
// ==================================================

function createCelebrationBurst() {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.textContent =
            "❤️";


        heart.style.position =
            "fixed";


        heart.style.left =
            "50%";


        heart.style.top =
            "50%";


        heart.style.fontSize =
            `${randomBetween(
                16,
                28
            )}px`;


        heart.style.transform =
            "translate(-50%, -50%)";


        heart.style.transition =
            "all 1s ease";


        heart.style.zIndex =
            "12000";


        document.body.appendChild(
            heart
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            randomBetween(
                80,
                260
            );


        setTimeout(() => {

            heart.style.transform =
                `translate(
                    ${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px
                )
                scale(0.4)`;


            heart.style.opacity =
                "0";

        }, 20);


        setTimeout(() => {

            heart.remove();

        }, 1100);
    }
}


// ==================================================
// СЕРДЕЧКИ
// ==================================================

function createHearts() {

    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.className =
            "heart-particle";


        heart.textContent =
            Math.random() > 0.5
                ? "❤️"
                : "💗";


        heart.style.left =
            `${Math.random() * 100}%`;


        heart.style.top =
            `${Math.random() * 100}%`;


        heart.style.setProperty(
            "--x",
            `${randomBetween(
                -280,
                280
            )}px`
        );


        heart.style.setProperty(
            "--y",
            `${randomBetween(
                -450,
                -100
            )}px`
        );


        heart.style.setProperty(
            "--rotate",
            `${randomBetween(
                -180,
                180
            )}deg`
        );


        celebration.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 2000);
    }
}


// ==================================================
// КОНФЕТТИ
// ==================================================

function createConfetti() {

    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const confetti =
            document.createElement("div");


        confetti.className =
            "confetti";


        confetti.style.left =
            `${50 + randomBetween(
                -10,
                10
            )}%`;


        confetti.style.top =
            `${45 + randomBetween(
                -5,
                5
            )}%`;


        confetti.style.setProperty(
            "--x",
            `${randomBetween(
                -500,
                500
            )}px`
        );


        confetti.style.setProperty(
            "--y",
            `${randomBetween(
                -500,
                500
            )}px`
        );


        confetti.style.setProperty(
            "--rotate",
            `${randomBetween(
                -720,
                720
            )}deg`
        );


        celebration.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 2000);
    }
}


// ==================================================
// МАЛЕНЬКОЕ СЕРДЦЕ ПРИ УБЕГАНИИ
// ==================================================

function createTinyHeart(
    x,
    y
) {

    const heart =
        document.createElement("div");


    heart.textContent =
        "❤️";


    heart.style.position =
        "fixed";


    heart.style.left =
        `${x}px`;


    heart.style.top =
        `${y}px`;


    heart.style.pointerEvents =
        "none";


    heart.style.zIndex =
        "10000";


    heart.style.fontSize =
        "18px";


    heart.style.transition =
        "all 0.7s ease";


    document.body.appendChild(
        heart
    );


    requestAnimationFrame(() => {

        heart.style.transform =
            `translate(
                ${randomBetween(
                    -30,
                    30
                )}px,
                -50px
            )
            scale(0.4)`;


        heart.style.opacity =
            "0";

    });


    setTimeout(() => {

        heart.remove();

    }, 800);
}


// ==================================================
// RESET
// ==================================================

resetBtn.addEventListener(
    "click",
    () => {

        state.selectedDate =
            null;

        state.selectedTime =
            null;

        state.escapeAttempts =
            0;


        // Возвращаем кнопку "Нет"
        noBtn.style.display =
            "block";


        noBtn.textContent =
            "Я ещё подумаю… 🥺";


        noBtn.style.left =
            "50%";


        noBtn.style.top =
            "82%";


        noBtn.style.transform =
            "translate(-50%, -50%)";


        updateAttemptCounter();


        dateContinueBtn.disabled =
            true;


        timeContinueBtn.disabled =
            true;


        selectedDateInfo.textContent =
            "Выбери день ❤️";


        switchScreen(
            welcomeScreen
        );
    }
);


// ==================================================
// ЕСЛИ ОКНО МЕНЯЕТ РАЗМЕР
// ==================================================

window.addEventListener(
    "resize",
    () => {

        // Если кнопка скрыта,
        // ничего не делаем

        if (
            noBtn.style.display === "none"
        ) {

            return;
        }


        const rect =
            noBtn.getBoundingClientRect();


        const padding = 10;


        let x =
            rect.left;


        let y =
            rect.top;


        x = clamp(
            x,
            padding,
            window.innerWidth -
                rect.width -
                padding
        );


        y = clamp(
            y,
            padding,
            window.innerHeight -
                rect.height -
                padding
        );


        noBtn.style.left =
            `${x}px`;


        noBtn.style.top =
            `${y}px`;


        noBtn.style.transform =
            "translate(0, 0)";
    }
);


// ==================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==================================================

function randomBetween(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );
}


function capitalize(
    string
) {

    if (!string) {

        return "";
    }


    return (
        string.charAt(0).toUpperCase() +
        string.slice(1)
    );
}