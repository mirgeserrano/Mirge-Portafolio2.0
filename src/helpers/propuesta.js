const calcularSubtotalExentoEImponible = (items) => {
  let subtotalExento = 0;
  let subtotalImponible = 0;

  items.forEach(item => {
    const precio = Number(item.precio);
    if (item.esexento === 1) {
      subtotalExento += precio;
    } else {
      subtotalImponible += precio;
    }
  });

  return { subtotalExento, subtotalImponible };
};

const calcularTotal = (items) => {
  return items.reduce((prev, curr) => {
    if (curr.descrp && curr.descrp.trim().length > 0) {
      return prev + Number(curr.precio * Math.floor(curr.unidades));
    } else {
      return prev;
    }
  }, 0);
};

const calcularSubtotalConIVA = (items) => {
  return items.reduce((prev, curr) => {
    if (curr.descrp && curr.descrp.trim().length > 0) {
      const totalConIVA = Number(curr.precio);
      const calIva = (totalConIVA / 1.16) * 0.16;
      return prev + calIva;
    } else {
      return prev;
    }
  }, 0);
};

const calcularTotalMontoIgtf = (datosPago) => {
  let totalMontoIgtf = 0;

  if (datosPago && datosPago.pagos.length > 0) {
    datosPago.pagos.forEach(pago => {
      if (pago.montoPagadoIgtf !== null && pago.montoPagadoIgtf !== undefined && pago.montoPagadoIgtf !== "") {
        totalMontoIgtf += parseFloat(pago.montoPagadoIgtf);
      }
    });
  }

  return totalMontoIgtf;
};

const calcularTotales = (items, discount, datosPago) => {
  const { subtotalExento, subtotalImponible } = calcularSubtotalExentoEImponible(items);
  const total = calcularTotal(items);
  const discountRate = (discount * total) / 100;
  const subtotalConIVA = calcularSubtotalConIVA(items);
  const subTotal = total - subtotalConIVA;
  const totalMontoIgtf = calcularTotalMontoIgtf(datosPago);
  const totalAPagar = total - discountRate + totalMontoIgtf;

  return {
    subtotalExento,
    subtotalImponible,
    total,
    discountRate,
    subtotalConIVA,
    subTotal,
    totalMontoIgtf,
    totalAPagar
  };
};

// Ejemplo de uso:
const items = [/* tu array de items */];
const discount = /* tu descuento */;
const datosPago = { pagos: [/* tu array de pagos */] };

const totales = calcularTotales(items, discount, datosPago);
console.log(totales);
