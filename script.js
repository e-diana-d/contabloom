/**
 * ============================================================================
 * CONTABLOOM - SISTEMA DE ASIENTOS CONTABLES
 * 
 * Descripción: Aplicación educativa para aprender asientos contables paso a paso
 * basados en el Plan Contable General Empresarial (PCGE) 2019 de Perú.
 * s
 * ============================================================================
 */

// ============================================================================
// BASE DE DATOS DE CASOS CONTABLES
// ============================================================================

const casosContables = {
  compra_mercaderia_contado: {
    titulo: "Compra de mercadería al contado",
    enunciado: "La empresa Comercial Nova S.R.L., con RUC 20765892140, realiza el 03/05/2026 la compra de mercadería por S/ 1,500 más IGV al contado según factura E001-178.",
    asientos: [
      {
        numero: 1,
        glosa: "03/05 Por la compra de mercadería",
        lineas: [
          { cuenta: "6011", nombre: "Mercaderías", debe: 1500, haber: 0 },
          { cuenta: "40111", nombre: "IGV – Cuenta propia", debe: 270, haber: 0 },
          { cuenta: "4212", nombre: "Emitidas", debe: 0, haber: 1770 }
        ],
        explicacion: "Registramos la compra de mercadería debitando la cuenta 6011 (Mercaderías) por el valor sin IGV, ya que ese impuesto no forma parte del costo. El IGV pagado se registra en la cuenta 40111 como un crédito fiscal que podremos descontar del IGV que cobramos en nuestras ventas. La contrapartida va a la cuenta 4212 (Facturas por pagar), generando la obligación de pago con el proveedor."
      },
      {
        numero: 2,
        glosa: "03/05 Por el ingreso de la mercadería al almacén",
        lineas: [
          { cuenta: "20111", nombre: "Costo", debe: 1500, haber: 0 },
          { cuenta: "6111", nombre: "Mercaderías", debe: 0, haber: 1500 }
        ],
        explicacion: "Este asiento refleja el ingreso físico de la mercadería al almacén. Debitamos la cuenta 20111 (Inventario – Costo) y abonamos la cuenta 6111, que actúa como cuenta de destino para el costo de compras. Esta transferencia es parte del sistema de cuentas de destino del PCGE, donde primero se registra el gasto y luego se traslada al activo."
      },
      {
        numero: 3,
        glosa: "03/05 Por la cancelación de la compra de mercadería",
        lineas: [
          { cuenta: "4212", nombre: "Emitidas", debe: 1770, haber: 0 },
          { cuenta: "101", nombre: "Caja", debe: 0, haber: 1770 }
        ],
        explicacion: "Cancelamos la deuda con el proveedor. Debitamos la cuenta 4212 para eliminar el pasivo y abonamos la cuenta 101 (Caja) porque el pago se hace en efectivo. Después de este asiento, la empresa ya no le debe nada al proveedor por esta operación."
      }
    ]
  },

  compra_mercaderia_credito: {
    titulo: "Compra de mercadería al crédito",
    enunciado: "La empresa Nova S.A.C., con RUC 20345612903, realiza el 10/05/2026 la compra de mercadería por S/ 6,500 más IGV a crédito por 10 días según factura E001-1856.",
    asientos: [
      {
        numero: 1,
        glosa: "10/05 Por la compra de mercadería al crédito",
        lineas: [
          { cuenta: "6011", nombre: "Mercaderías", debe: 6500, haber: 0 },
          { cuenta: "40111", nombre: "IGV – Cuenta propia", debe: 1170, haber: 0 },
          { cuenta: "4212", nombre: "Emitidas", debe: 0, haber: 7670 }
        ],
        explicacion: "La lógica es igual que en una compra al contado: debitamos 6011 por el costo y 40111 por el IGV. La diferencia es que el pago no ocurre hoy, por eso la obligación permanece en la cuenta 4212 (Facturas por pagar). El proveedor nos cobrará en 10 días."
      },
      {
        numero: 2,
        glosa: "10/05 Por el ingreso de la mercadería al almacén",
        lineas: [
          { cuenta: "20111", nombre: "Costo", debe: 6500, haber: 0 },
          { cuenta: "6111", nombre: "Mercaderías", debe: 0, haber: 6500 }
        ],
        explicacion: "Trasladamos la mercadería al almacén debitando 20111 y abonando 6111. Este asiento siempre acompaña a la compra de mercadería, independientemente de si fue al contado o al crédito."
      }
    ]
  },

  compra_activo_fijo: {
    titulo: "Compra de activo fijo (computadora)",
    enunciado: "La empresa Aura S.A.C., con RUC 20674258677, realiza el 12/05/2026 la compra de una computadora por S/ 3,000 más IGV al contado según factura E001-185.",
    asientos: [
      {
        numero: 1,
        glosa: "12/05 Por la compra de una computadora",
        lineas: [
          { cuenta: "33611", nombre: "Costo", debe: 3000, haber: 0 },
          { cuenta: "40111", nombre: "IGV – Cuenta propia", debe: 540, haber: 0 },
          { cuenta: "4654", nombre: "Propiedad, planta y equipo", debe: 0, haber: 3540 }
        ],
        explicacion: "Una computadora es un activo fijo porque tiene vida útil mayor a un año y no se compra para revender. Por eso no usamos la cuenta 60, sino la cuenta 33 (Propiedad, planta y equipo). El IGV se recupera igual que en una compra de mercadería. La deuda que se genera se puede registar en la cuenta 46."
      },
      {
        numero: 2,
        glosa: "12/05 Por la cancelación de la compra del activo fijo",
        lineas: [
          { cuenta: "4212", nombre: "Emitidas", debe: 3540, haber: 0 },
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 0, haber: 3540 }
        ],
        explicacion: "Cancelamos la deuda usando la cuenta bancaria (1041). Según las normas tributarias peruanas, los pagos superiores a S/ 2,000 deben realizarse mediante el sistema financiero (bancarización), por eso no se usa caja sino una cuenta corriente."
      }
    ]
  },

  venta_mercaderia_contado: {
    titulo: "Venta de mercadería al contado",
    enunciado: "La empresa Soluciones Integrales S.A.C., con RUC 20327683531, realiza el 08/05/2026 la venta de mercadería por S/ 1,200 más IGV al contado según factura F001-200.",
    asientos: [
      {
        numero: 1,
        glosa: "08/05 Por la venta de mercadería al contado",
        lineas: [
          { cuenta: "1212", nombre: "Emitidas en cartera", debe: 1416, haber: 0 },
          { cuenta: "40111", nombre: "IGV – Cuenta propia", debe: 0, haber: 216 },
          { cuenta: "70121", nombre: "Terceros", debe: 0, haber: 1200 }
        ],
        explicacion: "Al vender, generamos un derecho de cobro (cuenta 1212) por el total con IGV. El ingreso por ventas se registra en la cuenta 70121 por el valor sin IGV, que es lo que realmente gana la empresa. El IGV cobrado al cliente va a la cuenta 40111 como deuda con la SUNAT, porque ese dinero no nos pertenece."
      },
      {
        numero: 2,
        glosa: "08/05 Por el costo de la mercadería vendida",
        lineas: [
          { cuenta: "69121", nombre: "Terceros", debe: 960, haber: 0 },
          { cuenta: "20111", nombre: "Costo", debe: 0, haber: 960 }
        ],
        explicacion: "Toda venta tiene dos caras: el ingreso y el costo. Aquí registramos el costo de la mercadería que salió del almacén. Debitamos la cuenta 69 (Costo de ventas) y abonamos la cuenta 20 (Mercaderías), reduciendo el stock."
      },
      {
        numero: 3,
        glosa: "08/05 Por el cobro de la mercadería vendida",
        lineas: [
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 960, haber: 0 },
          { cuenta: "1212", nombre: "Emitidas en cartera", debe: 0, haber: 960 }
        ],
        explicacion: "Hacemos efectivo el cobro. Debitamos la cuenta bancaria 1041 porque el cliente pagó por transferencia, y abonamos la cuenta 1212 para cerrar el derecho de cobro. Si el pago hubiera sido en efectivo, usaríamos la cuenta 101 (Caja)."
      }
    ]
  },

  venta_mercaderia_credito: {
    titulo: "Venta de mercadería al crédito",
    enunciado: "La empresa San José S.R.L., con RUC 20342329091, realiza el 14/05/2026 la venta de mercadería por S/ 4,130 más IGV a crédito por 10 días según factura E001-129. El costo de la mercadería es de S/ 2,450.",
    asientos: [
      {
        numero: 1,
        glosa: "14/05 Por la venta de mercadería al crédito",
        lineas: [
          { cuenta: "1212", nombre: "Emitidas en cartera", debe: 4130, haber: 0 },
          { cuenta: "40111", nombre: "IGV – Cuenta propia", debe: 0, haber: 630 },
          { cuenta: "70121", nombre: "Terceros", debe: 0, haber: 3500 }
        ],
        explicacion: "El cliente no paga hoy, por eso el derecho de cobro queda pendiente en la cuenta 1212 (Cuentas por cobrar). El ingreso y el IGV se registran igual que en una venta al contado. La empresa ya reconoció el ingreso aunque el dinero todavía no haya ingresado."
      },
      {
        numero: 2,
        glosa: "Por el costo de la mercadería vendida",
        lineas: [
          { cuenta: "69121", nombre: "Terceros", debe: 1000, haber: 0 },
          { cuenta: "20111", nombre: "Costo", debe: 0, haber: 1000 }
        ],
        explicacion: "Registramos el costo de la mercadería que salió del almacén. Este asiento siempre va junto con el de la venta, sin importar si fue al contado o al crédito."
      }
    ]
  },

  pago_servicios_basicos: {
    titulo: "Pago de servicios básicos",
    enunciado: "La empresa Danoba S.A.C., con RUC 20908945238, realiza el 30/04/2026 el pago de servicios básicos de agua por S/ 300, luz por S/ 600 y teléfono por S/ 100. Los gastos de distribuyen 50% para ventas y 50% para administración.",
    asientos: [
      {
        numero: 1,
        glosa: "30/04 Por los servivios básicos prestados",
        lineas: [
          { cuenta: "6361", nombre: "Energía eléctrica", debe: 600, haber: 0 },
          { cuenta: "6363", nombre: "Agua", debe: 300, haber: 0 },
          { cuenta: "6364", nombre: "Teléfono", debe: 100, haber: 0 },
          { cuenta: "40111", nombre: "IGV – Cuenta propia", debe: 180, haber:0  },
          { cuenta: "4212", nombre: "Emitidas", debe: 0, haber: 1180 }
        ],
        explicacion: "Los servicios básicos son gastos del período: luz, agua y teléfono se reconocen cuando se consumen. Cada servicio tiene su propio código (6361, 6363, 6364). El IGV de los recibos de empresas de servicios también genera crédito fiscal en la cuenta 40111."
      },
      {
        numero: 2,
        glosa: "30/04 Por el destino del gasto",
        lineas: [
          { cuenta: "94", nombre: "GASTOS ADMINISTRATIVOS", debe: 500, haber: 0 },
          { cuenta: "95", nombre: "GASTOS DE VENTAS", debe: 500, haber: 0 },
          { cuenta: "791", nombre: "Cargas imputables a cuentas de costos y gastos", debe: 0, haber: 1000 }
        ],
        explicacion: "El PCGE exige que los gastos por naturaleza (cuentas del elemento 6) se trasladen a cuentas de destino según su función. El 50% va a gastos administrativos (cuenta 94) y el 50% a gastos de ventas (cuenta 95). La cuenta 791 es la contrapartida que cierra este traslado."
      },
      {
        numero: 3,
        glosa: "30/04 Por el pago de servicios básicos",
        lineas: [
          { cuenta: "4212", nombre: "Emitidas", debe: 1180, haber: 0 },
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 0, haber: 1180}
        ],
        explicacion: "Cancelamos las facturas de servicios mediante transferencia bancaria."
      }
    ]
  },

  pago_alquiler_oficina: {
    titulo: "Pago de alquiler de oficina",
    enunciado: "La empresa InnovaCore E.I.R.L., con RUC 20765892140, realiza el 01/05/2026 el pago del alquiler mensual de la oficina por S/ 650.",
    asientos: [
      {
        numero: 1,
        glosa: "01/05 Por el servicio de alquiler de oficina a una persona natural. El gasto de destina en tu totalidad  para administración.",
        lineas: [
          { cuenta: "6352", nombre: "Edificaciones", debe: 650, haber: 0 },
          { cuenta: "4212", nombre: "Emitidas", debe: 0, haber: 650 }
        ],
        explicacion: "El alquiler pagado a una persona natural no incluye IGV, porque las personas naturales no son agentes de IGV en este caso. "
      },
      {
        numero: 2,
        glosa: "01/05 Por el destino del gasto.",
        lineas: [
          { cuenta: "94", nombre: "GASTOS DE ADMINISTRACIÓN", debe: 650, haber: 0 },
          { cuenta: "791", nombre: "Cargas imputables a cuentas de costos y gastos", debe: 0, haber: 650 }
        ],
        explicacion: "El gasto de alquiler se destina en su totalidad a administración (cuenta 94), ya que la oficina es usada para funciones administrativas. La cuenta 79 se usa como contrapartida."
      },
      {
        numero: 3,
        glosa: "01/05 Por el pago del servicio de alquiler de oficina",
        lineas: [
          { cuenta: "4212", nombre: "Edificaciones", debe: 650, haber: 0 },
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 0, haber: 650 }
        ],
        explicacion: "Cancelamos el alquiler mediante transferencia bancaria."
      }
    ]
  },

  cobro_factura_credito: {
    titulo: "Cobro de factura al crédito",
    enunciado: "La empresa Tekiora S.A.C., con RUC 20765832240, realiza el 15/05/2026 el cobro de una factura que había sido vendida al crédito por S/ 2,770.",
    asientos: [
      {
        numero: 1,
        glosa: "Por el cobro de factura al crédito",
        lineas: [
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 2770, haber: 0 },
          { cuenta: "1212", nombre: "Emitidas en cartera", debe: 0, haber: 2770 }
        ],
        explicacion: `
        <p>El cliente nos paga la factura que estaba pendiente. 
        Debitamos la cuenta bancaria 1041 porque el cobro fue por transferencia, y 
        abonamos la cuenta 1212 para cerrar el derecho de cobro.</p>
        <p>Como el monto supera los S/ 2,000, el pago debe realizarse obligatoriamente 
        a través del sistema financiero (bancarización) según la Ley N° 28194, 
        modificada por el Decreto Legislativo N° 1529. De no cumplirse, la empresa pierde el derecho a usar ese gasto 
        como deducible y no puede aplicar el crédito fiscal del IGV.</p>
        <p>Puede revisar la norma <a href='https://busquedas.elperuano.pe/dispositivo/NL/2044433-2' target='_blank'>aquí</a>.</p>`
      }
    ]
  },

  pago_factura_credito: {
    titulo: "Pago de factura al crédito",
    enunciado: "La empresa Logística Imperial S.A.C., con RUC 20985645382, realiza el 20/05/2026 el pago de una factura que había sido comprada al crédito por S/ 2,360.",
    asientos: [
      {
        numero: 1,
        glosa: "20/05 Por el pago de factura al crédito",
        lineas: [
          { cuenta: "4212", nombre: "Emitidas", debe: 2360, haber: 0 },
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 0, haber: 2360 }
        ],
        explicacion: "Pagamos la factura que teníamos pendiente con el proveedor. Debitamos la cuenta 4212 para eliminar el pasivo y abonamos la cuenta bancaria 1041. La deuda queda completamente saldada."
      }
    ]
  },

  depreciacion_activo_fijo: {
    titulo: "Depreciación de activo fijo",
    enunciado: "La empresa Lush Beauty S.A.C., con RUC N.° 20127546359, realiza el 30/04/2026 el cálculo y registro contable de la depreciación mensual de una unidad de transporte utilizada para el reparto de mercadería, adquirida por S/ 30,000. El activo presenta una depreciación acumulada de S/ 1,500 y una vida útil estimada de 5 años.",
    asientos: [
      {
        numero: 1,
        glosa: "30/04 Por la depreciación mensual de una unidad de transporte.",
        lineas: [
          { cuenta: "68413", nombre: "Unidades de transporte", debe: 500, haber: 0 },
          { cuenta: "39525", nombre: "Unidades de transporte", debe: 0, haber: 500 }
        ],
        explicacion:`
        <p>Los activos fijos pierden valor con el uso y el tiempo. 
        Esa pérdida mensual se llama depreciación.</p>
        <p>Se debita la cuenta 68 como gasto y se acredita la cuenta 39, una cuenta regularizadora de activo que tiene saldo acreedor: no elimina el bien, sino que reduce su valor contable. 
        El cálculo: S/ 30,000 ÷ 5 años ÷ 12 meses = S/ 500 por mes.</p>
        <p>La vida útil no la decide libremente la empresa: el artículo 22°, inciso b) del Reglamento de la Ley del Impuesto a la Renta establece las tasas máximas de depreciación según el tipo de activo.</p>
        <p>Para vehículos de transporte, la tasa máxima es del 20% anual, lo que equivale a una vida útil de 5 años. 
        Puedes consultar la tabla completa <a href='https://www.sunat.gob.pe/legislacion/renta/regla/cap6.pdf' target='_blank'>aquí</a>.</p>`
      },
      {
        numero: 2,
        glosa: "30/04 Por el destino del gasto.",
        lineas: [
          { cuenta: "95", nombre: "GASTOS DE VENTAS", debe: 500, haber: 0 },
          { cuenta: "791", nombre: "Cargas imputables a cuentas de costos y gastos", debe: 0, haber: 500 }
        ],
        explicacion: "La depreciación se destina a gastos de ventas (cuenta 95) porque la unidad de transporte se usa para repartir mercadería, es decir, cumple una función comercial."
      }
    ]
  },

  planilla_sueldos: {
    titulo: "Planilla de sueldos",
    enunciado: `La empresa Diamante E.I.R.L., identificada con RUC N.° 20452784565, registra el 30/04/2026 la planilla mensual de remuneraciones: 
    <ul>
      <p>Gerente: sueldo bruto de S/ 3,000, afiliado a ESSALUD (9%) y a AFP Integra. Comisión sobre flujo: 1.55%, prima de seguro: 1.37% y aporte obligatorio: 10%.<p>
      <p>Vendedora: sueldo bruto de S/ 2,300, afiliada a ESSALUD (9%) y a la ONP (13%). Tiene un hijo menor de edad.</p>`,
    asientos: [
      {
        numero: 1,
        glosa: "30/04 Por la planilla de sueldos del mes",
        lineas: [
          { cuenta: "6211", nombre: "Sueldos y salarios", debe: 5300, haber: 0 },
          { cuenta: "622", nombre: "Otras remuneraciones", debe: 113, haber: 0 },
          { cuenta: "6271", nombre: "Régimen de prestaciones de salud", debe: 487.17, haber: 0 },
          { cuenta: "4031", nombre: "ESSALUD", debe: 0, haber: 487.17 },
          { cuenta: "4032", nombre: "ONP", debe: 0, haber: 313.69 },
          { cuenta: "4111", nombre: "Sueldos y salarios por pagar", debe: 0, haber: 4711.71},
          { cuenta: "417", nombre: "Administradoras de fondos de pensiones", debe: 0, haber: 387.60 }
        ],
        explicacion: `
        <p>La cuenta 6211 recoge los sueldos brutos de ambos trabajadores, y la cuenta 622 registra la asignación familiar de la vendedora, un beneficio legal que corresponde a trabajadores con hijos menores de edad (S/ 113 equivale al 10% de la RMV, que actualmente es S/ 1,130).</p>
        <p>El aporte a ESSALUD (9% del sueldo bruto) es un costo adicional que asume la empresa, por eso se debita la cuenta 6271 como gasto. Su contrapartida es la cuenta 4031, un pasivo que se pagará a la SUNAT, quien luego lo traslada a ESSALUD.</p>
        <p>Los descuentos por ONP y AFP son distintos: no son gasto de la empresa, sino retenciones que se hacen del sueldo bruto del trabajador. La empresa solo actúa como intermediaria. La ONP se registra como pasivo en la cuenta 4032 y se declara y paga a la SUNAT. Los aportes a la AFP se registran en la cuenta 417 y se pagan a través de AFPnet, una plataforma administrada por las propias AFP que transfiere el dinero directamente a la cuenta individual de cada trabajador.</p> 
        <p>Las tasas de comisión, prima de seguro y aporte obligatorio de cada AFP son publicadas por la SBS y puedes consultarlas <a href='https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/paginas/comision_prima.aspx' target='_blank'>aquí</a>.</p>
        <p>Finalmente, la cuenta 4111 refleja lo que realmente se le pagará a cada trabajador: el sueldo bruto menos sus descuentos.</p>
        <img src="tabla-planilla.png" alt="Tabla de planilla de sueldos" style="width:100%; margin-top:12px; border-radius:8px;">`
      },
      {
        numero: 2,
        glosa: "30/04 Por el destino del gasto",
        lineas: [
          { cuenta: "94", nombre: "GASTOS DE ADMINISTRACIÓN", debe: 3270, haber: 0 },
          { cuenta: "95", nombre: "GASTOS DE VENTAS", debe: 2630, haber: 0 },
          { cuenta: "791", nombre: "Cargas imputables a cuentas de costos y gastos", debe: 0, haber: 5900 }
        ],
        explicacion: "Los gastos de planilla se distribuyen según la función de cada trabajador: el sueldo y el aporte a ESSALUD del gerente van a administración (cuenta 94), mientras que el sueldo, la asignación familiar y el aporte a ESSALUD de la vendedora van a ventas (cuenta 95). La cuenta 791 cierra el traslado de las cuentas de naturaleza (clase 6) a las cuentas de destino."
      },
      {
        numero: 3,
        glosa: "30/04 Por la cancelación de la planilla de sueldos",
        lineas: [
          { cuenta: "4111", nombre: "Sueldos y salarios por pagar", debe: 4712, haber: 0 },
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 0, haber: 4712 }
        ],
        explicacion: "Pagamos los sueldos netos a los trabajadores mediante transferencia bancaria. Debitamos la cuenta 4111 para eliminar esa obligación y abonamos la cuenta bancaria 1041. Los demás pasivos generados en la planilla (ESSALUD, ONP y AFP) se cancelan en el mes siguiente: ESSALUD y ONP según el cronograma de vencimientos de la SUNAT, y los aportes a la AFP a través de AFPnet."
      }
    ]
  },
    retiro_banco_para_caja: {
    titulo: "Retiro de banco para caja",
    enunciado: `La empresa Aurora S.A.C., identificada con RUC N.° 20348451253, 
    el 18/05 realiza el retiro de S/ 7,000 de su cuenta corriente del Banco de 
    Crédito del Perú (BCP) para incrementar los fondos disponibles en caja.`,
    asientos: [
      {
        numero: 1,
        glosa: "30/04 Por la planilla de sueldos del mes",
        lineas: [
          { cuenta: "101", nombre: "Caja", debe: 7000, haber: 0 },
          { cuenta: "1041", nombre: "Cuentas corrientes operativas", debe: 0, haber: 7000 }
        ],
        explicacion: `La cuenta 101 se carga al incrementarse el efectivo disponible 
        en caja, mientras que la cuenta 1041 se abona representando la disminución del 
        dinero depositado en la cuenta corriente del banco.`
      }
    ]
  }
};

// ============================================================================
// DICCIONARIO DE CUENTAS CONTABLES (PCGE 2019)
// ============================================================================

const cuentasContables = {
  "101": { nombre: "Caja", tipo: "Activo" },
  "104": { nombre: "Cuentas corrientes operativas", tipo: "Activo" },
  "1212": { nombre: "Emitidas en cartera", tipo: "Activo" },
  "20111": { nombre: "Costo", tipo: "Activo" },
  "33611": { nombre: "Costo", tipo: "Activo" },
  "39525": { nombre: "Unidades de transporte", tipo: "Activo" },
  "40111": { nombre: "IGV – Cuenta propia", tipo: "Pasivo" },
  "4212": { nombre: "Emitidas", tipo: "Pasivo" },
  "4111": { nombre: "Sueldos y salarios por pagar", tipo: "Pasivo" },
  "417": { nombre: "Administradoras de fondos de pensiones", tipo: "Pasivo" },
  "4511": { nombre: "Instituciones financieras", tipo: "Pasivo" },
  "6011": { nombre: "Mercaderías", tipo: "Gasto" },
  "6111": { nombre: "Mercaderías", tipo: "Gasto" },
  "6211": { nombre: "Sueldos y salarios", tipo: "Gasto" },
  "6271": { nombre: "Régimen de prestaciones de salud", tipo: "Gasto" },
  "6352": { nombre: "Edificaciones", tipo: "Gasto" },
  "6361": { nombre: "Energía eléctrica", tipo: "Gasto" },
  "6363": { nombre: "Agua", tipo: "Gasto" },
  "6364": { nombre: "Teléfono", tipo: "Gasto" },
  "68413": { nombre: "Unidades de transporte", tipo: "Gasto" },
  "70121": { nombre: "Terceros", tipo: "Ingreso" },
  "791": { nombre: "Cargas imputables a cuentas de costos y gastos", tipo: "Ingreso" }
};

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

let operacionSeleccionada = null;
let pasoActual = 0;

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  inicializarAplicacion();
});

function inicializarAplicacion() {
  const selectOperacion = document.getElementById("operacion-select");
  const btnAnterior = document.getElementById("btn-anterior");
  const btnSiguiente = document.getElementById("btn-siguiente");
  
  selectOperacion.addEventListener("change", (e) => {
    const operacionId = e.target.value;
    if (operacionId) {
      cargarOperacion(operacionId);
    } else {
      ocultarFlujo();
    }
  });

  btnAnterior.addEventListener("click", () => {
    if (pasoActual > 0) {
      pasoActual--;
      mostrarPaso();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  btnSiguiente.addEventListener("click", () => {
    if (pasoActual < operacionSeleccionada.asientos.length - 1) {
      pasoActual++;
      mostrarPaso();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

// ============================================================================
// CARGAR OPERACIÓN
// ============================================================================

function cargarOperacion(operacionId) {
  operacionSeleccionada = casosContables[operacionId];
  
  if (!operacionSeleccionada) {
    console.error("Operación no encontrada:", operacionId);
    return;
  }

  pasoActual = 0;
  mostrarFlujo();
  mostrarPaso();
}

// ============================================================================
// MOSTRAR/OCULTAR FLUJO
// ============================================================================

function mostrarFlujo() {
  const flujoContenedor = document.getElementById("flujo-contenedor");
  flujoContenedor.classList.remove("hidden");
}

function ocultarFlujo() {
  const flujoContenedor = document.getElementById("flujo-contenedor");
  flujoContenedor.classList.add("hidden");
  operacionSeleccionada = null;
  pasoActual = 0;
}

// ============================================================================
// MOSTRAR PASO ACTUAL
// ============================================================================

function mostrarPaso() {
  if (!operacionSeleccionada) return;

  const totalPasos = operacionSeleccionada.asientos.length;
  const asiento = operacionSeleccionada.asientos[pasoActual];

  // Actualizar barra de progreso
  const progressFill = document.getElementById("progress-fill");
  const progressBar = document.querySelector(".progress-bar");
  const progreso = ((pasoActual + 1) / totalPasos) * 100;
  progressFill.style.width = progreso + "%";
  progressBar.setAttribute("aria-valuenow", progreso);

  // Construir HTML del paso
  const pasoHTML = construirHTMLPaso(asiento, pasoActual + 1, totalPasos);
  
  const pasoCard = document.getElementById("paso-actual-card");
  pasoCard.innerHTML = pasoHTML;

  // Actualizar estado del botón
  actualizarBotones();
}

// ============================================================================
// CONSTRUIR HTML DEL PASO
// ============================================================================

function construirHTMLPaso(asiento, numeroPaso, totalPasos) {
  const operacion = operacionSeleccionada;
  
  let html = `
    <div class="paso-contenedor">
      <div class="paso-header">
        <span class="paso-numero">Paso ${numeroPaso} de ${totalPasos}</span>
        <h3>${operacion.titulo}</h3>
      </div>

      <div class="paso-enunciado">
        <p>${operacion.enunciado}</p>
      </div>

      <div class="paso-asiento">
        <table class="tabla-asiento">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Descripción</th>
              <th class="columna-debe">Debe</th>
              <th class="columna-haber">Haber</th>
            </tr>
          </thead>
          <tbody>
  `;

  let totalDebe = 0;
  let totalHaber = 0;

  asiento.lineas.forEach((linea) => {
    const cuentaInfo = cuentasContables[linea.cuenta] || { nombre: "Cuenta desconocida" };
    const debe = linea.debe > 0 ? formatearMoneda(linea.debe) : "";
    const haber = linea.haber > 0 ? formatearMoneda(linea.haber) : "";

    html += `
      <tr>
        <td class="celda-cuenta"><strong>${linea.cuenta}</strong></td>
        <td class="celda-descripcion">${linea.nombre}</td>
        <td class="columna-debe">${debe}</td>
        <td class="columna-haber">${haber}</td>
      </tr>
    `;

    totalDebe += linea.debe;
    totalHaber += linea.haber;
  });

  html += `
            <tr class="fila-glosa">
              <td colspan="2"><em>${asiento.glosa}</em></td>
              <td class="columna-debe"><strong>${formatearMoneda(totalDebe)}</strong></td>
              <td class="columna-haber"><strong>${formatearMoneda(totalHaber)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="paso-explicacion">
        ${asiento.explicacion.startsWith('<') ? asiento.explicacion : `<p>${asiento.explicacion}</p>`}
      </div>
    </div>
  `;

  return html;
}

// ============================================================================
// ACTUALIZAR BOTONES
// ============================================================================

function actualizarBotones() {
  const btnAnterior = document.getElementById("btn-anterior");
  const btnSiguiente = document.getElementById("btn-siguiente");
  const totalPasos = operacionSeleccionada.asientos.length;

  // Estado del botón anterior
  if (pasoActual > 0) {
    btnAnterior.disabled = false;
  } else {
    btnAnterior.disabled = true;
  }

  // Estado del botón siguiente
  if (pasoActual < totalPasos - 1) {
    btnSiguiente.textContent = "Siguiente paso →";
    btnSiguiente.disabled = false;
  } else {
    btnSiguiente.textContent = "Operación completada";
    btnSiguiente.disabled = true;
  }
}

// ============================================================================
// UTILIDADES
// ============================================================================

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
}

// ============================================================================
// EXPORTAR PARA EDICIÓN (Opcional)
// ============================================================================

function exportarCasosJSON() {
  return JSON.stringify(casosContables, null, 2);
}

function importarCasosJSON(jsonString) {
  try {
    const nuevosCasos = JSON.parse(jsonString);
    Object.assign(casosContables, nuevosCasos);
    console.log("Casos importados correctamente");
  } catch (error) {
    console.error("Error al importar casos:", error);
  }
}
