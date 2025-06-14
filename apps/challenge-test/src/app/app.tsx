// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export function App() {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
}

export default App;
