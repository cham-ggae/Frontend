import { authenticatedApiClient } from '@/lib/api/axios';
import { Chatting } from '@/types/chat';

export const getChatting = async (params: string): Promise<Chatting[]> => {
  const { data } = await authenticatedApiClient.get("/chat/history", {
    params: {
      sessionId: params
    }
  })
  return data;
}

export const storeChatting = async (params: string): Promise<string> => {
  const { data } = await authenticatedApiClient.post("/chat", params);
  return data;
}
