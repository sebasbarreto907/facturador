// ===== Mini facturador · Semana 1 =====
// 1. Constantes: valores que no cambian
const IVA = 0.15; // IVA vigente en Ecuador: 15 %
const TIPO_CAMBIO_USD_EUR = 0.92; // 1 USD = 0.92 EUR

// 2. Referencias a los elementos del HTML (DOM)
const inputProducto = document.querySelector("#producto");
const inputPrecio = document.querySelector("#precio");
const inputCantidad = document.querySelector("#cantidad");
const inputDescuento = document.querySelector("#descuento");
const btnCalcular = document.querySelector("#btnCalcular");
const btnLimpiar = document.querySelector("#btnLimpiar");
const resultado = document.querySelector("#resultado");

console.log("app.js cargado correctamente ✅");

// 3. Función que procesa la información
function calcularFactura() {
  // Leer los datos: .value SIEMPRE devuelve texto (string)
  const producto = inputProducto.value.trim();
  const precio = Number(inputPrecio.value);     // convertir a número
  const cantidad = Number(inputCantidad.value);
  const descuento = Number(inputDescuento.value);

  console.log("Datos leídos:", producto, precio, cantidad, descuento);
  console.log("Tipo de precio:", typeof precio);

  // Validación mínima (las estructuras de control se profundizan en la semana 2)
  if (
    producto === "" ||
    !Number.isFinite(precio) ||
    !Number.isFinite(cantidad) ||
    !Number.isFinite(descuento) ||
    precio <= 0 ||
    cantidad <= 0 ||
    descuento < 0 ||
    descuento > 100
  ) {
    resultado.innerHTML = `<p class="error">⚠️ Completa todos los campos con valores válidos.</p>`;
    return;
  }

  // Procesar: operaciones aritméticas
  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * (descuento / 100);
  const subtotalConDescuento = subtotal - valorDescuento;
  const valorIva = subtotalConDescuento * IVA;
  const total = subtotalConDescuento + valorIva;
  const totalEuros = total * TIPO_CAMBIO_USD_EUR;

  // Mostrar: modificar el contenido de la página (comportamiento dinámico)
  resultado.innerHTML = `
    <p><strong>${producto}</strong> × ${cantidad}</p>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Descuento (${descuento}%): −$${valorDescuento.toFixed(2)}</p>
    <p>Subtotal con descuento: $${subtotalConDescuento.toFixed(2)}</p>
    <p>IVA (15 %): $${valorIva.toFixed(2)}</p>
    <p class="total">Total: $${total.toFixed(2)} USD</p>
    <p class="total">Total en euros: €${totalEuros.toFixed(2)} EUR</p>
  `;
}

function limpiarFactura() {
  inputProducto.value = "";
  inputPrecio.value = "";
  inputCantidad.value = "1";
  inputDescuento.value = "0";
  resultado.innerHTML = `<p>Ingresa los datos y presiona <strong>Calcular</strong>.</p>`;
}

// 4. Conectar la función con la acción del usuario (evento click)
btnCalcular.addEventListener("click", calcularFactura);
btnLimpiar.addEventListener("click", limpiarFactura);