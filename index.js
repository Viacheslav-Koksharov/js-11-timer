import './style.css';

const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
}

const DELAY = 1000;

class Timer {
    constructor({ targetDate, onTick }) {
        this.intervalId = null;
        this.onTick = onTick;
        this.targetDate = targetDate;
    }
    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = this.targetDate - currentTime;
            const time = this.getTimeComponents(deltaTime)
            this.onTick(time)
        }, DELAY);
    }
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs }
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }
}


const timer = new Timer(
    {
        onTick: updateClockFace,
        targetDate: new Date('Oct 01, 2023')
    }
)
timer.start()

function updateClockFace({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}






