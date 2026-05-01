import { toast } from 'sonner';
/**
 * Кастомный хук для работы с уведомлениями
 * @returns Объект с методами для показа тостов
 */
export const useToasts = () => {
    /**
     * Показывает успешное уведомление
     * @param message Текст сообщения
     * @param description Описание (опционально)
     */
    const success = (message: string, description?: string) => {
        toast.success(message, {
            description,
            duration: 5000,
        });
    };

    /**
     * Покажет ошибку
     * @param message Текст ошибки
     * @param description Описание (опционально)
     */
    const error = (message: string, description?: string) => {
        toast.error(message, {
            description,
            duration: 7000,
        });
    };

    /**
     * Покажет предупреждение
     * @param message Текст предупреждения
     * @param description Описание (опционально)
     */
    const warning = (message: string, description?: string) => {
        toast.warning(message, {
            description,
            duration: 6000,
        });
    };

    /**
     * Покажет информационное сообщение
     * @param message Текст сообщения
     * @param description Описание (опционально)
     */
    const info = (message: string, description?: string) => {
        toast.info(message, {
            description,
            duration: 4000,
        });
    };

    /**
     * Покажет загрузку с возможностью обновления
     * @param message Текст сообщения
     * @returns Объект с методами update и dismiss
     */
    const loading = (message: string) => {
        return toast.loading(message);
    };

    return {
        success,
        error,
        warning,
        info,
        loading,
        dismiss: toast.dismiss,
    };
};

// Типы можно вынести в отдельный файл src/types/index.ts
export type ToastType = 'success' | 'error' | 'warning' | 'info';