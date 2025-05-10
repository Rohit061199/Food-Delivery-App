import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import Register from './screens/Register';
import Login from './screens/Login';
import OrderScreen from './screens/OrderScreen';
import Adminscreen from './screens/Adminscreen';
import UsersList from './screens/UsersList';
import PizzasList from './screens/PizzasList';
import AddPizza from './screens/AddPizza';
import OrdersList from './screens/OrdersList';
import TrackingScreen from './screens/TrackingScreen';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      
        <Routes>
          <Route path='/'  element={<HomeScreen />} />
          <Route path='/cart'  element={<CartScreen />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/order' element={<OrderScreen />} />
          <Route path='/admin/*' element={<Adminscreen />} />
          <Route path="/track/:orderId" element={<TrackingScreen />} />

          
        </Routes>
      

    </div>
    </Router>
  );
}

export default App;
