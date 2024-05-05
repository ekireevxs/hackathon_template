/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GET_TOKEN_URL: string;
  readonly VITE_PAY_STATION_URL: string;
  readonly VITE_SANDBOX_PAY_STATION_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
