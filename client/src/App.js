import './App.css';
import Routing from './Routing'
import Home from './pages/Home';
import { TicketProvider } from './contexts/TicketContext';
import UserDashboard from './pages/User/UserDashboard';
function App() {
  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
