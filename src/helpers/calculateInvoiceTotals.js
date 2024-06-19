
function calculateInvoiceTotals(items, discount, datosPago, dolarApi) {
    let subtotalExento = 0;
    let subtotalImponible = 0;
  
    // Calcular subtotalExento y subtotalImponible
    items.forEach(item => {
      const precio = Number(item.precio);
      if (item.esexento === 1) {
        subtotalExento += precio;
      } else {
        subtotalImponible += precio;
      }
    });
  
    // Calcular total
    const total = items.reduce((prev, curr) => {
      if (curr.descrp && curr.descrp.trim().length > 0) {
        return prev + Number(curr.precio * Math.floor(curr.unidades));
      } else {
        return prev;
      }
    }, 0);
  
  
    //!! el descuento se lo estoy aplicando al total con iva

    // Calcular subtotalConIVA
    const subtotalConIVA = items.reduce((prev, curr) => {
      if (curr.descrp && curr.descrp.trim().length > 0) {
        const totalConIVA = Number(curr.precio);
        const calIva = (totalConIVA / 1.16) * 0.16;
        return prev + calIva;
      } else {
        return prev;
      }
    }, 0);
  
    const subTotal = total - subtotalConIVA;
    const discountRate = (discount * subTotal) / 100;
  
    let totalMontoIgtf = 0;
    let baseIgtf = 0;
  
    if (datosPago?.pagos?.length > 0) {
      datosPago.pagos.forEach(pago => {
        if (pago.montoIgtf) {
          totalMontoIgtf += parseFloat(pago.montoIgtf);
        }
        if (pago.montoIgtfBs) {
          baseIgtf += parseFloat(pago.montoIgtfBs);
        }
      });
    }
  
    const totalMontoIgtfbs = totalMontoIgtf * dolarApi;
    const totalAPagar = total - discountRate + totalMontoIgtfbs;
  
    // Procedimiento para factura en dolares
    const refBaseIm = subtotalImponible / dolarApi;
    const refBaseExento = subtotalExento / dolarApi;
    const refDescueto = discountRate / dolarApi;
    const refSubtotal = subTotal / dolarApi;
    const refIva = subtotalConIVA / dolarApi;
    const refTotal = total / dolarApi;
    const refBaseIgtf = baseIgtf / dolarApi;
    const refTotalAPagar = totalAPagar / dolarApi;
  
    return {
      subtotalExento,
      subtotalImponible,
      total,
      subtotalConIVA,
      subTotal,
      discountRate,
      totalMontoIgtf,
      baseIgtf,
      totalMontoIgtfbs,
      totalAPagar,
      refBaseIm,
      refBaseExento,
      refDescueto,
      refSubtotal,
      refIva,
      refTotal,
      refBaseIgtf,
      refTotalAPagar
    };
  }
export default calculateInvoiceTotals