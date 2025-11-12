# FinBot - AI Financial Analyst

**Your intelligent financial reporting assistant.**

FinBot is an advanced AI-powered chatbot designed specifically for payment and finance teams. It streamlines financial data analysis by allowing users to ask complex questions in natural language, upload documents for instant insights, and generate interactive data visualizations on the fly.

## Key Features

-   **Conversational Queries**: Ask questions about your financial data in plain English. No need for complex query languages or spreadsheet formulas.
-   **Automated Report Access**: FinBot acts as if it has real-time access to your team's daily, weekly, and monthly reports from connected data sources like Google Drive.
-   **File Upload & Analysis**: Upload your own financial documents (`PDF`, `DOCX`, `XLSX`, `CSV`) to have them instantly analyzed and included in the conversation.
-   **Interactive Visualizations**: Generate dynamic bar charts, line graphs, and pie charts by simply asking. The chart appears in a dedicated side panel, keeping it visible alongside the conversation.
-   **Proactive Chart Suggestions**: After providing a text-based analysis, FinBot intelligently suggests relevant visualizations, which can be generated with a single click.
-   **Modern Analyst Workbench UI**: A three-panel layout provides a seamless workflow:
    1.  **Chat History**: Easily reference past conversations or start a new one.
    2.  **Main Chat**: The central hub for interacting with the AI.
    3.  **Visualization Panel**: A dedicated space for viewing and analyzing charts without losing your conversational context.

## Technology Stack

-   **Frontend**: React with TypeScript
-   **Styling**: Tailwind CSS
-   **AI & Language Model**: Google Gemini API (`gemini-2.5-flash`)
-   **Charting Library**: Recharts
-   **Icons**: Lucide React

## How It Works

FinBot leverages the power of the Google Gemini API with a detailed system instruction that primes the AI to act as a financial analyst.

1.  **User Input**: The user sends a prompt, which can be a text question or a file upload.
2.  **API Communication**: The request is sent to the `geminiService`, which constructs a request to the Gemini API, including the prompt, conversation history, and any file data.
3.  **Intelligent Response**: Based on the system instructions and the user's prompt, the Gemini model generates a response.
    -   For analytical questions, it provides a markdown-formatted text answer and may suggest a follow-up chart.
    -   For visualization requests, it returns a structured `JSON` object that defines the chart's type and data.
4.  **Dynamic Rendering**: The React frontend parses the response and dynamically updates the UI. Text is rendered in the chat panel, and if a chart is generated, it's displayed in the dedicated visualization panel.
