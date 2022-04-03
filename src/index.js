//import packages
import { createRoot } from 'react-dom/client';
//import components
import App from './components/App';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);