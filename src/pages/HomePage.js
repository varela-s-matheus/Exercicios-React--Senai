import React, {useState, useEffect} from "react";
import { Timer } from "./Timer";
import { PageHeader } from "./PageHeader";
import "./HomePage.css";

const DEFAULT_TIMER = {
    year:0,
    month:0,
    day:0,
    hour:0,
    minutes:0,
    seconds:0
}


export function HomePage() {

    const [title, setTitle] = useState('AULA AO VIVO');
    const [subtitle, setSubtitle] = useState('ReactJs - Primeiros Passos');
    const [message, setMessage] = useState('A aula começa em');
    const [endDate, setEndDate] = useState(new Date(2024, 1, 20, 0, 0, 0, 0));
    const [time, setTime] = useState(calcTime(endDate));
    const [tick, setTick] = useState(null);

    function calcTime(endDate) {
        const currentDate = new Date();

        let year = 0;
        if(endDate.getFullYear() > currentDate.getFullYear()){
            year = endDate.getFullYear() - currentDate.getFullYear();
        }
        
        if(year < 0) return DEFAULT_TIMER;

        let month = endDate.getMonth() - currentDate.getMonth();
        if(month < 0 ) {
            month += 12;
            year--;
        }

        if(month < 0) return DEFAULT_TIMER;

        let day = endDate.getDate() - currentDate.getDate();
        if(day < 0) {
            day += 30;
            month--;
        }
        if(day < 0) return DEFAULT_TIMER;

        let hour = endDate.getHours() - currentDate.getHours();
        if(hour < 0) {
            hour += 24;
            day--;
        }
        
        let minutes = endDate.getMinutes() - currentDate.getMinutes();
        if(minutes < 0) {
            minutes += 60;
            hour--;
        }
        
        let seconds = endDate.getSeconds() - currentDate.getSeconds();
        if(seconds < 0) {
            seconds += 60;
            minutes--;
        }

        const timer = {
            year,
            month,
            day,
            hour,
            minutes,
            seconds
        }

        return timer;
    }

    useEffect(() => {

        async function fetchData() {
            const response = await fetch('/data.json');
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setSubtitle(data.subTitle);
                setMessage(data.message);
            }
        }

        fetchData();

    }, []);


    useEffect(() => {
        const tick = setInterval(() => {
            const time = calcTime(endDate);
            setTime(time);
        }, 1000);
        setTick(tick);
    },[]);

    useEffect(() => {
        const {year, month, day, hour, minutes, seconds} = time;
        if(year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minutes <= 0 && seconds <= 0) {
            window.clearInterval(tick);
        }
    }, [time])

    const {year, month, day, hour, minutes, seconds} = time;

    return(
        <div className="page">
            <PageHeader title="Aula ao vivo" subtitle="React JS"/>
            <Timer
                message="A aula vai começar em"
                year={year}
                month={month}
                day={day}
                hour={hour}
                minutes={minutes}
                seconds={seconds}
            />
        </div>

    )

}