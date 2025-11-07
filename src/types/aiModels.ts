export interface AgentModel {
  agent: string;
  model: string;
  displayName: string;
}

export const availableModels = [
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
  { value: "anthropic/claude-3-opus", label: "Claude 3 Opus" },
  { value: "openai/gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "openai/gpt-4o", label: "GPT-4o" },
  { value: "google/gemini-pro-1.5", label: "Gemini Pro 1.5" },
  { value: "meta-llama/llama-3.1-70b-instruct", label: "Llama 3.1 70B" },
  { value: "mistralai/mistral-large", label: "Mistral Large" },
];

export const defaultAgentModels: Record<string, string> = {
  pm: "anthropic/claude-3.5-sonnet",
  difesa: "anthropic/claude-3.5-sonnet",
  giudice: "openai/gpt-4o",
  perito: "google/gemini-pro-1.5",
  testimone: "openai/gpt-4-turbo",
};
