import axios from "axios";
import fs from "fs";

const baseUrl = "http://localhost:3000/productos"; 
const idParaActualizar = "PD020"; 
const idParaEliminar = "PD001";    
const iterations = 50;

const resultados = {
  GET: [],
  POST: [],
  PUT: [],
  DELETE: [],
};


async function medirTiempo(nombre, func) {
  const inicio = Date.now();
  try {
    await func();
    const duracion = Date.now() - inicio;
    resultados[nombre].push({ tiempo: duracion, exito: true });
    console.log(` ${nombre} completado en ${duracion} ms`);
  } catch (error) {
    const duracion = Date.now() - inicio;
    resultados[nombre].push({ tiempo: duracion, exito: false });
    console.error(` Error en ${nombre}:`, error.response?.data || error.message);
  }
}


function calcularMetricas(nombre) {
  const data = resultados[nombre];
  if (data.length === 0) return;

  const exitos = data.filter((d) => d.exito).length;
  const fallos = data.length - exitos;
  const tiempos = data.map((d) => d.tiempo);
  const promedio = Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length);
  const minimo = Math.min(...tiempos);
  const maximo = Math.max(...tiempos);

  console.log(`\n ${nombre}`);
  console.log(`------------------------------`);
  console.log(`Total peticiones: ${data.length}`);
  console.log(`Exitosas: ${exitos}`);
  console.log(`Fallidas: ${fallos}`);
  console.log(`Latencia promedio: ${promedio} ms`);
  console.log(`Latencia mínima: ${minimo} ms`);
  console.log(`Latencia máxima: ${maximo} ms`);
}


async function runTest() {
  console.log("\n Iniciando prueba de rendimiento...\n");

 
  console.log(`Lanzando ${iterations} peticiones GET simultáneas...\n`);
  await Promise.all(
    Array.from({ length: iterations }).map(() =>
      medirTiempo("GET", () => axios.get(`${baseUrl}/getAll`))
    )
  );

  for (let i = 0; i < iterations; i++) {
    console.log(`Iteración ${i + 1}/${iterations}`);

  
    const nuevoProducto = {
      IdProducto: `TEST${i}`,
      Nombre: `Producto Test ${i}`,
      Precio: 10000 + i * 500,
      Stock: 10 + i,
      Descripcion: "Producto generado automáticamente para prueba",
    };

    console.log(" Enviando POST:", nuevoProducto);

    await medirTiempo("POST", () =>
      axios.post(`${baseUrl}/create`, nuevoProducto)
    );

    
    const productoActualizado = {
      Nombre: `Producto Actualizado ${i}`,
      Precio: 25000 + i * 100,
      Stock: 15 + i,
      Descripcion: "Producto actualizado durante prueba",
    };

    await medirTiempo("PUT", () =>
      axios.put(`${baseUrl}/update/${idParaActualizar}`, productoActualizado)
    );

    
    await medirTiempo("DELETE", () =>
      axios.delete(`${baseUrl}/delete/${idParaEliminar}`)
    );
  }

 
  calcularMetricas("GET");
  calcularMetricas("POST");
  calcularMetricas("PUT");
  calcularMetricas("DELETE");

  
  fs.writeFileSync("resultados.json", JSON.stringify(resultados, null, 2));

  console.log("\n Prueba completada con éxito. Resultados guardados en 'resultados.json'\n");
}

runTest();
