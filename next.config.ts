import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera .next/standalone com apenas os arquivos necessários para rodar em
  // produção — usado pela imagem Docker para manter o container enxuto.
  output: "standalone",
};

export default nextConfig;
