[README.md](https://github.com/user-attachments/files/22789648/README.md)
# 🧠 Proyecto Final — Simulador de Alquiler de Vehículos

**Autor:** Santiago Pantín  
**Carrera:** Desarrollo Full Stack — CoderHouse  
**Comisión:** JavaScript  
**Año:** 2025  

---

## 🚀 Descripción

Este proyecto corresponde al **entregable final del curso de JavaScript en CoderHouse**.  
Simula un **sistema de alquiler de vehículos**, permitiendo al usuario elegir un auto, definir la cantidad de días de reserva y calcular automáticamente el costo total, aplicando descuentos por cantidad de días.

La aplicación está construida con **HTML, CSS y JavaScript puro**, integrando las principales herramientas aprendidas en el curso:

- Manipulación dinámica del **DOM**  
- **Eventos** y delegación de eventos  
- **Asincronía** y carga de datos desde un archivo JSON  
- **LocalStorage** para persistir datos  
- Integración de **librerías externas**  
- Enfoque en **accesibilidad** y **usabilidad**  

---

## ⚙️ Funcionalidades principales

✅ **Catálogo dinámico:** Los vehículos se cargan desde un archivo `JSON` y se renderizan en el DOM.  
✅ **Búsqueda y filtros:** Se puede buscar por marca o modelo y filtrar por categoría, precio máximo o disponibilidad.  
✅ **Simulador de reservas:** Calcula automáticamente el costo total según los días ingresados.  
✅ **Descuentos progresivos:**
   - 5% para reservas de **3 a 6 días**  
   - 10% para reservas de **7 días o más**  
✅ **Persistencia:** Las reservas se guardan en **LocalStorage** y se restauran al recargar la página.  
✅ **Edición y eliminación:** Se pueden editar los días de una reserva o eliminarla.  
✅ **Interfaz accesible y responsiva:** Compatible con teclado y pantallas pequeñas.  
✅ **Alertas visuales:** Uso de **SweetAlert2** y **Toastify** en lugar de `alert()` para una mejor experiencia de usuario.  

---

## 🧩 Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **HTML5** | Estructura semántica del proyecto |
| **CSS3 / SASS** | Estilos visuales con variables y mixins |
| **JavaScript (ES6+)** | Lógica principal del simulador |
| **SweetAlert2** | Alertas y modales personalizados |
| **Toastify.js** | Notificaciones visuales |
| **LocalStorage** | Persistencia de datos |
| **JSON** | Simulación de datos remotos |

---

## 🖥️ Estructura del proyecto

```
ProyectoFinal+Pantin/
│
├── index.html                # Pantalla de inicio (presentación)
├── pages/
│   └── app.html              # Simulador principal
├── css/
│   └── style.css             # Estilos principales
├── js/
│   └── app.js                # Lógica del simulador
├── data/
│   └── autos.json            # Datos remotos (vehículos)
├── img/                      # Imágenes de autos
└── README.md                 # Este archivo
```

---

## 🧮 Lógica de descuentos

```js
function calcular(precio, dias) {
  const subtotal = precio * dias;
  const desc = dias >= 7 ? 0.10 : (dias >= 3 ? 0.05 : 0);
  const total = subtotal * (1 - desc);
  return { subtotal, desc, total };
}
```

---

## 📦 Librerías externas

- [**SweetAlert2**](https://sweetalert2.github.io/) → para modales y confirmaciones  
- [**Toastify.js**](https://apvarun.github.io/toastify-js/) → para notificaciones flotantes  

---

## 🎨 Interfaz visual

El diseño se inspira en un estilo **“bento UI”** con colores fríos y tarjetas amplias, buscando equilibrio entre estética moderna y claridad.  
El proyecto fue diseñado para verse bien tanto en escritorio como en dispositivos móviles.

---

## 🔒 Accesibilidad

- Uso de `aria-live` en zonas dinámicas  
- Etiquetas `label` y `sr-only` en inputs  
- Colores con suficiente contraste  
- Navegación por teclado sin bloqueos  

---

## 🧑‍💻 Cómo ejecutar el proyecto

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Santi2402/Entregable1-Pantin_UI_base.git
   ```
2. Abrí el archivo `index.html` en tu navegador.

> 💡 El simulador no requiere servidor; funciona 100% en el navegador.

---

## 🌐 Demo en línea

👉 [Ver proyecto en GitHub Pages](https://santi2402.github.io/Entregable1-Pantin_UI_base/)

---

## ✍️ Autor

**Santiago Pantín**  
💼 Diseñador UX/UI & Desarrollador Frontend  
📍 Uruguay  
🔗 [LinkedIn](https://www.linkedin.com/in/santiago-pant%C3%ADn-7075711a4/)  
🎨 [Portfolio](https://www.behance.net/spantin)
