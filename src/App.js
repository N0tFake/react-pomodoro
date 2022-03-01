import { string } from 'prop-types';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const date = new Date();
  date.setMinutes(1);
  const secondsTimer = Math.floor((date / 1000 / 60) % 60);
  const [time, setTime] = useState(secondsTimer * 60);

  //seconds.setSeconds(0);
  // console.log('seconds: ', Math.floor((seconds / 1000) % 60));

  useEffect(() => {
    if (time === 0) {
      alert('sem tempo irmão');
      return;
    }

    setTimeout(() => {
      setTime((timer) => timer - 1);
    }, 1000);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="App">
      <span>
        {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default App;
