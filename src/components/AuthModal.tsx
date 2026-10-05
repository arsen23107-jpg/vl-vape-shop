import { type CSSProperties, type RefCallback, useState } from 'react';
import Modal from './Modal';
import { type MorphPhase } from '../motion/softMorph';

type Mode = 'login' | 'register' | 'reset';
export default function AuthModal({ onClose, phase, originStyle, surfaceRef }: { onClose: () => void; phase: MorphPhase; originStyle: CSSProperties; surfaceRef: RefCallback<HTMLDivElement> }) {
  const [mode, setMode] = useState<Mode>('login');
  const title = mode === 'login' ? 'Личный кабинет' : mode === 'register' ? 'Регистрация' : 'Восстановление пароля';
  return <Modal title={title} onClose={onClose} phase={phase} originStyle={originStyle} surfaceRef={surfaceRef}>
    <h2 className="auth__title">{title}</h2>
    <form key={mode} className="form auth__form soft-morph-content" onSubmit={event => event.preventDefault()}>
      {mode === 'register' && <label>Имя<input className="field" autoComplete="name" /></label>}
      <label>Логин <i>*</i><input className="field" autoComplete="username" /></label>
      {mode !== 'reset' && <label>Пароль <i>*</i><input className="field" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>}
      {mode === 'login' && <div className="auth__options"><label className="auth__remember"><input type="checkbox" /> <span>Запомнить меня</span></label><button type="button" onClick={() => setMode('reset')}>Забыли пароль?</button></div>}
      {mode === 'reset' && <p className="muted">Введите логин, чтобы восстановить доступ.</p>}
      <div className="auth__actions"><button className="btn btn--accent" type="submit">{mode === 'login' ? 'Войти' : mode === 'register' ? 'Зарегистрироваться' : 'Отправить'}</button>{mode === 'login' ? <button className="btn btn--ghost" type="button" onClick={() => setMode('register')}>Регистрация</button> : <button className="btn btn--ghost" type="button" onClick={() => setMode('login')}>Назад</button>}</div>
    </form>
  </Modal>;
}
