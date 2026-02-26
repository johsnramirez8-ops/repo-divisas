import React, { useEffect,useState } from 'react'

const App = () => {
   const[divisas,Setdivisas] = useState([]);

   useEffect(() => {
    consultar()
    console.log("se muestra al renderizar ")
   console.log("divisisas")
   },[])

  }
    const consultar = async () => {
      let url ="https://co.dolarapi.com/v1/cotizaciones"
      const resultado = await fetch(url)
      return resultado.json()


    }
  return (
    <>
     <div className="contenedor">
        <h1>Convertir desde COP</h1>
        <input type="number" id="valor" placeholder="Cantidad en pesos (COP)"/>
        
        <select id="opcionesDivisas">
            <option value="">Cargando divisas...</option>
        </select>

        <button>Convertir</button>
        <p id="resultado"></p>
    </div>
</>
  )
}

export default App