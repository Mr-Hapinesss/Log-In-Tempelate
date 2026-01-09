import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Layout from "./Components/Layout.jsx";
import SignIn from "./OpeningPages/SignInPage.jsx";
import SignUp from "./OpeningPages/RegisterPage.jsx";
import { UserContextProvider } from "./Components/userContext.jsx";



function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
