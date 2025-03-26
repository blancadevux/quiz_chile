import React, { useEffect, useState } from "react";

function App() {
  const [pruebas, setPruebas] = useState([]);
  const [pruebaSeleccionada, setPruebaSeleccionada] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/pruebas")
      .then((res) => res.json())
      .then((data) => setPruebas(data));
  }, []);

  const seleccionarPrueba = (prueba) => {
    setPruebaSeleccionada(prueba);
    setRespuestas(Array(prueba.preguntas.length).fill(null));
  };

  const enviarRespuestas = async () => {
    const res = await fetch(`http://localhost:3001/api/pruebas/${pruebaSeleccionada.id}/responder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respuestas }),
    });
    const data = await res.json();
    setResultados(data.resultados);
  };

  if (!pruebaSeleccionada) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Selecciona una prueba</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pruebas.map((prueba) => (
            <button
              key={prueba.id}
              onClick={() => seleccionarPrueba(prueba)}
              className="border p-4 rounded hover:bg-blue-100 text-left"
            >
              <p className="font-bold">{prueba.titulo}</p>
              <p className="text-sm text-gray-600">{prueba.curso} - {prueba.asignatura}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (resultados) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Resultados</h2>
        {resultados.map((r, i) => (
          <div key={i} className="mb-4 border-b pb-2">
            <p className="font-semibold">{i + 1}. {r.pregunta}</p>
            <p>Tu respuesta: {r.respuesta_usuario}</p>
            <p>Correcta: {r.correcta}</p>
            <p className={r.es_correcta ? "text-green-600" : "text-red-600"}>
              {r.es_correcta ? "✅ Correcto" : "❌ Incorrecto"}
            </p>
          </div>
        ))}
        <button onClick={() => window.location.reload()} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{pruebaSeleccionada.titulo}</h2>
      {pruebaSeleccionada.preguntas.map((pregunta, index) => (
        <div key={index} className="mb-6">
          <p className="font-semibold">{index + 1}. {pregunta.enunciado}</p>
          {pregunta.alternativas.map((alt, i) => (
            <label key={i} className="block mt-1">
              <input
                type="radio"
                name={`pregunta-${index}`}
                value={alt[0]}
                checked={respuestas[index] === alt[0]}
                onChange={() => {
                  const nuevas = [...respuestas];
                  nuevas[index] = alt[0];
                  setRespuestas(nuevas);
                }}
              />
              <span className="ml-2">{alt}</span>
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={enviarRespuestas}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Enviar respuestas
      </button>
    </div>
  );
}

export default App;
