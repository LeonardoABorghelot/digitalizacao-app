# 📱 Digitalização App

> **Projeto desenvolvido por Leonardo Borghelot na Farmácias Erechim**

Aplicativo móvel desenvolvido para otimizar processos de digitalização e gestão de documentos na empresa, proporcionando uma solução eficiente para captura, armazenamento e organização de documentos digitais.

## 🎯 Sobre o Projeto

Este projeto foi com o objetivo de modernizar e automatizar processos de digitalização de documentos. O aplicativo oferece funcionalidades avançadas de captura de imagens, autenticação segura e integração com sistemas corporativos.

### Principais Funcionalidades

- 📸 **Captura de Documentos**: Interface otimizada para fotografia de documentos
- 🔐 **Sistema de Autenticação**: Login seguro com validação de credenciais
- 📋 **Gestão de Vendas**: Listagem e controle de transações comerciais
- ☁️ **Upload de Arquivos**: Envio seguro de documentos para servidores corporativos
- 📱 **Interface Responsiva**: Design adaptável para diferentes dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Linguagem de programação tipada
- **React Navigation** - Navegação entre telas
- **Expo Camera** - Captura de imagens
- **Axios** - Cliente HTTP para APIs
- **AsyncStorage** - Armazenamento local de dados

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel ou emulador para testes

## 🚀 Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/LeonardoABorghelot/digitalizacao-app.git
cd digitalizacao-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
API_URL=sua_url_da_api
```

### 4. Execute o projeto
```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou executar diretamente em uma plataforma específica
npm run android
npm run ios
npm run web
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa na web
- `npm run lint` - Executa o linter

## 📱 Funcionalidades Detalhadas

### Autenticação
- Login com credenciais corporativas
- Armazenamento seguro de tokens
- Validação de sessão

### Captura de Documentos
- Interface otimizada para fotografia
- Controles de qualidade de imagem
- Preview em tempo real

### Gestão de Vendas
- Listagem de transações
- Filtros e busca
- Detalhes de cada venda
---