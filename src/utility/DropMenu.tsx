import React from 'react';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { CapAndReplace } from './CapAndReplace';

interface Option {
    value: string;
    label: string;
}

interface DropMenuProps {
    options: Option[];
    selectedOption: Option;
    onSelectedOptionChange: (option: Option) => void;
}

const DropMenu: React.FC<DropMenuProps> = ({ options, selectedOption, onSelectedOptionChange }) => {
    const handleSelect = (value: string) => {
        const selected = options.find(option => option.value === value);
        if (selected) {
            onSelectedOptionChange(selected);
        }
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
