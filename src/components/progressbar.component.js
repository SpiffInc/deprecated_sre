import React, { useState } from 'react';
import "../components/progressbar.component.css";

  const ProgressBarComponent = () => {
    
    const [progress, setProgress] = useState(0);
    const [btnLabel, setbtnLabel] = useState('Start Request');
    const [finish, setFinish] = useState('');

  return (
    <>
      <div className="progress-container">
        <div className="progress-done" >
          {finish
            ? <div style={{ width: `${progress}%` }} className="finish" />
            : <div style={{ width: `${progress}%` }} className="progress" /> 
          }
        </div>
      </div>

      <div className="button-area">
        <button
          onClick={() => {
            setProgress(progress + 90)
            setbtnLabel('Loading...')
            }
          }
          className="btn-green">
          {btnLabel}
        </button> 
        <button 
          onClick={() => {
            setProgress(progress + 10)
            setFinish(finish)
            }
          }
          className="btn-red">Finish Request
        </button>
      </div>
    </>
  )
}

export default ProgressBarComponent;

