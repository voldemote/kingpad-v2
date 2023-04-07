import { styled } from '@mui/system';
import './index.css';

interface CircularProps {
  percentage: number;
}

export const CircularProgressBar = (props: CircularProps) => {
  const sqSize = 150;
  const strokeWidth = 13;
  const innerStrokeWidth = 5;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * props.percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <CircleBackground
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="circle-progress"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${innerStrokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
        }}
      />
      <CircleText className="circle-text" x="50%" y="40%" dy=".3em" textAnchor="middle">
        Progress
      </CircleText>
      <ProgressText className="progress-text" x="50%" y="56%" dy=".3em" textAnchor="middle">
        {props.percentage}%
      </ProgressText>
    </svg>
  );
};

const CircleBackground = styled('circle')(({ theme }) => ({
  // stroke: theme.palette.info.main
  stroke: '#D7CBFF'
}));

const CircleText = styled('text')(({ theme }) => ({
  fontSize: '13px',
  fontFamily: 'gotham-bold',
  fill: '#8462F6'
}));

const ProgressText = styled('text')(({ theme }) => ({
  fontSize: '22px',
  fontFamily: 'gotham-bold',
  fill: theme.palette.dark.contrastText
}));
