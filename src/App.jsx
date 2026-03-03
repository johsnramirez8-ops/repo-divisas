import React, { useEffect, useState } from 'react'

const App = () => {

  const [divisas, setDivisas] = useState([])
  const [seleccion, setSeleccion] = useState('')
  const [divisaDefinitiva, setDivisaDefinitiva] = useState(null)
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    consultar()
  }, [])

  const consultar = async () => {
    let url = "https://co.dolarapi.com/v1/cotizaciones"
    const resultado = await fetch(url)
    const data = await resultado.json()
    setDivisas(data)
  }

  const cambioDivisa = (idDivisa) => {
    console.log("divisa seleccionada ", idDivisa)

    setSeleccion(idDivisa)

    const encontrada = buscarDivisa(idDivisa)
    setDivisaDefinitiva(encontrada)

    console.log("divisa encontrada", encontrada)
  }

  const buscarDivisa = (idDivisa) => {
    let divisaEncontrada = divisas.find(
      objDivisa => objDivisa.moneda === idDivisa
    )
    return divisaEncontrada
  }

  const convertir = () => {

    const valor = document.getElementById("valor").value

    

    if (!valor || !divisaDefinitiva) {
      return
    }

    const tasa = divisaDefinitiva.venta
    const conversion = valor / tasa

    setResultado(conversion.toFixed(2))
  }

  return (
    <>
      <div className="contenedor">
        <h1>Convertir desde COP</h1>

        <input
          type="number"
          id="valor"
          placeholder="Cantidad en pesos (COP)"
        />

        <select
          id="opcionesDivisas"
          onChange={(evento) => cambioDivisa(evento.target.value)}
        >
          <option value="">Seleccione una divisa</option>

          {divisas &&
            divisas.map(divisa => (
              <option
                key={divisa.moneda}
                value={divisa.moneda}
              >
                {divisa.nombre}
              </option>
            ))
          }
        </select>

        <button onClick={convertir}>
          Convertir
        </button>

        <p id="resultado">
          {resultado && `Resultado: ${resultado} ${seleccion}`}
        </p>

      </div>
    </>
  )
}

export default App