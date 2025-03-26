
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const baseDir = './pruebas_json';

const recorrerYSubir = async () => {
  const niveles = fs.readdirSync(baseDir);
  for (const nivel of niveles) {
    const asignaturas = fs.readdirSync(path.join(baseDir, nivel));
    for (const archivo of asignaturas) {
      const contenido = fs.readFileSync(path.join(baseDir, nivel, archivo), 'utf-8');
      const pruebas = JSON.parse(contenido);
      for (const prueba of pruebas) {
        const res = await fetch('http://localhost:3001/api/pruebas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prueba)
        });
        const data = await res.json();
        console.log(`✅ Subida prueba: ${data.titulo} (ID: ${data.id})`);
      }
    }
  }
};

recorrerYSubir();
