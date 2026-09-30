# Coldwell Banker — Calculadora de conversión

Copia del sitio privado: https://coldwell-tu-siguiente-nivel.baffler781210.chatgpt.site

## Contenido

- `app/page.tsx`: cuatro escenas, preguntas progresivas, resultados y contacto.
- `app/globals.css`: estilos, diseño responsivo y animaciones.
- `public/`: fotografías, logotipos SVG y demás recursos del sitio.
- `lib/parameters.json` y `lib/calculator.ts`: parámetros y cálculos originales.
- `components/growth-display.tsx`: cifras y gráfica animadas.
- `lib/report-pdf.ts` y `lib/report-logo.ts`: PDF de una página con logo y enlace de seguimiento.
- `app/api/report/route.ts`: descarga del PDF.
- `app/api/leads/route.ts`: validación, registro y correo transaccional cuando está configurado.
- `db/` y `drizzle/`: esquema y migraciones de la base de datos.
- `source-assets/`: Excel fuente y logotipo SVG original entregados por el cliente.

## Instalación

Requiere Node.js >= 22.13 y la versión de pnpm indicada en `package.json`.

```sh
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

Para compilar: `pnpm build`. Consulta también `README.md` para los detalles del entorno Vinext y Cloudflare Workers. El proyecto incluye utilidades de Sites; fuera de ese entorno, se debe configurar la cuenta de Cloudflare y el enlace D1 antes de operar los endpoints de prospectos.

## Configuración de servicios

- D1: enlace lógico `DB`. Aplicar las migraciones de `drizzle/` en la base de destino.
- Correo: `RESEND_API_KEY` y `EMAIL_FROM`, con remitente verificado. Las claves no forman parte del repositorio.
- Sin correo configurado, se registra la solicitud y se informa que el envío está pendiente. No se simula un envío exitoso.
- Las sesiones se guardan como solicitudes pendientes de confirmación; no hay integración de agenda automática.
- El enlace del botón en el PDF apunta al dominio actual, definido en `lib/report-pdf.ts`. Cambiarlo si se migra el dominio.

## Alcance de la exportación

Incluye código, dependencias declaradas, archivos de bloqueo, recursos y esquema de datos. No contiene registros de prospectos, credenciales, `node_modules` ni una copia de la base de datos de producción. La configuración `.openai/hosting.json` conserva la identidad del sitio existente; no utilizarla para sobrescribir otra implementación.

La calculadora conserva las opciones y los valores del Excel. El crecimiento en IBC es una estimación comercial, no una garantía de utilidad. Más de $5 MDP requiere revisión personalizada. El envío de seguimiento respeta la preferencia de contacto elegida.
