# FinBot - AI Financial Analyst

**Your intelligent financial reporting assistant.**

FinBot is an advanced AI-powered chatbot designed specifically for payment and finance teams. It streamlines financial data analysis by allowing users to ask complex questions in natural language, upload documents for instant insights, and generate interactive data visualizations on the fly.

## Key Features

-   **Conversational Queries**: Ask questions about your financial data in plain English. No need for complex query languages or spreadsheet formulas.
-   **Multi-Provider Ready**: Easily configure the bot to use different AI providers. The project is set up to support Google Gemini, OpenAI, or Anthropic Claude. (Note: Current implementation supports Gemini out-of-the-box).
-   **Automated Report Access**: FinBot acts as if it has real-time access to your team's daily, weekly, and monthly reports from connected data sources like Google Drive.
-   **File Upload & Analysis**: Upload your own financial documents (`PDF`, `DOCX`, `XLSX`, `CSV`) to have them instantly analyzed and included in the conversation.
-   **Interactive Visualizations**: Generate dynamic bar charts, line graphs, and pie charts by simply asking. The chart appears in a dedicated side panel, keeping it visible alongside the conversation.
-   **Proactive Chart Suggestions**: After providing a text-based analysis, FinBot intelligently suggests relevant visualizations, which can be generated with a single click.
-   **Modern Analyst Workbench UI**: A three-panel layout provides a seamless workflow:
    1.  **Chat History**: Easily reference past conversations or start a new one.
    2.  **Main Chat**: The central hub for interacting with the AI.
    3.  **Visualization Panel**: A dedicated space for viewing and analyzing charts without losing your conversational context.

## Getting Started

This project is designed to run in a modern web environment where dependencies are managed via import maps and environment variables are pre-configured.

### Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari).
-   An API key from your chosen AI provider (Google Gemini, OpenAI, or Anthropic).

### Configuration

The application requires an API key to function. Configuration is managed through an environment file.

1.  **Create an Environment File**: In the root of the project, create a new file named `.env`. You can do this by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  **Edit the `.env` File**: Open the `.env` file and configure the variables:
    -   `AI_PROVIDER`: Set this to the AI provider you want to use. The default and currently implemented provider is `gemini`.
    -   **API Keys**: Add your API key for the provider you selected. You only need to fill in the key for your chosen `AI_PROVIDER`.

    Your `.env` file should look something like this:
    ```env
    # Select your AI provider. Currently, only 'gemini' is supported in the code.
    AI_PROVIDER=gemini

    # Add your API keys below. Only the key for the selected provider is required.
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    OPENAI_API_KEY="" # Leave blank if not using
    ANTHROPIC_API_KEY="" # Leave blank if not using
    ```
**Note**: The application code has been pre-configured to work with Gemini. To use OpenAI or Claude, you would need to implement the corresponding service logic in the `services/` directory.

### Installation

No traditional installation steps like `npm install` are needed if you are running this in a supported online development environment that respects the `importmap` in `index.html` and can inject environment variables from a `.env` file.

1.  Create and configure your `.env` file as described above.
2.  Serve the `index.html` file through a web server.

If you wish to run this project in a standard local development setup, you will need to:
1.  Set up a React project using a build tool like [Vite](https://vitejs.dev/) or [Create React App](https://create-react-app.dev/).
2.  Install the required dependencies manually:
    ```bash
    npm install react react-dom @google/genai lucide-react recharts
    ```
3.  Ensure your build tool is configured to use your `.env` file (e.g., Vite does this automatically).
4.  If using Vite, adjust the code in `services/geminiService.ts` to import the API key from `import.meta.env.VITE_GEMINI_API_KEY` instead of `process.env.GEMINI_API_KEY`.

## Technology Stack

-   **Frontend**: React with TypeScript
-   **Styling**: Tailwind CSS
-   **AI & Language Model**: Google Gemini API (`gemini-2.5-flash`)
-   **Charting Library**: Recharts
-   **Icons**: Lucide React

## How It Works

FinBot leverages the power of a large language model with a detailed system instruction that primes the AI to act as a financial analyst.

1.  **User Input**: The user sends a prompt, which can be a text question or a file upload.
2.  **API Communication**: The request is sent to the `geminiService`, which constructs a request to the Gemini API, including the prompt, conversation history, and any file data.
3.  **Intelligent Response**: Based on the system instructions and the user's prompt, the Gemini model generates a response.
    -   For analytical questions, it provides a markdown-formatted text answer and may suggest a follow-up chart.
    -   For visualization requests, it returns a structured `JSON` object that defines the chart's type and data.
4.  **Dynamic Rendering**: The React frontend parses the response and dynamically updates the UI. Text is rendered in the chat panel, and if a chart is generated, it's displayed in the dedicated visualization panel.
