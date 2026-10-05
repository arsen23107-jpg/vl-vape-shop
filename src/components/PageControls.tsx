import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function PageControls() {
  const navigate = useNavigate();
  return <div className="page-controls" aria-label="Навигация по странице">
    <button onClick={() => navigate(-1)} aria-label="Назад"><Icon name="arrow" size={18} /><span>Назад</span></button>
    <button onClick={() => navigate('/')} aria-label="На главную"><Icon name="x" size={20} /></button>
  </div>;
}
