import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pruebas = [];

// Crear prueba
app.post('/api/pruebas', (req, res) => {
  const { curso, asignatura, titulo, preguntas } = req.body;
  const nueva = { id: uuidv4(), curso, asignatura, titulo, preguntas };
  pruebas.push(nueva);
  res.status(201).json(nueva);
});

// Obtener prueba
app.get('/api/pruebas/:id', (req, res) => {
  const prueba = pruebas.find(p => p.id === req.params.id);
  if (!prueba) return res.status(404).json({ error: 'No encontrada' });
  res.json(prueba);
});

// Enviar respuestas
app.post('/api/pruebas/:id/responder', (req, res) => {
  const prueba = pruebas.find(p => p.id === req.params.id);
  if (!prueba) return res.status(404).json({ error: 'No encontrada' });

  const resultados = prueba.preguntas.map((p, i) => {
    const correcta = p.respuesta_correcta;
    const user = req.body.respuestas[i];
    return {
      pregunta: p.enunciado,
      respuesta_usuario: user,
      correcta,
      es_correcta: user === correcta
    };
  });

  res.json({ resultados });
});
// Obtener todas las pruebas
app.get('/api/pruebas', (req, res) => {
    res.json(pruebas);
  });
  
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
