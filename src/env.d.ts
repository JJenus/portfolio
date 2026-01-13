// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORTFOLIO_URL: string
  readonly VITE_OPENROUTER_API_KEY: string
  readonly VITE_DEV_PORTFOLIO_URL: string
  readonly VITE_ENV: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}