import P from 'prop-types';
import './styles.css';

export const Button = ({ onClick, text, id }) => (
  <button id={id.toLowerCase()} className="button" onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: P.string.isRequired,
  id: P.string.isRequired,
  onClick: P.func.isRequired,
};
