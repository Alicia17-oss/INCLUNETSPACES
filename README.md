# 🌐 IncunetSpaces – Plataforma de Voluntariado

**IncunetSpaces** es una aplicación web informativa y demostrativa que conecta **voluntarios** con **organizaciones** que realizan campañas sociales.  
Este proyecto forma parte de la práctica de **Maquetado y Programación Frontend**, implementando conceptos de **HTML semántico**, **CSS responsive**, **JavaScript** y **consumo de API simulada (JSON)**.

---

## 🚀 Descripción del Proyecto

El sistema está diseñado para visualizar de manera clara y atractiva:
- **Voluntariados disponibles**, cargados dinámicamente desde archivos JSON o desde una futura API real.
- **Organizaciones aliadas**, con información, logo y ubicación.
- **Sección informativa**, donde se explica la misión y los valores del proyecto.
- **Apartado de APIs**, donde se documenta la comunicación entre el frontend y el backend.

Incluye:
- **Diseño moderno (Glassmorphism + Neumorphism)**.
- **Modo AMOLED / Azul cielo**, con transición animada.
- **Menú responsivo tipo hamburguesa**.
- **Animaciones suaves y efectos de aparición en scroll**.

---

## 🧱 Tecnologías Utilizadas

- **HTML5** – estructura semántica.
- **CSS3 avanzado** – variables, Flexbox, Grid y media queries.
- **JavaScript (ES6+)** – interacción dinámica, consumo de JSON y animaciones.
- **Mock API (archivos locales .json)** – simulación de endpoints reales.

---

## 🔗 Estructura de las API’s a consumir

### 1. Endpoint de Voluntariados
```
GET /api/voluntariados
```
**Descripción:** Obtiene la lista de campañas de voluntariado disponibles.

**Ejemplo de respuesta:**
```json
[
  {{
    "id_vol": 10,
    "nombre_vol": "Reforestación en Cancún",
    "categoria": "Medio Ambiente",
    "descripcion": "Plantación y cuidado de árboles en áreas verdes.",
    "fecha_inicio": "2025-06-01"
  }},
  {{
    "id_vol": 11,
    "nombre_vol": "Apoyo a comunidades",
    "categoria": "Comunidad",
    "descripcion": "Distribución de alimentos y talleres.",
    "fecha_inicio": "2025-06-15"
  }},
  {{
    "id_vol": 12,
    "nombre_vol": "Limpieza de playas",
    "categoria": "Medio Ambiente",
    "descripcion": "Brigadas para limpieza de costas y concientización.",
    "fecha_inicio": "2025-07-02"
  }}
]
```

---

### 2. Endpoint de Organizaciones
```
GET /api/organizaciones
```
**Descripción:** Devuelve las organizaciones registradas en el sistema.

**Ejemplo de respuesta:**
```json
[
  {{
    "id_org": 1,
    "nombre_org": "Fundación Esperanza",
    "ubicacion": "Cancún",
    "descripcion": "Programas de alfabetización y becas.",
    "categoria": "Educación"
  }},
  {{
    "id_org": 2,
    "nombre_org": "Red Verde",
    "ubicacion": "Riviera Maya",
    "descripcion": "Restauración ecológica y educación ambiental.",
    "categoria": "Medio Ambiente"
  }},
  {{
    "id_org": 3,
    "nombre_org": "Manos Unidas",
    "ubicacion": "CDMX",
    "descripcion": "Acciones solidarias en barrios vulnerables.",
    "categoria": "Comunidad"
  }}
]
```

---

### 3. Endpoint de Participaciones
```
POST /api/participaciones
```
**Descripción:** Permite registrar la participación de un usuario en un voluntariado.

**Ejemplo de solicitud:**
```json
{{
  "id_usuario": 5,
  "id_vol": 10
}}
```

**Ejemplo de respuesta:**
```json
{{
  "id_part": 321,
  "id_usuario": 5,
  "id_vol": 10,
  "estado": "pendiente",
  "fecha_union": "2025-11-07T12:30:00Z"
}}
```

## 👩‍💻 Autora

**Cristal Alicia Osorio Patricio**  
Desarrollo Frontend, UI/UX y maquetado profesional con enfoque educativo.  
📍 *Instituto Tecnológico de Cancún – Ingeniería en Sistemas Computacionales (2025)*

---

## 🧾 Licencia
Proyecto académico para uso educativo y demostrativo.  
Libre para compartir y adaptar con fines de aprendizaje.
