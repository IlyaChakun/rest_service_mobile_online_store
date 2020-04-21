import React from "react";
import {Select} from 'antd';


const Option = Select.Option;

//////////////////////////////////////////////////////////////////////

export const operationSystems = [
    <Option value={null}>
        не выбран
    </Option>
];

const operationSystemsNames = [
    'Android',
    'Apple iOS',
    'Windows Phone',
    'Symbian',
    'Bada',
    'Windows Mobile',
    'BlackBerry OS',
    'Nokia Series 30 +'];

operationSystemsNames.forEach(systemName => {
    operationSystems.push(
        <Option key={systemName} value={systemName}>
            {systemName}
        </Option>
    )
});

//////////////////////////////////////////////////////////////////////
export const screenSize = [
    <Option value={null}>
        не выбран
    </Option>
];

const screenSizeValues = [
    'менее 5',
    '5 - 5.5',
    '5.5 - 6',
    '6 и более'
];

screenSizeValues.forEach(size => {
    screenSize.push(
        <Option key={size} value={size}>
            {size}
        </Option>
    )
});

//////////////////////////////////////////////////////////////////////
export const screenResolutions = [
    <Option value={null}>
        не выбран
    </Option>
];

const screenResolutionValues = [
    '720x1280 (HD) и менее',
    '1080x1920 (FullHD)',
    '1440x2560 (QHD) и более',
];

screenResolutionValues.forEach(resolution => {
    screenResolutions.push(
        <Option key={resolution} value={resolution}>
            {resolution}
        </Option>
    )
});


//////////////////////////////////////////////////////////////////////

export const flashMemories = [
    <Option value={null}>
        не выбран
    </Option>
];

const flashMemoryValues = [
    'до 16 ГБ',
    '32 ГБ',
    '64 ГБ',
    '128 ГБ',
    '256-512 ГБ'
];

flashMemoryValues.forEach(resolution => {
    flashMemories.push(
        <Option key={resolution} value={resolution}>
            {resolution}
        </Option>
    )
});



