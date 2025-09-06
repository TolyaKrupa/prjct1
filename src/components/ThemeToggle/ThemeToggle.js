import { useEffect, useState } from 'react';
import { CiDark, CiLight } from 'react-icons/ci';

import style from './themeToggle.module.css'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (<div>
        <button className={style.toggleBtn} onClick={toggleTheme}>
            {theme === 'light' ? <>Dark <CiDark /></> : <>Light <CiLight /></>}
        </button>
    </div>);
};

export {ThemeToggle};