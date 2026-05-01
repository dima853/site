// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useAuth } from '../auth-provider';
// import { toast } from 'sonner';
// import { createNewChat, fetchChats } from './use_create_chat';

// export const useChats = () => {
//     // @ts-ignore
//     const { token } = useAuth();
//     const queryClient = useQueryClient();

//     const chatsQuery = useQuery({
//         queryKey: ['chats'],
//         queryFn: () => fetchChats(token),
//         meta: {
//             onError: (error: Error) => {
//                 toast.error('Failed to load chats');
//                 console.error('Error fetching chats:', error);
//             }
//         }
//     });

//     const createChatMutation = useMutation({
//         mutationFn: (name: string) => createNewChat(name, token),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['chats'] });
//             toast.success('Chat created successfully');
//         },
//         onError: (error: Error) => {
//             toast.error('Failed to create chat');
//             console.error('Error creating chat:', error);
//         }
//     });

//     return {
//         chats: chatsQuery.data,
//         isLoading: chatsQuery.isLoading,
//         error: chatsQuery.error,
//         createChat: createChatMutation.mutateAsync,
//         isCreating: createChatMutation.isPending
//     };
// };
