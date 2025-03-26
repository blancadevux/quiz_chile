# 📘 Quiz Chile

**Quiz Chile** es una aplicación web para subir y rendir pruebas escolares tipo selección múltiple, organizada por curso y asignatura. Está diseñada para alumnos de 1º a 4º Medio y permite responder las preguntas y obtener resultados al instante.

---

## 🚀 Tecnologías usadas

- 🖥️ **Frontend**: React + Vite + TailwindCSS
- 🔧 **Backend**: Node.js + Express
- 📁 **Base de datos**: En memoria (JSON), con posibilidad de carga masiva desde archivos
- 🧠 **Formato de pruebas**: JSON estructurado por curso/asignatura

---

## 🧑‍💻 Cómo correr el proyecto localmente

### 1. Clona este repositorio

```bash
git clone https://github.com/blancadevux/quiz_chile.git
cd quiz_chile
```

### 2. Inicia el backend

```bash
cd backend
npm install
npm start
```

Servidor disponible en `http://localhost:3001`

---

### 3. Inicia el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en `http://localhost:5173`

---

### 4. Importar pruebas de ejemplo

```bash
node importar_pruebas.js
```

Este script sube automáticamente más de 20 pruebas con 10 preguntas cada una desde archivos `.json` organizados por curso y asignatura.

---

## 📚 Estructura de pruebas

Las pruebas están organizadas en `pruebas_json/`, dentro de carpetas como:

```
/pruebas_json/
├── 1medio/
│   ├── historia.json
│   ├── lenguaje.json
│   └── matematica.json
...
```

Cada archivo contiene múltiples pruebas con el siguiente formato:

```json
{
  "titulo": "Prueba 1: Historia 1º Medio",
  "curso": "1º Medio",
  "asignatura": "Historia",
  "preguntas": [
    {
      "enunciado": "¿Cuándo fue la Revolución Francesa?",
      "alternativas": ["A. 1776", "B. 1789", "C. 1804", "D. 1815"],
      "respuesta_correcta": "B"
    }
  ]
}
```

---

## ✨ Funcionalidades

- 📄 Ver todas las pruebas disponibles agrupadas por curso y asignatura
- ✅ Responder preguntas de selección múltiple
- 📊 Ver resultados inmediatos después de enviar
- 📂 Carga masiva de pruebas desde JSON
- ⚙️ 100% funcional en local, sin base de datos externa

---

## ✍️ Autor

Desarrollado con ❤️ por [@blancadevux](https://github.com/blancadevux)

---