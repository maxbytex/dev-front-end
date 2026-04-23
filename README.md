# ITX Shop — Front-End Test

Mini aplicación SPA para la compra de dispositivos móviles.

## Instalación y uso

```bash
npm install       # instalar dependencias
npm start         # desarrollo  
npm run build     # producción
npm run test      # tests
npm run lint      # lint
```

### `Example output for -> npm run test`

```
> itx-shop@0.0.0 test
> vitest run

 RUN  v4.1.5 C:/Users..../dev-front-end

 ✓ src/tests/api.test.ts           (1 test)   10ms
 ✓ src/tests/cache.test.ts         (6 tests)  11ms
 ✓ src/tests/ProductCard.test.tsx  (2 tests)  51ms
 ✓ src/tests/SearchBar.test.tsx    (3 tests) 180ms
 ✓ src/tests/CartContext.test.tsx  (3 tests) 194ms
 ✓ src/tests/Header.test.tsx       (3 tests) 207ms
 ✓ src/tests/useProducts.test.ts   (5 tests) 412ms

 Test Files  7 passed (7)
      Tests  23 passed (23)
   Start at  21:15:05
   Duration  2.96s
```

### `Example output for -> npm run build`

```
> itx-shop@0.0.0 build
> tsc -b && vite build

  vite v8.0.10 building client environment for production...
  ✓ 38 modules transformed.
  dist/index.html                   0.45 kB │ gzip:  0.29 kB
  dist/assets/index-BwHH1CXf.css  18.03 kB │ gzip:  4.47 kB
  dist/assets/index-CTPaTtKb.js  246.78 kB │ gzip: 78.94 kB
  ✓ built in 239ms
```

### `Example output for -> npm start dev`

```
> itx-shop@0.0.0 start
> vite

  VITE v8.0.10  ready in 384 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```


### `Example output for -> npm run lint `
```
> itx-shop@0.0.0 lint
> eslint .
```

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| **Node.js** | 24.11 | Entorno de ejecución — versión probada |
| **React** | 19.2.5 | UI y gestión del estado con hooks |
| **TypeScript** | 6.0.2 | Tipado estático e interfaces |
| **Vite** | 8.0.10 | Bundler y servidor de desarrollo |
| **Tailwind CSS** | 4.2.4 | Estilos mediante clases de utilidad |
| **React Router** | 7.14.2 | Enrutado client-side |
| **Vitest + RTL** | 4.1.5 / 16.3.2 | Tests unitarios y de componentes |

## Notas

- Caché de la API en `localStorage` con expiración de 1 hora (`app_cache`).
- El contador del carrito se persiste en `localStorage` (`cart_count`) y es visible en todas las vistas.
- Para añadir un producto a la cesta deben cumplirse todas las condiciones siguientes. Si alguna falla, el botón aparece deshabilitado con el texto "Sin stock":
  - el producto debe tener precio.
  - debe haber al menos una opción de color disponible
  - debe haber al menos una opción de almacenamiento disponible, cualquier almacenamiento sinn nombre será considerado un parámetro no válido.
- El campo `dimentions` (dimensions) respeta la ortografía original de la API. Ejemplo de respuesta de `GET /api/product/:id`:

```json
{
    "id": "ke-gsQbO8qH9PQ-zcdiAJ",
    "brand": "Acer",
    "model": "Liquid Zest Plus",
    "price": "200",
    "imgUrl": "https://itx-frontend-test.onrender.com/images/ke-gsQbO8qH9PQ-zcdiAJ.jpg",
    "networkTechnology": "GSM / HSPA / LTE",
    "networkSpeed": "HSPA  LTE",
    "gprs": "Yes",
    "edge": "Yes",
    "announced": "2016  April",
    "status": "Available. Released 2016  July",
    "dimentions": "154 x 77 x 10 mm (6.06 x 3.03 x 0.39 in)",
    "weight": "",
    "sim": [
        "Single SIM (Micro-SIM) or Dual SIM (Micro-SIM",
        "dual stand-by)"
    ],
    "displayType": "IPS LCD capacitive touchscreen  16M colors",
    "displayResolution": "5.5 inches (~70.3% screen-to-body ratio)",
    "displaySize": "720 x 1280 pixels (~267 ppi pixel density)",
    "os": "Android 6.0 (Marshmallow)",
    "cpu": "Quad-core 1.3 GHz Cortex-A53",
    "chipset": "Mediatek MT6735",
    "gpu": "Mali-T720MP2",
    "externalMemory": "microSD (dedicated slot)",
    "internalMemory": [
        "16 GB"
    ],
    "ram": "2 GB RAM",
    "primaryCamera": [
        "13 MP",
        "phase detection/laser autofocus",
        "LED flash"
    ],
    "secondaryCmera": "5 MP",
    "speaker": "Yes",
    "audioJack": "Yes",
    "wlan": "Yes",
    "bluetooth": "Yes",
    "gps": "Yes with A-GPS",
    "nfc": "",
    "radio": "FM radio",
    "usb": "microUSB 2.0",
    "sensors": [
        "Accelerometer",
        "proximity",
        "compass"
    ],
    "battery": "Non-removable Li-Ion 5000 mAh battery",
    "colors": [
        "Blue",
        "White"
    ],
    "options": {
        "colors": [
            {
                "code": 1000,
                "name": "Blue"
            },
            {
                "code": 1001,
                "name": "White"
            }
        ],
        "storages": [
            {
                "code": 2000,
                "name": "16 GB"
            }
        ]
    }
}
```


