import { create } from "zustand";

type Chatbot = {
    isLoading: boolean;
    setLoading: (params: boolean) => void;
    chatAnswer: string;
    setChatAnswer: (params: string) => void;
}

export const useChatbotStore = create<Chatbot>((set) => ({
    isLoading: false,
    setLoading: (params: boolean) => {
        set({ isLoading: params })
    },
    chatAnswer: "",
    setChatAnswer: (params: string) => {
        set({ chatAnswer: params })
    }
}))

export const selectIsLoading = (state: {isLoading: boolean}) => state.isLoading
export const selectSetLoading = (state: {setLoading: () => void}) => state.setLoading
export const selectChatAnswer = (state: {chatAnswer: string}) => state.chatAnswer
export const selectSetChatAnswer = (state: {setChatAnswer: () => void}) => state.setChatAnswer