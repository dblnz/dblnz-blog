/// <reference types="vite/client" />

interface ImportMeta {
  readonly glob: <T>(globPattern: string, options?: {
    query?: string,
    import?: string,
    eager?: boolean
  }) => Record<string, T>;
}