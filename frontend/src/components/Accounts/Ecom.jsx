import React,{useState} from 'react'


const Ecom = () => {
    const [title,setTitle] = useState('')
    const [imgs,setImgs] = useState('')
    const [num,setNum] = useState(0)

    const [show,setShow] = useState(false)


    console.log(title)
    console.log(imgs)


  return (<div>
    <div>
        <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='enter title' />
        <input type='file' value={imgs} onChange={(e)=> setImgs(e.target.value)}  placeholder='enter title' />

        <button onClick={()=> setShow(prev=> !prev)}>Add to cart</button>
    
    </div>

{ show &&
    <div style={{width: "310px", height: "380px", marginTop: "5rem", marginLeft: "5rem", border: "5px solid red"}}>

        <div>
            <img src="/phat-about-img.png" alt="images" height={300} width={300} style={{objectFit: "cover"}} />
        </div>

        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div onClick={()=> setNum(prev=> prev-1)}>+</div>
            <div>{num}</div>
            <div onClick={()=> setNum(prev=> prev+1)}>+</div>

        </div>

        <div style={{textAlign: "center"}}>{title}</div>

    </div>
}

    </div>)
}

export default Ecom