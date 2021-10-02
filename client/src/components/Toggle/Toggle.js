import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import sunIcon from '@iconify/icons-feather/sun';
import moonIcon from '@iconify/icons-feather/moon';
import { setTheme } from '../../utils/theme';
import './Toggle.css';

function Toggle()
{
    const [togClass, setTogClass] = useState('dark');
    let theme = localStorage.getItem('theme');

    const handleOnClick = () =>
    {
        if(localStorage.getItem('theme') === 'theme-dark')
        {
            setTheme('theme-light');
            setTogClass('light')
        }
        else
        {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() =>
    {
        if(localStorage.getItem('theme') === 'theme-dark')
        {
            setTogClass('dark')
        }
        else if(localStorage.getItem('theme') === 'theme-light')
        {
            setTogClass('light')
        }
    }, [theme]);

    return (
        <div className="container-toggle">
            <label>
                <input type="checkbox" id="toggle-checkbox" className="toggle-checkbox" onChange={handleOnClick} checked={togClass === "dark"} />
                <div className='toggle-slot'>
                    <div className='sun-icon-wrapper'>
                        <Icon icon={sunIcon} color="#ffbb52" className="sun-icon" inline={true} />
                        {/* <div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div> */}
                    </div>
                    <div className='toggle-button'></div>
                    <div className='moon-icon-wrapper'>
                        <Icon icon={moonIcon} color="white" className="moon-icon" inline={true} />
                        {/* <div class="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div> */}
                    </div>
                </div>
            </label>
        </div>
    )
}

export default Toggle;