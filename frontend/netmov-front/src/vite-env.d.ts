/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_API_URL: string;
  readonly VITE_API_BASE_URL_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
