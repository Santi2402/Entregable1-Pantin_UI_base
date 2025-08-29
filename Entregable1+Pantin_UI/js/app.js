// UI + Consola
const categoriasDisponibles = ["Económico", "SUV", "Eléctrico"];
const catalogo = [
  { id: 1, marca: "Toyota", modelo: "Yaris", categoria: "Económico", precioDia: 45, disponible: true },
  { id: 2, marca: "Chevrolet", modelo: "Onix", categoria: "Económico", precioDia: 42, disponible: true },
  { id: 3, marca: "Volkswagen", modelo: "T-Cross", categoria: "SUV", precioDia: 75, disponible: true },
  { id: 4, marca: "Nissan", modelo: "Kicks", categoria: "SUV", precioDia: 78, disponible: true },
  { id: 5, marca: "BYD", modelo: "Seagull", categoria: "Eléctrico", precioDia: 55, disponible: true },
  { id: 6, marca: "Renault", modelo: "Kwid E-Tech", categoria: "Eléctrico", precioDia: 59, disponible: true },
];

function cargarReservas(){ try { return JSON.parse(localStorage.getItem("reservas-ui")) || []; } catch { return []; } }
function guardarReservas(r){ try { localStorage.setItem("reservas-ui", JSON.stringify(r)); } catch(e){ console.warn(e); } }
let reservas = cargarReservas();

const el = s => document.querySelector(s);
const grid = el("#catalogoGrid");
const filtroCategoria = el("#filtroCategoria");
const btnOrdenPrecio = el("#btnOrdenPrecio");
const btnReset = el("#btnReset");
const inputAutoId = el("#inputAutoId");
const inputDias = el("#inputDias");
const btnSimular = el("#btnSimular");
const btnReservar = el("#btnReservar");
const resSimulacion = el("#simulacionResultado");
const reservasCont = el("#reservasLista");
const totalAcumEl = el("#totalAcumulado");
const btnLimpiar = el("#btnLimpiar");
const btnConsola = el("#btnConsola");

function renderCatalogo(lista = catalogo){
  grid.innerHTML = "";
  lista.forEach(a => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `<span class="badge">#${a.id} · ${a.categoria}</span>
      <h3>${a.marca} ${a.modelo}</h3>
      <div class="price">USD ${a.precioDia}/día</div>
      <button data-id="${a.id}" ${a.disponible ? "" : "disabled"}>${a.disponible ? "Elegir" : "Reservado"}</button>`;
    card.querySelector("button").addEventListener("click", () => {
      inputAutoId.value = a.id;
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
    grid.appendChild(card);
  });
  console.log("Catálogo mostrado:", lista);
}

function aplicarFiltroYCriterio(){
  const cat = filtroCategoria.value;
  let lista = catalogo.slice();
  if (cat !== "Todas") lista = lista.filter(a => a.categoria === cat);
  return lista;
}

let ordenAsc = true;
btnOrdenPrecio?.addEventListener("click", () => {
  let lista = aplicarFiltroYCriterio().sort((a,b) => ordenAsc ? a.precioDia - b.precioDia : b.precioDia - a.precioDia);
  ordenAsc = !ordenAsc;
  renderCatalogo(lista);
});
filtroCategoria?.addEventListener("change", () => renderCatalogo(aplicarFiltroYCriterio()));
btnReset?.addEventListener("click", () => { filtroCategoria.value = "Todas"; ordenAsc = true; renderCatalogo(); });

function calcularCosto(precioDia, dias){
  let subtotal = precioDia * dias;
  let d = 0; if (dias >= 7) d = 0.10; else if (dias >= 3) d = 0.05;
  const monto = subtotal * d;
  return { subtotal, descuentoPct: d*100, montoDescuento: monto, total: subtotal - monto };
}

let simulacion = null;
btnSimular?.addEventListener("click", () => {
  const id = Number(inputAutoId.value);
  const dias = Number(inputDias.value);
  if (!id || !dias || dias <= 0){ resSimulacion.textContent = "Completá ID y Días (mayor a 0)."; return; }
  const auto = catalogo.find(a => a.id === id);
  if (!auto){ resSimulacion.textContent = "ID de auto inexistente."; return; }
  const det = calcularCosto(auto.precioDia, dias);
  simulacion = { id, dias, auto, det };
  resSimulacion.innerHTML = `<div><strong>${auto.marca} ${auto.modelo}</strong> por <strong>${dias}</strong> día(s)</div>
    <div>Subtotal: USD ${det.subtotal.toFixed(2)}</div>
    <div>Descuento: ${det.descuentoPct}% (− USD ${det.montoDescuento.toFixed(2)})</div>
    <div><strong>Total: USD ${det.total.toFixed(2)}</strong></div>`;
  console.table([det]);
});

btnReservar?.addEventListener("click", () => {
  if (!simulacion){ alert("Primero simulá el costo."); return; }
  const { id, dias, auto, det } = simulacion;
  if (!auto.disponible){ alert("Ese auto ya fue reservado."); return; }
  const reg = { fecha: new Date().toISOString(), autoId: id, descripcion: `${auto.marca} ${auto.modelo}`, dias, total: det.total };
  reservas.push(reg);
  auto.disponible = false;
  guardarReservas(reservas);
  renderCatalogo(aplicarFiltroYCriterio());
  renderReservas();
  alert(`Reserva creada ✔️\n${reg.descripcion} — ${reg.dias} días\nTotal: USD ${reg.total.toFixed(2)}`);
  console.log("Reserva agregada:", reg);
});

function renderReservas(){
  reservasCont.innerHTML = "";
  if (reservas.length === 0){
    reservasCont.innerHTML = `<p class="hint">Aún no hay reservas.</p>`;
  } else {
    reservas.forEach(r => {
      const row = document.createElement("div");
      row.className = "reserva";
      row.innerHTML = `<div><div>${r.descripcion}</div><small>${new Date(r.fecha).toLocaleString()} · ${r.dias} día(s)</small></div>
        <strong>USD ${r.total.toFixed(2)}</strong>`;
      reservasCont.appendChild(row);
    });
  }
  const total = reservas.reduce((acc,r)=>acc+r.total,0);
  totalAcumEl.textContent = `USD ${total.toFixed(2)}`;
}

btnLimpiar?.addEventListener("click", () => {
  const ok = confirm("¿Seguro que deseas borrar TODAS las reservas?");
  if (!ok) return;
  reservas = [];
  catalogo.forEach(a => a.disponible = true);
  localStorage.removeItem("reservas-ui");
  renderCatalogo(aplicarFiltroYCriterio());
  renderReservas();
  alert("Reservas eliminadas y catálogo restablecido.");
});

function mostrarMenu(){
  return prompt(`Elige una opción:
1) Ver catálogo
2) Buscar por categoría
3) Calcular costo de reserva
4) Reservar un auto
5) Ver mis reservas
6) Borrar todas las reservas
0) Salir`);
}
function mainConsola(){
  alert("Modo Consola: seguí los prompts y mirá la consola.");
  let opcion;
  do{
    opcion = mostrarMenu();
    if (opcion === null){ console.log("Menú cancelado."); break; }
    switch (opcion.trim()){
      case "1": console.table(catalogo); break;
      case "2": {
        const cat = prompt(`Categoría (${categoriasDisponibles.join(", ")}):`);
        if (cat === null) continue;
        console.table(catalogo.filter(a => a.categoria === cat.trim()));
        break;
      }
      case "3": {
        const id = Number(prompt("ID:"));
        const dias = Number(prompt("Días:"));
        const auto = catalogo.find(a => a.id === id);
        if (!auto || !dias){ console.log("Valores inválidos."); continue; }
        console.table([calcularCosto(auto.precioDia, dias)]);
        break;
      }
      case "4": {
        const id = Number(prompt("ID:"));
        const dias = Number(prompt("Días:"));
        const auto = catalogo.find(a => a.id === id);
        if (!auto || !dias){ console.log("Valores inválidos."); continue; }
        const det = calcularCosto(auto.precioDia, dias);
        const reg = { fecha: new Date().toISOString(), autoId: id, descripcion: `${auto.marca} ${auto.modelo}`, dias, total: det.total };
        reservas.push(reg); auto.disponible = false; guardarReservas(reservas);
        alert(`Reserva creada ✔️\n${reg.descripcion} — ${reg.dias} días\nTotal: USD ${reg.total.toFixed(2)}`);
        break;
      }
      case "5": console.table(reservas); console.log("Total:", reservas.reduce((a,r)=>a+r.total,0).toFixed(2)); break;
      case "6":
        if (confirm("¿Borrar todas las reservas?")){ reservas = []; catalogo.forEach(a=>a.disponible=true); localStorage.removeItem("reservas-ui"); alert("Reservas eliminadas."); }
        break;
      case "0": break;
      default: console.log("Opción no válida."); continue;
    }
    const seguir = confirm("¿Otra acción?"); if (!seguir) break;
  } while(true);
  alert("Fin del Modo Consola.");
}
btnConsola?.addEventListener("click", mainConsola);

window.addEventListener("DOMContentLoaded", () => { renderCatalogo(); renderReservas(); console.log("Simulador UI iniciado."); });
