// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import { useAuth } from '@/lib/auth-provider';

// type OcrResponse = {
//     text: string;
//     processingTime: number;
// };

// export const useOcrConverter = () => {
//     const { token } = useAuth();
//     return useMutation<OcrResponse, Error, File>({
//         mutationFn: async (file) => {
//             const formData = new FormData();
//             formData.append('image', file);

//             const { data } = await axios.post('http://localhost:8088/api/v1/ocr/convert', formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             return {
//                 text: data,
//                 processingTime: performance.now(),
//             };
//         },
//         onError: (error) => {
//             console.error('OCR conversion failed:', error);
//         },
//     });
// };