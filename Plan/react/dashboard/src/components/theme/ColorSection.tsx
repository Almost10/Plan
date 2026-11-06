import { ColorBox } from './ColorBox';
import React from 'react';
import { ColorPropertyMap } from './model/ThemeConfig';

type Props = {
    title: string;
    colors: ColorPropertyMap;
};

const ColorSection = ({ title, colors }: Props) => (
    <div className='mb-1'>
        <h5 className='mb-3'>{title}</h5>
        <div className='row'>
            {Object.entries(colors).map(([name, color]) => (
                <ColorBox key={name} name={name} color={color} />
            ))}
        </div>
    </div>
);

export default ColorSection;
