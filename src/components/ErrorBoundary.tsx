import { Component, type ReactNode } from 'react';
export default class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  componentDidCatch(err: Error) { console.error('Page error:', err); }
  render() {
    if (!this.state.err) return this.props.children;
    return <div className="container section"><h2 className="h2">Не удалось открыть страницу</h2><p className="muted">{this.state.err.message}</p><button className="btn btn--accent" onClick={() => location.reload()}>Обновить</button></div>;
  }
}
