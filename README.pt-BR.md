# BM Tools CLI

**BM Tools** é uma CLI desenvolvida em JavaScript usando o runtime `Bun`. Ela facilita tarefas automatizadas com integração ao OpenAI, ideal para equipes de desenvolvimento.

---

## Pré-requisitos

1. **Instalação do Bun Runtime**:
   - O `Bun` é necessário para rodar esta CLI. Siga as instruções abaixo para instalar:
     ```bash
     curl -fsSL https://bun.sh/install | bash
     ```
   - Após a instalação, certifique-se de que o `bun` está configurado corretamente:
     ```bash
     bun --version
     ```

2. **Variáveis de Ambiente Obrigatórias**:
   Para usar a integração com o OpenAI, configure as seguintes variáveis de ambiente:
   - `OPENAI_API_KEY`: Sua chave de api da OpenAI.

   Você pode encontrar essas informações em [OpenAI API Keys](https://platform.openai.com/account/api-keys).

3. **Créditos no OpenAI**:
   - É necessário ter créditos ativos na OpenAI para utilizar os serviços da API. Garanta que sua conta tenha um plano configurado.

---

## Instalação

### **Opção 1: Instalação com Bun**

1. Execute o comando para adicionar a CLI:
   ```bash
   bun add -g github:blmarquess/bm-tools
   ```

2. Verifique se a CLI está instalada corretamente:
   ```bash
   bm-tools --help
   ```

---

### **Opção 2: Clonando o Repositório**

1. Clone o repositório:
   ```bash
   git clone https://github.com/blmarquess/bm-tools.git
   ```

2. Entre no diretório do projeto:
   ```bash
   cd bm-tools
   ```

3. Crie o link simbólico da CLI:
   ```bash
   bun link
   ```

4. Teste a instalação:
   ```bash
   bm --help
   ```

---

## Configuração das Variáveis de Ambiente

Certifique-se de adicionar as variáveis de ambiente ao seu sistema. Exemplo em um arquivo `.env`:

```plaintext
OPENAI_API_KEY=your_openai_apy_key
```

Ou configure diretamente no terminal:
```bash
export OPENAI_API_KEY=your_openai_apy_key
```

---

## Comandos Disponíveis

### `bm c` ou `bm commit`
- **Descrição**: Gera uma mensagem de commit a partir das alterações staged (cached) no Git.
- **Uso**:
  - Sem argumentos: Copia a mensagem de commit para o clipboard.
    ```bash
    bm c
    ```
  - Com `-y`: Gera e executa o commit diretamente.
    ```bash
    bm c -y
    ```

### `bm c -m` ou `bm commit -m`
- **Descrição**: Gera uma mensagem de commit a partir de todas as alterações (staged e unstaged) no Git.
- **Uso**:
  - Sem argumentos: Copia a mensagem de commit para o clipboard.
    ```bash
    bm c -m
    ```
  - Com `-y`: Gera e executa o commit diretamente.
    ```bash
    bm c -m -y
    ```

---

## Exemplo de Uso

1. Gerar uma mensagem de commit para alterações staged e copiar para o clipboard:
   ```bash
   bm c
   ```

2. Gerar uma mensagem de commit para alterações staged e executar o commit:
   ```bash
   bm c -y
   ```

3. Gerar uma mensagem de commit para todas as alterações e copiar para o clipboard:
   ```bash
   bm c -m
   ```

4. Gerar uma mensagem de commit para todas as alterações e executar o commit:
   ```bash
   bm c -m -y
   ```

---

## Créditos e Observações
- **Créditos**: Esta ferramenta foi desenvolvida por Bruno Marques.

- **Uso do OpenAI**: É necessário ter uma conta com créditos ativos para utilizar a API. Para mais informações, visite a página da [OpenAI API](https://platform.openai.com/account/api-keys).
- **Licença**: Esta ferramenta é distribuída sob a licença MIT.
- **Desenvolvimento**: Esta ferramenta foi desenvolvida para facilitar tarefas específicas no fluxo de trabalho de desenvolvimento e pode ser personalizada conforme necessário.