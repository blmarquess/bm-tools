# BM Tools CLI

**BM Tools** is a CLI built with JavaScript using the `Bun` runtime. It streamlines automated tasks with OpenAI integration, designed for development teams.

---

## Prerequisites

1. **Install Bun Runtime**:
   - The `Bun` runtime is required to run this CLI. Install it using the following command:
     ```bash
     curl -fsSL https://bun.sh/install | bash
     ```
   - After installation, ensure `bun` is properly configured:
     ```bash
     bun --version
     ```

2. **Required Environment Variables**:
   To use OpenAI integration, the following environment variables must be configured:
   - `OPENAI_API_KEY`: Your OpenAI API Key.

   You can find these details on the [OpenAI API Keys page](https://platform.openai.com/account/api-keys).

3. **OpenAI Credits**:
   - Active OpenAI credits are required to use the API. Ensure your account is set up with a valid plan.

---

## Installation

### **Option 1: Install with Bun**

1. Add the CLI using the following command:
   ```bash
   bun add -g github:blmarquess/bm-tools
   ```

2. Verify the installation:
   ```bash
   bm--help
   ```

---

### **Option 2: Clone the Repository**

1. Clone the repository:
   ```bash
   git clone https://github.com/blmarquess/bm-tools.git
   ```

2. Navigate to the project directory:
   ```bash
   cd bm-tools
   ```

3. Link the CLI to your system:
   ```bash
   bun link
   ```

4. Test the CLI:
   ```bash
   bm-tools --help
   ```

---

## Setting Up Environment Variables

Make sure to set the required environment variables. For example, using a `.env` file:

```plaintext
OPENAI_API_KEY=your_openai_apy_key
```

Or set them directly in the terminal:
```bash
export OPENAI_API_KEY=your_openai_api_key
```

---

## Available Commands

### `bm c` or `bm commit`
- **Description**: Generates a commit message from the Git staged (cached) changes.
- **Usage**:
  - Without arguments: Copies the commit message to the clipboard.
    ```bash
    bm c
    ```
  - With `-y`: Generates and directly commits the changes.
    ```bash
    bm c -y
    ```

### `bm c -m` or `bm commit -m`
- **Description**: Generates a commit message from all Git changes (staged and unstaged).
- **Usage**:
  - Without arguments: Copies the commit message to the clipboard.
    ```bash
    bm c -m
    ```
  - With `-y`: Generates and directly commits the changes.
    ```bash
    bm c -m -y
    ```

---

## Usage Examples

1. Generate a commit message for staged changes and copy it to the clipboard:
   ```bash
   bm c
   ```

2. Generate a commit message for staged changes and directly commit them:
   ```bash
   bm c -y
   ```

3. Generate a commit message for all changes and copy it to the clipboard:
   ```bash
   bm c -m
   ```

4. Generate a commit message for all changes and directly commit them:
   ```bash
   bm c -m -y
   ```

---

## Credits and Notes
- **Author**: Bruno Marques (blmarquess)[@github](https://github.com/blmarquess)

- **OpenAI Usage**: An active OpenAI account with credits is required to use the API. For more information, visit the [OpenAI API page](https://platform.openai.com/account/api-keys).
- **Development**: This tool is designed to streamline specific tasks in the development workflow and can be customized as needed.