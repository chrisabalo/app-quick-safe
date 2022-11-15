import {create} from 'react-native-pixel-perfect'
import { useWindowDimensions } from 'react-native'


const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;

const designResolution = {
    width: 414,
    height: 896
}


const perfectSize = create(designResolution)
export {
    perfectSize,
    windowHeight,
    windowWidth,
}

