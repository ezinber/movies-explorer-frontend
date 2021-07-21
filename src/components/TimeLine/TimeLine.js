import { memo } from 'react';
import './TimeLine.css';

function TimeLine() {
  return (
    <div className="timeline">
    <p className="timeline__element timeline__element_type_colorful">
      1 неделя
    </p>
    <p className="timeline__element">
      Back-end
    </p>
    <p className="timeline__element timeline__element_type_grayscale">
      4 недели
    </p>
    <p className="timeline__element">
      Front-end
    </p>
  </div>
  )
}

export default memo(TimeLine);
