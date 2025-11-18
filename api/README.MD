# VersionHub API

API serverless para obter as versões das principais tecnologias em tempo real.

## 📋 Descrição

VersionHub consulta as fontes oficiais de Flutter, Dart, Angular, Node.js e .NET para retornar suas versões mais recentes. Utiliza cache inteligente com Upstash Redis para otimizar performance.

**Tecnologias monitoradas:**
- Flutter
- Dart
- Angular
- Node.js
- .NET

## 🚀 Quick Start

```bash
npm install
npm run dev  # netlify dev
```

Acesse `http://localhost:8888/api/versions` ou `http://localhost:8888/docs` para a documentação.

## ⚙️ Variáveis de Ambiente

```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

## 📡 Endpoint

**GET `/api/versions`** - Retorna as versões de todas as tecnologias

```json
{
  "flutter": {
    "version": "3.38.1",
    "releaseDate": "15/11/2025",
    "extra": {
      "dartVersion": "3.0.6"
    }
  },
  "dart": {
    "version": "3.0.6",
    "releaseDate": "10/11/2025"
  },
  "angular": {
    "version": "19.1.0",
    "releaseDate": "12/11/2025"
  },
  "node": {
    "version": "20.5.1",
    "releaseDate": "08/11/2025"
  },
  "dotnet": {
    "version": "9.0.100",
    "releaseDate": "15/11/2025",
    "extra": {
      "supportPhase": "lts",
      "eolDate": "10/05/2026"
    }
  }
}
```

## 🧪 Testes

```bash
npm test
```

## 📚 Stack

- Node.js 20+ | TypeScript 5.9
- Netlify Functions | Upstash Redis
- Jest | Axios

## 📝 Licença

Copyright © 2025 - Alfredo Neto. Todos os direitos reservados.
