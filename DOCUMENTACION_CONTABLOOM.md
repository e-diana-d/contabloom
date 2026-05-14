# ContaBloom

**Página educativa de asientos contables basado en el PCGE 2019 de Perú**

ContaBloom es una página web diseñada para aprender asientos contables básicos paso a paso, registrados según el Plan Contable General Empresarial (PCGE) 2019 de Perú.

---

## ¿Qué hace?

El usuario selecciona una operación contable desde un menú desplegable y la aplicación muestra cada asiento de forma secuencial, con:

- La tabla debe/haber con cuentas del PCGE
- La glosa del asiento
- Una explicación didáctica del por qué de cada movimiento
- Referencias a normas tributarias vigentes (SUNAT, SBS, Ley del IR, etc)

---

## Operaciones disponibles

| ID                          | Operación                                 |
| --------------------------- | ----------------------------------------- |
| `compra_mercaderia_contado` | Compra de mercadería al contado           |
| `compra_mercaderia_credito` | Compra de mercadería al crédito           |
| `compra_activo_fijo`        | Compra de activo fijo (computadora)       |
| `venta_mercaderia_contado`  | Venta de mercadería al contado            |
| `venta_mercaderia_credito`  | Venta de mercadería al crédito            |
| `pago_servicios_basicos`    | Pago de servicios básicos                 |
| `pago_alquiler_oficina`     | Pago de alquiler de oficina               |
| `cobro_factura_credito`     | Cobro de factura al crédito               |
| `pago_factura_credito`      | Pago de factura al crédito                |
| `depreciacion_activo_fijo`  | Depreciación de activo fijo               |
| `planilla_sueldos`          | Planilla de sueldos (AFP + ONP + ESSALUD) |
| `retiro_banco_para_caja`    | Retiro de banco para caja                 |

---

## Estructura del proyecto

```
CONTA-BLOOM-V1/
├── DOCUMENTACION_CONTABLOOM.md   # Este archivo
├── index.html                    # Interfaz principal
├── script.js                     # Lógica de la aplicación
├── styles.css                    # Estilos
├── favicon.svg                   # Ícono de la app
├── og-image.jpeg                 # Imagen para vista previa en redes (Open Graph)
└── tabla-planilla.png            # Imagen de referencia para el caso de planilla
```

### Estructura de `app.js`

| Sección                   | Descripción                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `casosContables`          | Base de datos de todas las operaciones con sus asientos y explicaciones |
| `cuentasContables`        | Diccionario de cuentas del PCGE con nombre y tipo                       |
| Variables globales        | `operacionSeleccionada` y `pasoActual`                                  |
| `inicializarAplicacion()` | Registra los event listeners al cargar el DOM                           |
| `cargarOperacion()`       | Carga una operación y reinicia el paso a 0                              |
| `mostrarPaso()`           | Renderiza el asiento del paso actual                                    |
| `construirHTMLPaso()`     | Genera el HTML de la tabla contable y la explicación                    |
| `actualizarBotones()`     | Habilita/deshabilita los botones Anterior y Siguiente                   |
| `formatearMoneda()`       | Formatea valores en soles con `Intl.NumberFormat`                       |

---

## Cómo agregar un nuevo caso

Agregar una nueva operación es simple: basta con añadir una entrada al objeto `casosContables` en `script.js` con la siguiente estructura:

```js
nueva_operacion: {
  titulo: "Nombre visible de la operación",
  enunciado: "Descripción del caso práctico con datos de la empresa.",
  asientos: [
    {
      numero: 1,
      glosa: "Descripción del asiento",
      lineas: [
        { cuenta: "XXXX", nombre: "Nombre de la cuenta", debe: 0, haber: 0 },
        // ...más líneas
      ],
      explicacion: "Texto explicativo del asiento. Puede contener HTML."
    }
    // ...más asientos si la operación los requiere
  ]
}
```

Luego, agregar la opción correspondiente en el `<select>` del HTML:

```html
<option value="nueva_operacion">Nombre visible de la operación</option>
```

---

## Criterios contables aplicados

- **Sistema de cuentas de destino del PCGE:** los gastos de naturaleza (clase 6) siempre se trasladan a cuentas de función (94, 95) usando la cuenta 791 como contrapartida.
- **IGV:** el crédito fiscal se registra en la cuenta 40111 tanto en compras como en servicios.
- **Bancarización:** los pagos superiores a S/ 2,000 se registran en la cuenta 1041 (cuenta corriente), no en caja, conforme a la Ley N° 28194.
- **Depreciación:** se aplican las tasas máximas del artículo 22° del Reglamento de la Ley del Impuesto a la Renta.
- **Planilla:** incluye el cálculo de AFP (comisión, prima, aporte obligatorio), ONP (13%), ESSALUD (9%) y asignación familiar (10% de la RMV).

---

## Tecnologías

- HTML, CSS y JavaScript puro (sin frameworks ni dependencias externas)
- `Intl.NumberFormat` para formateo de moneda en soles peruanos

---

## Público objetivo

Estudiantes que recién inician en contabilidad, administración o carreras afines. No se asume conocimiento previo: las explicaciones parten desde cero, usan lenguaje accesible y siempre indican el por qué de cada cuenta, no solo el cómo.
