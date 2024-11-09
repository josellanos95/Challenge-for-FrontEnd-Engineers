# Order Management App

Este proyecto es una aplicación frontend simple para gestionar pedidos. La aplicación permite visualizar una lista de pedidos, realizar operaciones básicas de CRUD y paginación.

## Características

- **Vista de Lista de Pedidos**: Muestra una lista de pedidos con los siguientes campos:
  - ID del Pedido
  - Nombre del Cliente
  - Artículo
  - Cantidad
  - Estado (pendiente, completado, cancelado)
- **Paginación**: La lista de pedidos se puede paginar con botones de Siguiente y Anterior.
- **Detalles del Pedido**: Permite a los usuarios ver más detalles de un pedido seleccionado.
- **Crear/Editar Pedido**: Proporciona un formulario para crear un nuevo pedido o editar un pedido existente con los campos:
  - Nombre del Cliente (input)
  - Artículo (input)
  - Cantidad (input)
  - Estado (dropdown con opciones: pendiente, completado, cancelado)
- **Eliminar Pedido**: Permite a los usuarios eliminar un pedido de la lista.
- **Filtrar por Estado**: Permite filtrar la lista de pedidos por estado.
- **Manejo de Datos**: Utiliza una API mock (JSON server) para la recuperación y manipulación de datos.
- **Manejo de Estados de Carga y Error**: Maneja las respuestas de la API, estados de carga y estados de error.
- **Pruebas Unitarias**: Incluye pruebas unitarias básicas para los componentes.

## Requisitos

- Node.js
- npm o yarn

## Configuración

1. Clona el repositorio:
   ```sh
   git clone https://github.com/josellanos95/Challenge-for-FrontEnd-Engineers
   cd order-management-app

2. npm install
# o
yarn install

3. Inicia el servidor JSON:
npm run start:json-server

4. Inicia la aplicación en modo desarrollo:
npm run dev

5. Abre http://localhost:3000 en tu navegador para ver la aplicación.

## Scripts Disponibles
npm run dev: Inicia la aplicación en modo desarrollo.
npm run build: Compila la aplicación para producción.
npm run preview: Previsualiza la aplicación compilada.
npm run lint: Ejecuta ESLint para encontrar y arreglar problemas en el código.
npm run test: Ejecuta las pruebas unitarias.

## Estructura del Proyecto
order-management-app/
├── .gitignore
├── [components.json]
├── [db.json]
├── [eslint.config.js]
├── [index.html]
├── [jest.config.cjs]
├── [package.json]
├── [postcss.config.js]
├── public/
├── [README.md]
├── src/
│   ├── [App.css]
│   ├── [App.tsx]
│   ├── assets/
│   ├── components/
│   │   ├── [CreateOrderForm.test.tsx]
│   │   ├── [CreateOrderForm.tsx]
│   │   ├── [EditOrderForm.test.tsx]
│   │   ├── ...
│   ├── [index.css]
│   ├── lib/
│   │   ├── [utils.ts]
│   ├── [main.tsx]
│   ├── pages/
│   ├── services/
│   ├── [setupTests.ts]
│   ├── types/
│   ├── utils/
│   ├── [vite-env.d.ts]
├── [tailwind.config.js]
├── [tsconfig.app.json]
├── [tsconfig.json]
├── [tsconfig.node.json]
└── [vite.config.ts]

## Pruebas
Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
npm run test

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que quieras hacer.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.