import * as React from 'react';
import Svg, {LinearGradient, Stop, Path} from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: 'new 0 0 1000 1600',
    }}
    viewBox="0 0 1000 1600"
    {...props}>
    <LinearGradient
      id="a"
      x1={-293.839}
      x2={1306.161}
      y1={-459.935}
      y2={-459.935}
      gradientTransform="rotate(90 -126.903 166.968)"
      gradientUnits="userSpaceOnUse">
      <Stop
        offset={0}
        style={{
          stopColor: '#13254a',
        }}
      />
      <Stop
        offset={0.268}
        style={{
          stopColor: '#124',
        }}
      />
      <Stop
        offset={0.619}
        style={{
          stopColor: '#0c1834',
        }}
      />
      <Stop
        offset={1}
        style={{
          stopColor: '#03091a',
        }}
      />
    </LinearGradient>
    <Path
      d="M0 1600V0h1000v1600z"
      style={{
        fill: 'url(#a)',
      }}
    />
  </Svg>
);
export default SvgComponent;
