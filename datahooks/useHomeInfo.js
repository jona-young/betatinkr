import { useState, useEffect } from 'react';

export const useHomeInfo = () => {
    const [ homeInfo, setHomeInfo ] = useState([
        {
            img: require('../assets/imgs/lightbulb.png'),
            name: 'Tracking Logs',
            text: 'We want you to track your progress in a simple and intuitive manner that lets you spend more time training instead of tracking'
        },
        {
            img: require('../assets/imgs/chart.png'),
            name: 'Progressive Overload',
            text: 'With our progressive overload calculator, you can set how much more volume you want to do on a week by week basis!'
        },
        {
            img: require('../assets/imgs/dev.png'),
            name: 'Periodization Training',
            text: 'Achieve your long term goals! You are able to set your training cycles (macrocycle, mesocycle, microcycle) to the different parts of your training season'
        },
    ])



    return homeInfo
}