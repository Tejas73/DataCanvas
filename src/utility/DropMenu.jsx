import React from 'react';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { CapAndReplace } from './CapAndReplace';

const DropMenu = ({ options, selectedOption, onSelectedOptionChange }) => {
    const handleSelect = (value) => {
        const selected = options.find(option => option.value === value);
        onSelectedOptionChange(selected);
    };

    return (
        <Menu menuButton={<MenuButton>{CapAndReplace(selectedOption.label)}</MenuButton>}>
            {options.map(option => (
                <MenuItem key={option.value} onClick={() => handleSelect(option.value)}>
                    {CapAndReplace(option.label)}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default DropMenu;
