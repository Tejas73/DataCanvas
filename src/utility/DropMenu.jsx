import React from 'react';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const DropMenu = ({ options, selectedOption, onSelectedOptionChange }) => {
        const handleSelect = (value) => {
        const selected = options.find(option => option.value === value);
        onSelectedOptionChange(selected);
    };

    return (
        <Menu menuButton={<MenuButton>{selectedOption.label}</MenuButton>}>
            {options.map(option => (
                <MenuItem key={option.value} onClick={() => handleSelect(option.value)}>
                    {option.label}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default DropMenu;
