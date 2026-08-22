import { realClient } from "./client";
import { mockClient } from "./mockClient";

const useMock = import.meta.env.VITE_USE_MOCK_API !== "false";

export const api = useMock ? mockClient : realClient;

export * from "./client";
