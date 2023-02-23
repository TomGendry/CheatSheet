import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Structure from "./Structure";
import secureLocalStorage  from  "react-secure-storage";
import HomeScreen from "./Pages/HomeScreen";
import Aos from 'aos';
import CheatsPage from "./Pages/Cheats";
import News from "./Pages/News";
import SingleCheat from "./Pages/SingleCheat";
import ContactUs from "./Pages/ContactUs";
import Register from "./Pages/Register";
import Profile from "./Pages/Dashboard/Profile";
import Password from "./Pages/Dashboard/Password";
import FavoritesCheat from "./Pages/Dashboard/FavoritesCheat";
import Dashboard from "./Pages/Dashboard/Admin/Dashboard";
import Users from "./Pages/Dashboard/Admin/Users";
import CheatsList from "./Pages/Dashboard/Admin/CheatsList";
import Categories from "./Pages/Dashboard/Admin/Categories";
import AddCheat from "./Pages/Dashboard/Admin/AddCheat";
import Axios from "axios";
import ModifyCheat from "./Pages/Dashboard/Admin/ModifyCheat";

function App() {

  Aos.init()
  const [loginState, setLoginState] = useState(false)
  const [profile, setProfile] = useState(<NotFound />)
  const [password, setPassword] = useState(<NotFound />)
  const [favorites, setFavorites] = useState(<NotFound />)
  const [dashboard, setDashboard] = useState(<NotFound />)
  const [users, setUsers] = useState(<NotFound />)
  const [cheatLists, setCheatLists] = useState(<NotFound />)
  const [categories, setCategories] = useState(<NotFound />)
  const [addCheat, setAddCheat] = useState(<NotFound />)
  const [modifyCheat, setModifyCheat] = useState(<ModifyCheat />)
  const [dataLogin, setDataLogin] = useState(null)
  const [dataUser, setDataUser] = useState([])

  useEffect(() => {
    const dataLogin = secureLocalStorage.getItem('LOGIN_STATE')
    if (dataLogin !== null) {
      setLoginState(dataLogin.value)
    }
  }, [])

  useEffect(() => {
    Axios.get("https://cheatsheet-mysql.herokuapp.com/login", {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
        if (response.data.loggedIn === true) {
            setLoginState(true)
            secureLocalStorage.setItem('LOGIN_STATE', {value: true})
            if (response.data.user[0].admin === 1) {
              setDashboard(<Dashboard />)
              setUsers(<Users />)
              setCheatLists(<CheatsList />)
              setCategories(<Categories />)
              setAddCheat(<AddCheat />)
            }
        } else {
          setLoginState(false)
          secureLocalStorage.removeItem('LOGIN_STATE')
        }
    })

    if (loginState === true) {
      setProfile(<Profile user={dataLogin}/>)
      setPassword(<Password />)
      setFavorites(<FavoritesCheat setDataUser={setDataUser} dataUser={dataUser}/>)
      setModifyCheat(<ModifyCheat />)
    }

  }, [loginState]);

  return (
    <Router>
      <Structure dataUser={dataUser}setLoginStateParent={setLoginState} loginStateParent={loginState}>
        <Routes>
          <Route path='/' element={<HomeScreen dataUser={dataUser} setDataUser={setDataUser} loginState={loginState}/>} />
          <Route path='/news' element={<News />} />
          <Route path='/cheats' element={<CheatsPage />} />
          <Route path='/cheat/:id' element={<SingleCheat loginState={loginState} dataUser={dataUser} setDataUser={setDataUser}/>} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/login' element={<Login setUser={setDataLogin} setLoginStateParent={setLoginState}/>} />
          <Route path='/register' element={<Register setUser={setDataLogin} setLoginStateParent={setLoginState}/>} />
          <Route path='/profile' element={profile} />
          <Route path='/password' element={password} />
          <Route path='/favorites' element={favorites} />
          <Route path='/cheatslist' element={cheatLists} />
          <Route path='/dashboard' element={dashboard} />
          <Route path='/categories' element={categories} />
          <Route path='/modifycheat' element={modifyCheat} />
          <Route path='/users' element={users} />
          <Route path='/addcheat' element={addCheat} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Structure>
    </Router>
  );
}

export default App;
