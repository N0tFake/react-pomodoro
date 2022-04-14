import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './components/Button';
import { UseInterval } from './utils/clock/useInterval';
import { UseAsync, FetchData, video_url } from './utils/fetchData/UseAsync';
import ReactPlayer from 'react-player';
import { MusicTitle } from './components/MusicTitle';

import { BsPlayFill, BsPauseFill } from 'react-icons/bs';

function App() {
  const [reFetchData, result, error, status] = UseAsync(FetchData, true);

  const getTitle = () => {
    let title = '';
    if (status === 'settled') {
      title = result.items[0].snippet.title;
    } else if (status === 'idle') {
      title = 'Não iniciado';
    } else if (status === 'pending') {
      title = 'Carregando';
    } else if (status === 'error') {
      title = error;
    }
    return title;
  };

  const [btnPomodoro, setbtnPomodoro] = useState({
    title: 'Pomodoro',
    isAble: true,
  });
  const [btnShortBreak, setbtnShortBreak] = useState({
    title: 'Short Break',
    isAble: false,
  });
  const [btnLongBreak, setbtnLongBreak] = useState({
    title: 'Long Break',
    isAble: false,
  });

  // Bloco de variaveis do relogio
  const [timer, setTimer] = useState(20 * 60);
  const [countdownPomodoro, setcountdownPomodoro] = useState(timer);
  const [delay, setDelay] = useState(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const set = () => {
      if (btnPomodoro.isAble) {
        return 20;
      } else if (btnShortBreak.isAble) {
        return 5;
      } else if (btnLongBreak.isAble) {
        return 10;
      }
    };
    setTimer(set() * 60);
    setcountdownPomodoro(timer);
  }, [btnPomodoro, btnShortBreak, btnLongBreak, timer]);

  UseInterval(() => setcountdownPomodoro((c) => c - 1), delay);

  const minutes = Math.floor(countdownPomodoro / 60);
  const seconds = countdownPomodoro % 60;
  const clock = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

  useEffect(() => {
    if (clock == '00:00') {
      setDelay(null);
      handleNotification();
    }
  }, [clock]);
  ///////////////////////////////////////////////////////////////////

  const [isPause, setIsPause] = useState(true);

  const [nameBtn, setNameBtn] = useState(isPause ? 'Start' : 'Pause');

  function handleBtnPause() {
    setIsPause(!isPause);
    setNameBtn(isPause ? 'Pause' : 'Start');
    delay == 1000 ? setDelay(null) : setDelay(1000);
  }

  function handleMutedVideo() {
    setMuted(!muted);
  }

  function replaceBtn(btn) {
    if (btn.isAble === false) {
      if (btnPomodoro.isAble === true) {
        setbtnPomodoro({ title: 'Pomodoro', isAble: false });
      } else if (btnShortBreak.isAble === true) {
        setbtnShortBreak({ title: 'Short Break', isAble: false });
      } else if (btnLongBreak.isAble === true) {
        setbtnLongBreak({ title: 'Long Break', isAble: false });
      }

      let _isStart;
      switch (btn.title) {
        case 'Pomodoro':
          if (btn.isAble === false) {
            _isStart = btn.isStart;
            setbtnPomodoro({ title: 'Pomodoro', isAble: true, isStart: _isStart });
          }
          break;
        case 'Short Break':
          if (btn.isAble === false) {
            setbtnShortBreak({ title: 'Short Break', isAble: true, isStart: _isStart });
          }
          break;
        case 'Long Break':
          if (btn.isAble === false) {
            setbtnLongBreak({ title: 'Long Break', isAble: true, isStart: _isStart });
          }
          break;
      }
    }
  }

  const id = {
    Pomodoro: btnPomodoro.isAble ? 'able' : 'disable',
    ShortBreak: btnShortBreak.isAble ? 'able' : 'disable',
    LongBreak: btnLongBreak.isAble ? 'able' : 'disable',
  };

  document.title = clock;

  function handleNotification() {
    var options = {
      body: 'Tempo acabou',
    };
    new Notification('Tempo esgotado', options);
  }

  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, []);

  return (
    <>
      <ReactPlayer url={video_url} width={'0px'} height="0px" playing={play} muted={muted} />
      <h1 className="Title">Pomodoro Timer</h1>
      <div className="App">
        <div>
          <div className="container-btn-clocks">
            <Button onClick={() => replaceBtn(btnPomodoro)} text={btnPomodoro.title} id={id.Pomodoro} />
            <Button onClick={() => replaceBtn(btnShortBreak)} text={btnShortBreak.title} id={id.ShortBreak} />
            <Button onClick={() => replaceBtn(btnLongBreak)} text={btnLongBreak.title} id={id.LongBreak} />
          </div>
          {nameBtn == 'Pause' ? null : <div className="pause">Pause {/* <BsPlayFill color="#FF6347"  /> */}</div>}
          <div className="Clock">
            <div>{clock}</div>
          </div>

          <div className="container-btn-functions">
            <Button onClick={handleBtnPause} text={nameBtn} id={'return'} />
            <Button onClick={() => setcountdownPomodoro(timer)} text="Reset" id={'reset'} />
          </div>
        </div>
        <MusicTitle title={getTitle()} muted={muted} onClick={handleMutedVideo} />
      </div>
    </>
  );
}

export default App;
