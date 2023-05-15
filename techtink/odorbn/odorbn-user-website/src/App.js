import React, { useContext, useRef } from 'react';
import IdleTimer from 'react-idle-timer'
//import Scss
import { USER_COOKIE, TOKEN_COOKIE } from './services/constants';
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import SSRStorage from './services/storage';
import { useHistory } from 'react-router-dom';
const storage = new SSRStorage();

function App() {

  const history = useHistory();
  const idleTimerRef = useRef(null);



  const onIdle = async () => {
    const user = await storage.getItem(USER_COOKIE);
    // console.log(user);
    // console.log('you have been  active for a while');
    // storage.removeItem(USER_COOKIE);
    // storage.removeItem(TOKEN_COOKIE);


    // if (user !== null) {
    //   if (user?.userType === 'admin' || user?.userType === 'sd' || user?.userType === 'hod' || user?.userType === 'superadmin') {
    //     return history.push(`/admin-login`);
    //   }
    //   if (user?.type === 'indexing') {
    //     return history.push(`/indexing-login`);
    //   } else {
    //     return history.push(`/signin#${user?.type}`);
    //   }
    // }
    // else {
    //   return history.push(`/signin`);
    // }
  }

  return (
    <React.Fragment>
      <Route />
      <IdleTimer
        ref={idleTimerRef} timeout={20 * 10000} onIdle={onIdle}
      />
    </React.Fragment>
  );
}

export default App;
