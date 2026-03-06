# Como Instalar e Rodar o Sistema de Gestão de Usuários

Bem-vindo! Este guia vai te ajudar a instalar e rodar o **Sistema de Gestão de Usuários** (usermgmt) na sua máquina (Windows ou Linux). Sem complicação! 🎉

---

## ✅ Passo 1: Instalar o Docker

O Docker é um programa que permite rodar a aplicação de forma isolada e garantida em qualquer máquina.

### 📌 Windows

1. Baixe o **Docker Desktop** em: https://www.docker.com/products/docker-desktop
2. Execute o instalador
3. Siga as instruções (clique "Next" e "Finish")
4. Reinicie o computador quando pedido
5. Pronto! Docker está instalado

### 📌 Linux (Ubuntu/Debian)

Abra o terminal e execute:

```bash
# Instalar Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose -y

# Verificar se está funcionando
docker --version
```

---

## 🚀 Passo 2: Rodar a Aplicação

### 1️⃣ **Abra a pasta do projeto**

#### Windows:
- Use o **File Explorer** para abrir a pasta do projeto

#### Linux:
```bash
cd /caminho/para/projeto
```

### 2️⃣ **Inicie o sistema**

#### Windows:
- Abra a pasta do projeto
- Clique com botão direito → **Abrir Terminal aqui** (ou PowerShell)
- Cole este comando:
```bash
docker-compose up --build
```

#### Linux:
```bash
cd /caminho/para/projeto
docker-compose up --build
```

### 3️⃣ **Aguarde o processo terminar**

Você verá várias mensagens na tela. Isso é normal! Espere até ver algo como:

```
backend-api  | info: Microsoft.Hosting.Lifetime[14]
backend-api  | Application started. Press Ctrl+C to shut down.
```

Quando aparecer essa mensagem, significa que o sistema está pronto! ✅

---

## 💻 Acessar a Aplicação

Abra seu navegador (Chrome, Firefox, Edge, etc.) e vá para:

**http://localhost:4200**

Você verá a tela de login. Pronto para usar! 🎯

### Credenciais padrão:
- **Email**: `admin@example.com`
- **Senha**: (pergunte ao administrador)

---

## ⏹️ Como Parar o Sistema

Quando quiser parar de usar, pressione:

```
Ctrl + C
```

No terminal/PowerShell onde a aplicação está rodando.

---

## 🔄 Próxima Vez que Usar

Na próxima vez, basta repetir o **Passo 2**:

```bash
docker-compose up
```

(sem `--build` dessa vez, é mais rápido)

Se quiser parar completamente e liberar espaço:

```bash
docker-compose down
```

---

## ❓ Problemas Comuns

### ❌ "A porta 4200 já está em uso"

**Solução**: Feche qualquer outro programa que esteja usando a porta, ou mude para outra porta.

### ❌ "Docker não instala"

**Solução**: 
- Certifique-se de que você tem acesso de administrador
- Reinicie o computador após a instalação
- Tente baixar a versão mais recente

### ❌ "Fica preso no 'Building...'"

**Solução**: Espere um pouco mais (a primeira vez leva 2-5 minutos). Se continuar, fecha (Ctrl+C) e tenta de novo.

### ❌ "Erro de conexão entre aplicações"

**Solução**: Verifique se o Docker está genuinamente rodando. No Windows, procure pelo ícone do Docker na bandeja do sistema.

---

## 📱 O Que Você Pode Fazer

Com o sistema rodando, você pode:

✅ **Ver lista de usuários**  
✅ **Adicionar novos usuários**  
✅ **Editar usuários**  
✅ **Deletar usuários**  
✅ **Atualizar senha**  
✅ **Fazer logout**  

---

## 📂 Onde Meus Dados Ficam?

Os dados são salvos em um arquivo chamado `users.db` na pasta `data/`.

Esse arquivo persiste, então mesmo que você pare e reinicie o sistema, **seus dados continuam lá!** 💾

---

## 🛑 Parar de Usar Completamente

Para encerrar completamente e liberar espaço:

```bash
docker-compose down
```

(ou apenas Ctrl+C no terminal)

---

## 📞 Precisa de Ajuda?

Se algo não funcionar:

1. Verifique se o Docker está aberto (Windows) ou instalado (Linux)
2. Tente fechar tudo e começar do zero
3. Reinicie o computador
4. Consulte o administrador do projeto

---

## 📋 Resumo dos Comandos

| Ação | Comando |
|------|---------|
| **Iniciar a aplicação (1ª vez)** | `docker-compose up --build` |
| **Iniciar a aplicação (próximas vezes)** | `docker-compose up` |
| **Parar a aplicação** | `Ctrl + C` |
| **Parar completamente** | `docker-compose down` |
| **Acessar no navegador** | http://localhost:4200 |

---

**Aproveite! 🎉**
