import { Route, Router, Routes } from "react-router-dom";
import Default from "./Pages/Defaultpage.jsx";
import Layout from "./Components/Layout.jsx";
import SignIn from "./OpeningPages/SignInPage.jsx";
import SignUp from "./OpeningPages/RegisterPage.jsx";
import Main from "./Pages/main.jsx";
import Profile from "./Pages/Profilepage.jsx";
import { UserContextProvider } from "./Components/userContext.jsx";



function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/default" element={<Default />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
