import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Layout from "./Components/Layout.jsx";
import SignIn from "./OpeningPages/SignInPage.jsx";
import SignUp from "./OpeningPages/RegisterPage.jsx";



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
