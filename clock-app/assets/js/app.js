const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const formAlarm = document.getElementById('formAlarm');
let isPermitShowNotification = false;
let isCreatedNotification = false;
let NotifiationCounter = 0;

document.addEventListener('DOMContentLoaded', (e) => {
   
    if ('Notification' in window) {
        Notification.requestPermission((request) => {
            isPermitShowNotification = request === 'granted';

            if (!isPermitShowNotification) {
                const [input, button] = formAlarm.children;
                input.value = "";
                input.disabled = true;
                button.disabled = true;
            }
        })
    }

    if (localStorage.getItem('alarma') != null) {
        const input = formAlarm.children[0];
        const alarm = new Date(localStorage.getItem('alarma'));

        console.log(alarm);
        input.value = formatNumber(alarm.getHours()) + ":" + formatNumber(alarm.getMinutes());
    }
        
    getCurrentTime();
    
});

formAlarm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('time');

    if (value === null || value === "") 
    {
        alert("Seleccione una hora precisa")
    } else 
    {
        
        // Obtener las horas y min de cada valor 
        let alarmHour = parseInt(value.substring(0,2));
        let alarmMinutes = parseInt(value.substring(3));

        const currentDate = new Date();
        const horasMenores = alarmHour < currentDate.getHours();
        const horasIguales = alarmHour === currentDate.getHours();
        const minutosMenoresoIguales = alarmMinutes <= currentDate.getMinutes();
        const setAlarm = new Date();


        if (horasMenores || (horasIguales && minutosMenoresoIguales)) 
        {
            setAlarm.setDate(setAlarm.getDate() + 1);
        }
        setAlarm.setHours(alarmHour);
        setAlarm.setMinutes(alarmMinutes);
        setAlarm.setSeconds('0');
        console.log(setAlarm);

        localStorage.setItem("alarma", setAlarm.toString());
    }
})

const formatNumber = (value) => value < 10 ? '0'+value : value;

const showAlarm = () => {
    if (isPermitShowNotification && localStorage.getItem('alarma') != null) 
    {
        const currentTime = new Date();
        const alarm = new Date(localStorage.getItem('alarma'));
        const isTheSameDay = currentTime.getDate() === alarm.getDate();
        const isTheSameHour = currentTime.getHours() === alarm.getHours();
        const isTheSameMinutes = currentTime.getMinutes() === alarm.getMinutes();

        if (isTheSameDay && isTheSameHour && isTheSameMinutes) {
                let notification = new Notification('This is the alarm');
        }   
    }
};

function getCurrentTime () {

    showAlarm();
    
    const currentDate = new Date();

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}

setInterval(function() {
    getCurrentTime();
}, 1000);