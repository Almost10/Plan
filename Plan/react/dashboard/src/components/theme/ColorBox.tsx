import React, { CSSProperties } from 'react';
import { Col } from 'react-bootstrap';
import {
    HoverTrigger,
    useHoverContext,
} from '../../hooks/interaction/hoverHook';
import { useColorEditContext } from '../../hooks/context/colorEditContextHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getContrastColor } from '../../util/Color.js';

type ContentsProps = {
    name: string;
    color: string;
};

const Contents = ({ name, color }: ContentsProps) => {
    const cssColor = color.startsWith('var(') ? color : `var(--color-${name})`;
    // Convert color value to CSS variable if it's a variable reference
    let contrastColor = getContrastColor(color);
    if (name.includes('percent') && name.includes('white')) {
        contrastColor = 'var(--color-night-black)';
    }
    const hovered = useHoverContext();
    const { editColor, deleting, deleteColor } = useColorEditContext();

    return (
        <button
            onClick={() => {
                if (deleting) {
                    deleteColor(name);
                } else {
                    editColor(name, color);
                }
            }}
            className='color-box-wrapper'
            style={
                {
                    '--box-color': cssColor,
                    '--box-contrast-color': contrastColor,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                } as CSSProperties
            }
            title={`${name}: ${color}`}>
            <span>{name}</span>
            {!hovered && !deleting && <div>{color}</div>}
            {hovered && !deleting && (
                <div>
                    <FontAwesomeIcon icon={faPencil} />
                </div>
            )}
            {deleting && (
                <div>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            )}
        </button>
    );
};

type BackgroundColorBoxProps = {
    name: string;
    color: string;
    text: boolean;
};

const BackgroundColorBox = ({ name, color, text }: BackgroundColorBoxProps) => {
    return (
        <Col
            lg={2}
            md={3}
            sm={4}
            className={
                'mb-2 px-2 ' +
                (text ? 'text-color-box' : 'background-color-box')
            }>
            <HoverTrigger>
                <Contents name={name} color={color} />
            </HoverTrigger>
        </Col>
    );
};

type Props = {
    name: string;
    color: string;
};

export const ColorBox = ({ name, color }: Props) => {
    const isTextColor =
        name.includes('text') ||
        (name.includes('percent') && name.includes('white'));
    return <BackgroundColorBox name={name} color={color} text={isTextColor} />;
};
