// Array de bancos con sus tasas de interés (usamos objetos para definir cada banco)
let bancosChe = [
  { nombre: "Banco Nación Argentina", id: "nacion", tasa: 28 },
  { nombre: "Banco Provincia", id: "provincia", tasa: 29 },
  { nombre: "BBVA", id: "bbva", tasa: 28 },
  { nombre: "Banco Macro", id: "macro", tasa: 31 },
  { nombre: "Banco Hipotecario", id: "hipotecario", tasa: 29 },
  { nombre: "Brubank", id: "brubank", tasa: 35 },
  { nombre: "Banco Galicia", id: "galicia", tasa: 28 },
  { nombre: "Banco Patagonia", id: "patagonia", tasa: 28 },
  { nombre: "ICBC", id: "icbc", tasa: 30 },
  { nombre: "Banco Ciudad", id: "ciudad", tasa: 29 },
  { nombre: "Banco Comafi", id: "comafi", tasa: 29 }
];

// Función para buscar un banco por su ID
function buscarBanco(idBanco) {
  return bancosChe.find(banco => banco.id === idBanco) ?? null; // Nullish coalescing para evitar valores undefined
}

// Función para calcular el interés
function calcularInteres(guita, tasa, dias) {
  return (guita * tasa * dias) / (365 * 100); // Fórmula de interés
}

// Función principal para calcular el plazo fijo
function calcularPlazoFijo() {
  let guita = parseFloat(document.getElementById("amount").value) || 0; // Nullish coalescing para valores inválidos
  let bancoElegido = document.getElementById("bank").value;
  let diasInvertidos = parseInt(document.getElementById("days").value) || 0;

  // Validacion
  if (guita <= 0 || diasInvertidos < 30 || diasInvertidos > 370 || !bancoElegido) {
      alert("¡Che! Completá todos los datos correctamente. Recordá que el plazo debe ser entre 30 y 370 días.");
      return;
  }

  let banco = buscarBanco(bancoElegido);

  if (!banco) {
      alert("El banco seleccionado no es válido.");
      return;
  }

  let interesGanado = calcularInteres(guita, banco.tasa, diasInvertidos);
  let guitaTotal = guita + interesGanado;

  // Mostrar resultados
  document.getElementById("interest").textContent = `$${interesGanado.toFixed(2)}`;
  document.getElementById("totalAmount").textContent = `$${guitaTotal.toFixed(2)}`;
}

// Función para rellenar el menú desplegable de bancos dinámicamente
function cargarBancos() {
  let selectBanco = document.getElementById("bank");

  // Limpiar las opciones existentes antes de agregar nuevas
  selectBanco.innerHTML = '<option value="" disabled selected>Selecciona un banco</option>';

  bancosChe.forEach(banco => {
      let opcion = document.createElement("option");
      opcion.value = banco.id;
      opcion.textContent = banco.nombre;
      selectBanco.appendChild(opcion);
  });
}

// Ciclo para cargar bancos en el desplegable al inicio
cargarBancos();


// Evento para calcular el plazo fijo
document.getElementById("calculateButton").addEventListener("click", calcularPlazoFijo);

