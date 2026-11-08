import Svg, { Circle, Path, Rect } from 'react-native-svg';

const SHAPES = {
    plus: <Path d="M12 5v14M5 12h14" />,
    minus: <Path d="M5 12h14" />,
    check: <Path d="M5 12l5 5 9-10" />,
    chevronLeft: <Path d="M15 18l-6-6 6-6" />,
    chevronRight: <Path d="M9 6l6 6-6 6" />,
    mic: (
        <>
            <Rect x="9" y="3" width="6" height="11" rx="3" />
            <Path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </>
    ),
    micOff: (
        <>
            <Rect x="9" y="3" width="6" height="11" rx="3" />
            <Path d="M5 11a7 7 0 0 0 14 0M12 18v3M3 3l18 18" />
        </>
    ),
    grid: (
        <>
            <Rect x="3" y="3" width="7" height="7" rx="1.5" />
            <Rect x="14" y="3" width="7" height="7" rx="1.5" />
            <Rect x="3" y="14" width="7" height="7" rx="1.5" />
            <Rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
    ),
    gamepad: (
        <>
            <Path d="M6 11h4M8 9v4M15 12h.01M18 10h.01" />
            <Path d="M17.3 5H6.7a4 4 0 0 0-3.98 3.6l-.7 6.9A2.7 2.7 0 0 0 4.7 18.5c1 0 1.9-.6 2.4-1.5L8 15h8l.9 2c.5.9 1.4 1.5 2.4 1.5a2.7 2.7 0 0 0 2.7-3l-.7-6.9A4 4 0 0 0 17.3 5z" />
        </>
    ),
    user: (
        <>
            <Circle cx="12" cy="8" r="4" />
            <Path d="M4 21a8 8 0 0 1 16 0" />
        </>
    ),
    eye: (
        <>
            <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            <Circle cx="12" cy="12" r="3" />
        </>
    ),
    eyeOff: (
        <>
            <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM3 3l18 18" />
            <Circle cx="12" cy="12" r="3" />
        </>
    ),
    alert: (
        <>
            <Circle cx="12" cy="12" r="9" />
            <Path d="M12 8v5M12 16h.01" />
        </>
    ),
    lock: (
        <>
            <Rect x="5" y="11" width="14" height="10" rx="2" />
            <Path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </>
    ),
    trash: <Path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
    trashLines: <Path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />,
    camera: (
        <>
            <Path d="M4 8h3l2-3h6l2 3h3v11H4z" />
            <Circle cx="12" cy="13" r="3.5" />
        </>
    ),
    image: (
        <>
            <Rect x="3" y="4" width="18" height="16" rx="2" />
            <Circle cx="9" cy="10" r="2" />
            <Path d="M21 16l-5-5-9 9" />
        </>
    ),
    mail: (
        <>
            <Rect x="3" y="5" width="18" height="14" rx="2" />
            <Path d="M3 7l9 6 9-6" />
        </>
    ),
    logout: <Path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10" />,
    wifiOff: <Path d="M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0M12 19h.01M3 3l18 18" />,
    refresh: <Path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" />,
};

export default function Icon({ name, size = 24, color, strokeWidth = 2 }) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {SHAPES[name]}
        </Svg>
    );
}
