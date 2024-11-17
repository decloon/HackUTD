// eslint-disable-next-line no-unused-vars
import React from 'react'
import Landing from './components/Landing'
import About from './components/About'
import Team from './components/Team'
import Footer from './components/Footer'
import MoreDetails from './components/MoreDetails'
import Dashboard from './components/Dashboard'



const App = () => {
  return (
    <div>
      <Landing/>
      <About/>
      <MoreDetails/>
      <Dashboard/>
      <Team/>
      <Footer/>
    </div>
  )
}

export default App