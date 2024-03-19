import { useState } from 'react'
import './App.css'
import GenerateShortUrl from './Components/GenerateShortUrl'
import AnimatedBg from './Shared/AnimatedBg'

function App() {
 

  return (
    <div className=' w-[100%] m-h-[100vh]'>

          <AnimatedBg/>
      <div>
        <div>
        <h1 className=' font-bold text-yellow-400 text-center mb-4'>URL <span className=' text-black'>Shortner</span></h1>
        <GenerateShortUrl  />
        </div>

      </div>
    </div>
  )
}

export default App
