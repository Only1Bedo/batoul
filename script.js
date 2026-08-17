// تغيير أرقام نبضات القلب أوتوماتيكياً لإعطاء طابع حيوي للجهاز
setInterval(() => {
    const bpmElement = document.getElementById('bpm-val');
    if (bpmElement) {
        const randomBpm = Math.floor(Math.random() * (128 - 118 + 1)) + 118;
        bpmElement.innerText = randomBpm;
    }
}, 1500);

function openClinic() {
    const heartbeat = document.getElementById('heartbeat-sound');
    const mainMusic = document.getElementById('main-music');
    const monitorScreen = document.getElementById('hospital-monitor-screen');

    if (heartbeat) heartbeat.pause();
    if (mainMusic) {
        mainMusic.volume = 0.6;
        mainMusic.play().catch(() => {});
    }

    // إغلاق الشاشة الطبية
    monitorScreen.style.opacity = '0';
    setTimeout(() => {
        monitorScreen.style.display = 'none';
        document.getElementById('main-hospital-content').classList.remove('hidden');
    }, 1000);
}









let pouredTubes = 0;

function pourTube(tubeNum, color) {
    const tubeCard = document.getElementById(`tube-card-${tubeNum}`);
    const tubeLiquid = document.getElementById(`tube-fill-${tubeNum}`);
    const tubeStatus = document.getElementById(`tube-status-${tubeNum}`);
    const chamberLiquid = document.getElementById('chamber-liquid');
    const bubbles = document.getElementById('bubbles');

    if (tubeLiquid && tubeLiquid.style.height !== '0%') {
        // أنيميشن الانحناء
        tubeCard.classList.add('pouring');
        setTimeout(() => tubeCard.classList.remove('pouring'), 800);

        tubeLiquid.style.height = '0%';
        tubeStatus.innerText = "تم التفريغ ✓";
        tubeStatus.style.color = "#22c55e";
        
        pouredTubes++;
        
        // تحديث العدادات
        const progressPct = Math.round(pouredTubes * 33.3);
        document.getElementById('reaction-progress').innerText = `${progressPct}%`;
        document.getElementById('reaction-temp').innerText = `${(36.6 + pouredTubes * 1.2).toFixed(1)} °C`;
        document.getElementById('reaction-press').innerText = `${(1.0 + pouredTubes * 0.3).toFixed(1)} ATM`;

        chamberLiquid.style.width = progressPct + '%';
        bubbles.classList.add('active');

        if (pouredTubes === 3) {
            document.getElementById('reaction-progress').innerText = "100%";
            const statusTag = document.getElementById('reactor-status-tag');
            statusTag.innerText = "READY TO MIX";
            statusTag.style.color = "#00ffcc";
            statusTag.style.borderColor = "#00ffcc";
            document.getElementById('reactor-box').classList.add('ready');
        }
    }
}

function startReactor() {
    if (pouredTubes === 3) {
        document.getElementById('reaction-temp').innerText = "42.0 °C (HOT!)";
        document.getElementById('chamber-liquid').style.background = "#a855f7";
        
        setTimeout(() => {
            const labResult = document.getElementById('lab-result');
            labResult.classList.remove('hidden');
            labResult.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        alert("اضغطي على الأنابيب الثلاثة الأول علشان تتفرغ المكونات! 🧪");
    }
}









function toggleErCard(cardElement) {
    const fullContent = cardElement.querySelector('.er-full-content');
    
    if (fullContent) {
        fullContent.classList.toggle('hidden');
        cardElement.classList.toggle('active-er');
    }
}




let activeClaimedCard = null; // الاحتفاظ بالكارت المفعل حالياً

function toggleCoupon(cardElement) {
    const details = cardElement.querySelector('.med-details');
    if (details) {
        details.classList.toggle('hidden');
    }
}

function claimAction(event, btnElement) {
    event.stopPropagation(); // منع إغلاق الكارت
    const currentCard = btnElement.closest('.med-box-v2');

    // 1. حالة إلغاء التفعيل (لو ضغطت على نفس الكارت المفعل حالياً)
    if (activeClaimedCard === currentCard) {
        currentCard.classList.remove('claimed-card');
        btnElement.innerText = "🔒 اضغطي لتفعيل الكوبون واستخراجه";
        activeClaimedCard = null;

        // إعادة تفعيل باقي الأزرار
        resetAllButtons();
        return;
    }

    // 2. إلغاء تفعيل أي كارت قديم لو كانت مفعلة حاجة تانية قبل كدة
    if (activeClaimedCard) {
        activeClaimedCard.classList.remove('claimed-card');
        const oldBtn = activeClaimedCard.querySelector('.redeem-btn');
        if (oldBtn) {
            oldBtn.innerText = "🔒 اضغطي لتفعيل الكوبون واستخراجه";
        }
    }

    // 3. تفعيل الكارت الجديد
    activeClaimedCard = currentCard;
    currentCard.classList.add('claimed-card');
    btnElement.innerText = "✓ تم تفعيل الكوبون (اضغطي مرة أخرى للإلغاء) 💖";

    // 4. تحديث حالة باقي الأزرار
    const allButtons = document.querySelectorAll('.redeem-btn');
    allButtons.forEach(btn => {
        if (btn !== btnElement) {
            btn.innerText = "🔒 اخترتِ كوبون آخر (يمكنك التغيير)";
            btn.style.opacity = "0.6";
        }
    });

    // احتفال بالقصاقيص الملونة
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 }
        });
    }
}

// دالة مساعدة لإعادة شكل الأزرار لو ألغت الاختيار
function resetAllButtons() {
    const allButtons = document.querySelectorAll('.redeem-btn');
    allButtons.forEach(btn => {
        btn.innerText = "🔒 اضغطي لتفعيل الكوبون واستخراجه";
        btn.style.opacity = "1";
    });
}









// تاريخ الميلاد (يمكنك ضبط التاريخ هنا - افتراضياً تم وضعه لـ 22 سنة)
const birthDate = new Date('2007-08-22T00:00:00');

function updateAstroCounters() {
    const now = new Date();
    const diffMS = now - birthDate;

    const days = Math.floor(diffMS / (1000 * 60 * 60 * 24));
    const seconds = Math.floor(diffMS / 1000);
    const beats = Math.floor(seconds * 1.2); // متوسط 72 نبضة بالدقيقة

    const daysElem = document.getElementById('days-count');
    const secondsElem = document.getElementById('seconds-count');
    const beatsElem = document.getElementById('beats-count');

    if (daysElem) daysElem.innerText = days.toLocaleString();
    if (secondsElem) secondsElem.innerText = seconds.toLocaleString();
    if (beatsElem) beatsElem.innerText = beats.toLocaleString();
}

// تحديث العداد كل ثانية
setInterval(updateAstroCounters, 1000);
updateAstroCounters();

// أنيميشن كتابة الرسالة حرفاً بحرف
const messageText = "كل سنة وانتي طيبة يا قلبي، كل سنة وانتي منورة حياتي ❤️ كل سنة وانتي معايا ي قلبي وكل سنه وانتي فرحتي وعمري وروحي وقلبي بحبك ربنا يخليكي ليا وميحرمنيش منك ادبا بحبك اوي ي ملاكي الصغير  ي احلي حاجه ف حياتي واحلي سنين عدت عليا ويارب تكوني معايا علطول العمر ي قلبي بحبك وبموت فيكي ي ملاكي صغنون نفسي  يجي اليوم الي اقدر بجد اخدك ف حضني  وتكوني حلالي بحبك ي بطتي ي ارق قلب في  دنيا💖";
let charIndex = 0;

function typeWriter() {
    const elem = document.getElementById('typewriter-text');
    if (elem && charIndex < messageText.length) {
        elem.innerHTML += messageText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40);
    }
}

// بدء التايبرايتر عند فتح الموقع
setTimeout(typeWriter, 1500);

// إطلاق الألعاب النارية
function triggerFinaleConfetti() {
    if (typeof confetti === 'function') {
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}




const slideContainer = document.getElementById('slide-container-v2');
const slideViewport = document.getElementById('slide-viewport');
const zoomIndicator = document.getElementById('zoom-level-indicator');
const detailText = document.getElementById('micro-detail-text');

let scale = 1.0;
let posX = 0;
let posY = 0;

let isDragging = false;
let startX = 0;
let startY = 0;
let initialPinchDist = null;

// تحديث النص ونسبة التكبير
function updateMicroscopeDisplay() {
    // تقييد درجة التكبير بين 1.0x و 8.0x
    scale = Math.min(Math.max(1.0, scale), 8.0);
    
    // إذا عادت الشريحة لحجمها الطبيعي، نُرجع المكان للمنتصف تلقائياً
    if (scale === 1.0) {
        posX = 0;
        posY = 0;
    }

    zoomIndicator.innerText = `${scale.toFixed(1)}x`;

    // تغير النص واللون حسب مستوى التكبير
    if (scale < 2.5) {
        detailText.innerText = "طريقتك واسلوبك الي بعشقهم وصوتك الي بيقلب مودي 180 درجه ي اجمل بطه ";
        detailText.style.color = "#00ffcc";
    } else if (scale >= 2.5 && scale < 5.0) {
        detailText.innerText = "عفويتك ودمك وطبيعتك وتجاربك القليله وتربيتك وكل حاجه فيكي وتفاصيلك ي مزه بحبكك💖";
        detailText.style.color = "#ffe66d";
    } else {
        detailText.innerText = "انتي علاج للاكتئاب وبتخلي قلبي يرقص من غير سبب ي حبي ي بطتيييي بموت فيكيييييي 💖💖💖";
        detailText.style.color = "#ff4b5c";
    }

    // تطبيق التكبير مع التحريك/السحب
    slideViewport.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

if (slideContainer && slideViewport) {

    // --- 1. التعامل مع التاتش للموبايل (Touch Events) ---
    slideContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            // سحب بصباع واحد للتحريك (Pan)
            isDragging = true;
            startX = e.touches[0].clientX - posX;
            startY = e.touches[0].clientY - posY;
        } else if (e.touches.length === 2) {
            // تكبير بصباعين (Pinch to Zoom)
            isDragging = false;
            initialPinchDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    });

    slideContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging && scale > 1.0) {
            e.preventDefault();
            posX = e.touches[0].clientX - startX;
            posY = e.touches[0].clientY - startY;
            updateMicroscopeDisplay();
        } else if (e.touches.length === 2 && initialPinchDist) {
            e.preventDefault();
            const currentDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = (currentDist - initialPinchDist) * 0.015;
            scale += delta;
            initialPinchDist = currentDist;
            updateMicroscopeDisplay();
        }
    });




    slideContainer.addEventListener('touchend', () => {
        isDragging = false;
        initialPinchDist = null;
    });

    // --- 2. التعامل مع ماوس الكمبيوتر (Mouse Events) ---
    slideContainer.addEventListener('mousedown', (e) => {
        if (scale > 1.0) {
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - startY;
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging && scale > 1.0) {
            posX = e.clientX - startX;
            posY = e.clientY - startY;
            updateMicroscopeDisplay();
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // التكبير بعجلة الماوس
    slideContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY * -0.002;
        scale += zoomFactor;
        updateMicroscopeDisplay();
    });
}


























// ================= البرمجة الخاصة بالعد التنازلي لعيد الميلاد ================= //

// ================= العد التنازلي لموعد عيد الميلاد (22/08/2026) ================= //

const targetBirthday = new Date('2026-08-22T00:00:00');

function updateBirthdayCountdown() {
    const now = new Date();
    const diff = targetBirthday - now;

    const daysElem = document.getElementById('cd-days');
    const hoursElem = document.getElementById('cd-hours');
    const minutesElem = document.getElementById('cd-minutes');
    const secondsElem = document.getElementById('cd-seconds');
    const btnElem = document.getElementById('enter-site-btn');

    if (diff <= 0) {
        // عند انتهاء الوقت فقط:
        if (daysElem) daysElem.innerText = "00";
        if (hoursElem) hoursElem.innerText = "00";
        if (minutesElem) minutesElem.innerText = "00";
        if (secondsElem) secondsElem.innerText = "00";
        
        if (btnElem) {
            btnElem.disabled = false; // تفعيل الزر ليكون قابلاً للضغط
            btnElem.innerText = "🎉 حان الوقت! اضغطي للدخول المفاجأة جاهزة 🎉";
            btnElem.classList.add("btn-unlocked"); // إضافة كلاس للشكل الجديد
        }
        return;
    }

    // إذا كان الوقت لم ينتهِ بعد، نضمن أن الزر معطل
    if (btnElem) {
        btnElem.disabled = true;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (daysElem) daysElem.innerText = d < 10 ? '0' + d : d;
    if (hoursElem) hoursElem.innerText = h < 10 ? '0' + h : h;
    if (minutesElem) minutesElem.innerText = m < 10 ? '0' + m : m;
    if (secondsElem) secondsElem.innerText = s < 10 ? '0' + s : s;
}

setInterval(updateBirthdayCountdown, 1000);
updateBirthdayCountdown();

function startAppFromCountdown() {
    const btnElem = document.getElementById('enter-site-btn');
    
    // تأكيد إضافي: عدم تشغيل الدالة إذا كان الزر معطلاً
    if (btnElem && btnElem.disabled) {
        return;
    }

    const countdownScreen = document.getElementById('birthday-countdown-screen');
    const heartbeat = document.getElementById('heartbeat-sound');

    if (heartbeat) {
        heartbeat.volume = 0.5;
        heartbeat.play().catch(() => {});
    }

    if (countdownScreen) {
        countdownScreen.style.opacity = '0';
        setTimeout(() => {
            countdownScreen.style.display = 'none';
        }, 1000);
    }
}