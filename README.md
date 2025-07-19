> _TEAM Gateway Pay

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Ton-blue)

---

### 🌐 Introduction

Capacitar milhões de brasileiros a acessar o mundo das criptomoedas por meio da simplicidade do PIX — tornando a TON a rede blockchain mais acessível da América Latina para pagamentos, investimentos e inovação financeira descentralizada.

---

### 🔴 Ton Blockchain.

Nossa plataforma é construída sobre a TON (The Open Network), uma blockchain de altíssima performance ideal para integração com mensageiros, micropagamentos e experiências Web3 simplificadas.

A TON já está integrada ao Telegram — o mensageiro mais utilizado no Brasil — permitindo que milhões de usuários tenham uma carteira blockchain nativa em seus smartphones. Isso torna a Gateway Pay a ponte perfeita entre o PIX e o universo cripto, usando a TON como base para acessibilidade, velocidade e escalabilidade.

--- 

### 🔗 Deploy na MainNet

📄 **Contrato Deployado:**  

- 🪙 [Token](https://tonviewer.com/UQDBIhmZ3uuX9MzFJmmShZMiLOkwGNk_tsRU_O3yUW-VbOtQ?section=message)

✅ Mainnet TON

---

## Nota sobre a Integração com o Back-end da TRANSFER

Atualmente, não conseguimos testar a integração entre o front-end e o back-end da TRANSFER, pois ainda não temos o token de acesso necessário para autenticação. Esse token é essencial para validar a comunicação com a API da TRANSFER durante o desenvolvimento.

Já solicitamos o token à equipe responsável e estamos aguardando sua emissão para que possamos prosseguir com os testes e integrar completamente a aplicação aos serviços da TRANSFER.

---

### 🔁 End-to-End DApp Flowchart

![DApp Flowchart](https://github.com/user-attachments/assets/702c19d9-dc39-4f37-90fd-d43de226ca42)

---

## 🛠 Installation (Front-end)

1. **Pre-requisites**
    - Make sure you have NodeJS installed on your machine.

2. **Clone the Repository**

    ```bash
    git clone https://github.com/bellujrb/ton-gateway-pix
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Run the App**

    ```bash
    npm run dev
    ```

---

## 📂 Project File Tree
    
```
ton-gateway-pay
├── back-end
│   └── app.ts
│   └── package.lock.json
│   └── package.json
├── src
│   └── components
│       └── DisplayData
│           └── ...
│       └── Link
│           └── ...
│       └── RGB
│           └── ...
│       └── App.tsx
│       └── EnvUnsupported.tsx
│       └── ErrorBoundary.tsx
│       └── Page.tsx
│       └── Route.tsx
│   └── css
│       └── ...
│   └── helper
│       └── publicUrl.ts
│       └── tonApi.ts
│       └── tonPrice.ts
│   └── hooks
│       └── useTonTokenBalances.ts
│       └── useTonTokenPrices.ts
│   └── navigation
│       └── routers.tsx
│   └── pages
│       └── ...
│   └── index.tsx
│   └── index.css
│   └── init.ts
│   └── mockEnv.tsx
├── blockchain
│   └── imports
│       └── stdlib.func
│   └── contract.func
├── README.MD
```
---

#### `ton-gateway-pix`

- `back-end`
    - Back-end Application
- `src`
    - Frontend Application
- `blockchain`
    - Blockchain Application
- `README.md`
    - Documentation Project
 
---

## 🙏 Agradecimentos

Agradecimentos especiais à TON Blockchain por esta oportunidade ambiciosa.

---
