import React, { useState } from 'react'
import Axios from 'axios'
const Form = () => {
    const [customUrl,setCustomUrl]=useState();
    const [link,setLink]=useState();
    const [shortUrl,setShortUrl]=useState('');
    const [qr,setQr]=useState()
   

    //copy to clipboard
    const copyClipBoard=()=>{
       
        navigator.clipboard.writeText(`https://codeclauseinternship-project-linkshortner.onrender.com/${shortUrl}`).then(res=>{
          
            alert('link  copied to clipboard')
        })
        .catch(err=>{
            alert("error to copy link")
            console.log(err)
        })
    }

    // qr generator 
    const qrGenerator=async()=>{
        try {
            const QR=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://manishlinkshortner.netlify.app/${shortUrl}`;
            setQr(QR)
        } catch (error) {
            alert("error in generating qr code")
        }
    }


    const onsubmit=async(e)=>{
        e.preventDefault();
        try {
            const data = await Axios.post('https://codeclauseinternship-project-linkshortner.onrender.com/',{customUrl,link})
            console.log(data)
            setShortUrl(data.data.shortId)
            setCustomUrl('')
            setLink('')
            
        } catch (error) {
            console.log(error)
            alert("error occured to generate short url")
        }
    }
  return (
    <div className=' w-[100%] m-h-[100px] rounded-lg ' >
        <div className=' w-[500px]'>
            <form onSubmit={onsubmit}>
                <div className=' w-full '><input value={customUrl}  type="text" name='customUrl' onChange={(e)=>{setCustomUrl(e.target.value)}}  placeholder='type custom short url optional' 
                className=' w-full h-[40px] bg-white rounded-lg px-4'/></div>

               <div className=' w-full h-12 mt-3 flex justify-between bg-white rounded-lg'>
                    <input type="text" id='myUrl' value={link}  name='link' onChange={(e)=>{setLink(e.target.value) ,setShortUrl(''),setQr('')}}  placeholder='enter link here...' 
                    className=' w-full bg-transparent px-4' />
                    <div>
                        <button className=' bg-orange-500 rounded-tr-lg rounded-br-lg h-full'>Shorten Url</button>
                    </div>
                </div>
            </form>
                <div >

                {shortUrl?<><h1 className=' text-white'>{`https://codeclauseinternship-project-linkshortner.onrender.com/${shortUrl}`}</h1>
                <div className=' flex justify-center '>
                    <button onClick={copyClipBoard} className=' bg-green-500 w-[110px] h-[70px] rounded-lg mx-2'>Copy Link</button>
                    <button onClick={qrGenerator} className=' bg-orange-500 w-[110px] h-[70px] rounded-lg'>Generate QR</button>
                </div>
                </>:null
                    }
                </div>
                <div className=' mx-[200px] mt-5'>
                    {qr && <img src={qr} />}
                </div>
        </div>
    </div>
  )
}

export default Form