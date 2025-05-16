import { ThemeProvider } from './context/ThemeContext';
import Layout from './layout/Layout';

function AppContent() {
 
  return (
    <div>
    <Layout/>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

