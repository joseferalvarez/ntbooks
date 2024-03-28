import { useEffect } from "react"

export default function App() {

  useEffect(() => {
    //searchBook('el señor de los anillos');
  }, []);

  return (
    <>
      <div>
        <p className='text-3xl'>Hola</p>
       </div>
    </>
  )
}
