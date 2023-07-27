import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

const App = () => {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently
  } = useAuth0();

  // Wait for the authentication to complete before showing anything
  if (isLoading) {
    return <div>Loading...</div>;
  }
 async function callAPI(){
    try{
      const response = await axios.get("http://localhost:4000/");
    }
    catch(error){
      console.log(error)
    }
  }

  async function callProtectedAPI(){
    try {
       const token = await getAccessTokenSilently();
       const response = await axios.get("http://localhost:4000/protected" , {
        headers:{
          Authorization:`Bearer ${token}`
        }
       });
       console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login With PopUp</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Login With Redirect</button>
        </li>
        {isAuthenticated && (
          <li>
            <button onClick={logout}>LogOut</button>
          </li>
        )}
      </ul>
      <h3>
        user is {isAuthenticated ? "Logged In" : "Not Logged In"}
      </h3>
        <ul>
          <li><button onClick={callAPI} >Call API route</button></li>
          <li><button onClick={callProtectedAPI}>Call protected API route</button></li>
        </ul>
        {isAuthenticated &&  <pre> {JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
};

export default App;
