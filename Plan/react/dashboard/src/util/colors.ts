export const nameToCssVariable = (name: string) => {
    return `var(--color-${name})`;
};

export const nameToContrastCssVariable = (name: string) => {
    return `var(--contrast-color-${name})`;
};

export const cssVariableToName = (cssVariable: string) => {
    return cssVariable?.replace('var(--color-', '').replace(')', '');
};

export const hsxStringToArray = (hsxString: string) => {
    const color = hsxString.substring(4, hsxString.length - 1);
    const split = color.split(',');
    const h = Number(split[0]);
    const s = Number(split[1].substring(0, split[1].length - 1));
    const x = Number(split[2].substring(0, split[2].length - 1));
    return [h, s, x];
};

export const hslaStringToArray = (hslaString: string) => {
    const color = hslaString.substring(4, hslaString.length - 1);
    const split = color.split(',');
    const h = Number(split[0]);
    const s = Number(split[1].substring(0, split[1].length - 1));
    const l = Number(split[2].substring(0, split[2].length - 1));
    const a = Number(split[3].substring(0, split[3].length - 1));
    return [h, s, l, a];
};

export const hslToHsv = ([h, s, l]: number[]) => {
    // Normalize s and l if they are > 1 (i.e., in [0, 100])
    if (h > 1 || s > 1 || l > 1) {
        h = h / 360;
        s = s / 100;
        l = l / 100;
    }
    const v = l + s * Math.min(l, 1 - l);
    const newS = v === 0 ? 0 : 2 * (1 - l / v);
    // Clamp to [0, 1]
    return [h, Math.max(0, Math.min(1, newS)), Math.max(0, Math.min(1, v))];
};

export const hsvToHex = (hsv: number[]) => {
    return rgbToHexString(hsvToRgb(hsv));
};

export const hsvToRgb = ([h, s, v]: number[]) => {
    let r!: number, g!: number, b!: number;

    if (h > 1 || s > 1 || v > 1) {
        h = h / 360;
        s = s / 100;
        v = v / 100;
    }

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            break;
    }

    return [r * 255, g * 255, b * 255];
};

export const randomHSVColor = (i: number) => {
    const goldenRatioConjugate = 0.618033988749895;
    const hue = (i * goldenRatioConjugate) % 1;
    const saturation = 0.7;
    const value = 0.7 + Math.random() / 10;
    return [hue, saturation, value];
};

export const rgbStringToArray = (rgbString: string) => {
    const colors = rgbString.substring(4, rgbString.length - 1);
    const split = colors.split(',');
    return [
        Number(split[0].trim()),
        Number(split[1].trim()),
        Number(split[2].trim()),
    ];
};

export const rgbaStringToArray = (rgbaString: string) => {
    const colors = rgbaString.substring(5, rgbaString.length - 1);
    const split = colors.split(',');
    return [
        Number(split[0].trim()),
        Number(split[1].trim()),
        Number(split[2].trim()),
        split.length === 4 ? Number(split[3].trim()) : 1,
    ];
};

export const rgbToHexString = ([r, g, b]: number[]) => {
    return '#' + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
};

const rgbToHex = (component: number) => {
    return Math.floor(component).toString(16).padStart(2, '0');
};

export const hexToRgb = (hexString: string) => {
    const hex = hexString.replace('#', '');
    if (hex.length === 6) {
        const r = Number.parseInt(hex.substring(0, 2), 16);
        const g = Number.parseInt(hex.substring(2, 4), 16);
        const b = Number.parseInt(hex.substring(4, 6), 16);
        return [r, g, b];
    } else {
        // 3 digit hex
        const rLetter = hex.substring(0, 1);
        const gLetter = hex.substring(1, 2);
        const bLetter = hex.substring(2, 3);
        const r = Number.parseInt(rLetter + rLetter, 16);
        const g = Number.parseInt(gLetter + gLetter, 16);
        const b = Number.parseInt(bLetter + bLetter, 16);
        return [r, g, b];
    }
};

// https://css-tricks.com/converting-color-spaces-in-javascript/
export const rgbToHsl = ([r, g, b]: number[]) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h!: number, s: number;
    const l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        s = Math.max(0, Math.min(1, s));
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return [h, s, l];
};

// From https://stackoverflow.com/a/3732187
export const withReducedSaturation = (
    hex: string,
    reduceSaturationPercentage?: number,
) => {
    if (hex.startsWith('var(')) hex = calculateCssHexColor(hex);
    const saturationReduction = reduceSaturationPercentage || 0.7;

    const rgb = hexToRgb(hex);
    let [h, s, l] = rgbToHsl(rgb);

    // Ensure s and l are in [0, 1]
    if (s > 1) s = s / 100;
    if (l > 1) l = l / 100;

    // To css property
    return (
        'hsl(' +
        h * 360 +
        ',' +
        s * 100 * saturationReduction +
        '%,' +
        l * 95 +
        '%)'
    );
};

export const rgbToString = ([r, g, b]: number[]) => {
    return `rgb(${r}, ${g}, ${b})`;
};

export const rgbaToString = ([r, g, b, a]: number[]) => {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const hslToString = ([h, s, l]: number[]) => {
    return `hsl(${h}, ${s}%, ${l}%)`;
};

export const hsvToString = ([h, s, v]: number[]) => {
    return `hsv(${h}, ${s}%, ${v}%)`;
};

export const calculateCssHexColor = (
    cssColor: string,
    inElement?: HTMLElement | null,
) => {
    const colorCalculationElement = document.createElement('div');
    colorCalculationElement.style.display = 'none';
    colorCalculationElement.style.color = cssColor;
    const element = inElement || document.body;
    element.appendChild(colorCalculationElement);
    const rgbString = window
        .getComputedStyle(colorCalculationElement, null)
        .getPropertyValue('color');
    const hex = rgbToHexString(rgbStringToArray(rgbString));
    colorCalculationElement.remove();
    return hex;
};

export const calculateCssColors = (cssSelector: string) => {
    const colors: {
        color: string | null;
        backgroundColor: string | null;
        borderColor: string | null;
    } = {
        color: null,
        backgroundColor: null,
        borderColor: null,
    };

    // Search through all document stylesheets
    for (const stylesheet of document.styleSheets) {
        try {
            // Skip if we can't access the rules (e.g., cross-origin stylesheets)
            if (!stylesheet.cssRules) continue;

            // Look through all rules in the stylesheet
            for (const rule of stylesheet.cssRules) {
                if (
                    rule instanceof CSSStyleRule &&
                    rule.selectorText === cssSelector
                ) {
                    const style = rule.style;

                    // Get color if set
                    if (style.color) {
                        colors.color = style.color;
                    }

                    // Get background-color if set
                    if (style.backgroundColor) {
                        colors.backgroundColor = style.backgroundColor;
                    }

                    // Get border-color if set
                    if (style.borderColor) {
                        colors.borderColor = style.borderColor;
                    }
                }
            }
        } catch (e) {
            // Skip stylesheets we can't access
        }
    }

    return colors;
};
