// 'use client';

// import { useAuth } from '@/lib/auth-provider';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { toast } from 'sonner';

// const API_URL = 'http://localhost:8088/api/v1';

// interface FriendRequestDTO {
//     id: number;
//     senderId: number;
//     senderUsername: string;
//     receiverId: number;
//     receiverUsername: string;
//     status: string;
//     createdAt: string;
// }

// export const useFriendRequests = () => {
//     const { token, user } = useAuth();
//     const queryClient = useQueryClient();

//     // Получение списка входящих заявок в друзья
//     const {
//         data: incomingRequests = [],
//         isLoading: isIncomingLoading,
//         error: incomingError,
//         refetch: refetchIncoming,
//     } = useQuery<FriendRequestDTO[]>({
//         queryKey: ['friendRequests', 'incoming'],
//         queryFn: async () => {
//             const res = await axios.get(`${API_URL}/friends/requests/incoming`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             return res.data;
//         },
//         enabled: !!token,
//     });

//     // Получение списка исходящих заявок в друзья
//     const {
//         data: outgoingRequests = [],
//         isLoading: isOutgoingLoading,
//         error: outgoingError,
//         refetch: refetchOutgoing,
//     } = useQuery<FriendRequestDTO[]>({
//         queryKey: ['friendRequests', 'outgoing'],
//         queryFn: async () => {
//             const res = await axios.get(`${API_URL}/friends/requests/outgoing`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             return res.data;
//         },
//         enabled: !!token,
//     });

//     // Отправка заявки в друзья
//     const { mutate: sendRequest, isPending: isSending } = useMutation({
//         mutationFn: async (receiverId: number) => {
//             const res = await axios.post(
//                 `${API_URL}/friends/request/${receiverId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             return res.data;
//         },
//         onSuccess: () => {
//             toast.success('Заявка отправлена');
//             queryClient.invalidateQueries({ queryKey: ['friendRequests', 'outgoing'] });
//         },
//         onError: (error) => {
//             toast.error('Ошибка при отправке заявки');
//             console.error('Send friend request error:', error);
//         }
//     });

//     // Принятие заявки в друзья
//     const { mutate: acceptRequest, isPending: isAccepting } = useMutation({
//         mutationFn: async (requestId: number) => {
//             const res = await axios.post(
//                 `${API_URL}/friends/accept/${requestId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             return res.data;
//         },
//         onSuccess: () => {
//             toast.success('Заявка принята');
//             queryClient.invalidateQueries({ queryKey: ['friendRequests', 'incoming'] });
//             queryClient.invalidateQueries({ queryKey: ['friends'] });
//         },
//         onError: (error) => {
//             toast.error('Ошибка при принятии заявки');
//             console.error('Accept friend request error:', error);
//         }
//     });

//     // Отклонение заявки в друзья
//     const { mutate: rejectRequest, isPending: isRejecting } = useMutation({
//         mutationFn: async (requestId: number) => {
//             const res = await axios.post(
//                 `${API_URL}/friends/reject/${requestId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             return res.data;
//         },
//         onSuccess: () => {
//             toast.success('Заявка отклонена');
//             queryClient.invalidateQueries({ queryKey: ['friendRequests', 'incoming'] });
//         },
//         onError: (error) => {
//             toast.error('Ошибка при отклонении заявки');
//             console.error('Reject friend request error:', error);
//         }
//     });

//     // Отмена исходящей заявки
//     const { mutate: cancelRequest, isPending: isCanceling } = useMutation({
//         mutationFn: async (requestId: number) => {
//             const res = await axios.post(
//                 `${API_URL}/friends/cancel/${requestId}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             return res.data;
//         },
//         onSuccess: () => {
//             toast.success('Заявка отменена');
//             queryClient.invalidateQueries({ queryKey: ['friendRequests', 'outgoing'] });
//         },
//         onError: (error) => {
//             toast.error('Ошибка при отмене заявки');
//             console.error('Cancel friend request error:', error);
//         }
//     });

//     return {
//         // Данные
//         incomingRequests,
//         outgoingRequests,

//         // Состояния загрузки
//         isIncomingLoading,
//         isOutgoingLoading,
//         isSending,
//         isAccepting,
//         isRejecting,
//         isCanceling,

//         // Ошибки
//         incomingError,
//         outgoingError,

//         // Методы
//         sendRequest,
//         acceptRequest,
//         rejectRequest,
//         cancelRequest,

//         // Обновление данных
//         refetchIncoming,
//         refetchOutgoing,

//         // Текущий пользователь
//         currentUserId: user?.id
//     };
// };
