import { get, set } from 'idb-keyval';

/**
 * A custom React hook for tracking post views using IndexedDB storage.
 * Prevents duplicate view recordings by caching viewed post IDs client-side.
 * 
 * @module usePostViews
 * @param {function} handleRecordView - Async function that handles the actual view recording (e.g., API call to backend)
 * @returns {object} An object containing the `recordView` function
 * 
 * @example
 * // Usage in a component:
 * const { recordView } = usePostViews(async (postId) => {
 *   await fetch('/api/record-view', {
 *     method: 'POST',
 *     body: JSON.stringify({ postId })
 *   });
 * });
 * 
 * <div onViewportEnter={() => recordView(post.id)} />
 * 
 * @description
 * This hook uses IndexedDB via the 'idb-keyval' library for persistent client-side storage:
 * - Stores viewed post IDs in a Set under the 'viewedPosts' key
 * - Automatically checks for existing views before making network requests
 * - Survives page refreshes and browser restarts (unlike sessionStorage)
 * 
 * @see {@link https://github.com/jakearchibald/idb-keyval} for idb-keyval documentation
 */
const usePostViews = (handleRecordView: (postId: number) => Promise<void>) => {
    /**
     * Records a view for a post if it hasn't been viewed before.
     * 
     * @function recordView
     * @async
     * @param {string} postId - Unique identifier of the post being viewed
     * @returns {Promise<void>}
     * 
     * @example
     * await recordView('post-123');
     * 
     * @description
     * Operation flow:
     * 1. Retrieves the Set of viewed posts from IndexedDB
     * 2. If the post ID doesn't exist in the Set:
     *    a. Calls the provided handleRecordView function
     *    b. Adds the ID to the Set
     *    c. Persists the updated Set back to IndexedDB
     */
    const recordView = async (postId: number) => {
        // Retrieve viewed posts from IndexedDB or initialize new Set
        const viewedPosts = (await get('viewedPosts')) || new Set<string>();

        if (!viewedPosts.has(postId)) {
            // Execute the provided recording function (typically an API call)
            await handleRecordView(postId);

            // Update client-side storage
            viewedPosts.add(postId);
            await set('viewedPosts', viewedPosts);
        }
    };

    return { recordView };
};

export default usePostViews;