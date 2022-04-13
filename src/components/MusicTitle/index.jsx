import P from 'prop-types';
import './styles.css';

import { BsMusicNote, BsVolumeUpFill, BsVolumeMuteFill } from 'react-icons/bs';

export const MusicTitle = ({ title, muted, onClick }) => (
  <div className="container">
    <BsMusicNote className="icon" />
    <div className="title">{title}</div>
    <button onClick={onClick} className="btnMuted">
      {muted ? <BsVolumeMuteFill className="icon" /> : <BsVolumeUpFill className="icon" />}
    </button>
  </div>
);

MusicTitle.propTypes = {
  title: P.string.isRequired,
  muted: P.bool.isRequired,
  onClick: P.func.isRequired,
};
