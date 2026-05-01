// 'use client';

// // import { encryptWithPublicKey } from '@/lib/crypto'
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Toaster, toast } from 'sonner';
// import { X } from 'lucide-react';

// const LOGIN_ENDPOINT = "http://localhost:8088/api/v1/auth/authenticate";
// // const BACKEND_URL = "http://localhost:8088/api/v1";

// const LockedAccountError = () => (
//     <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
//         <div className="flex">
//             <div className="flex-shrink-0">
//                 <X className="h-5 w-5 text-red-500" />
//             </div>
//             <div className="ml-3">
//                 <p className="text-sm text-red-700">
//                     Your account has been locked. Please contact support at
//                     <a href="mailto:support@manuo.com" className="font-medium text-red-700 underline ml-1">
//                         support@manuo.com
//                     </a>
//                 </p>
//             </div>
//         </div>
//     </div>
// );

// /**
//  * LoginPage Component
//  * 
//  * Handles user authentication with email, password, and OTP verification.
//  * 
//  * @component
//  * @example
//  * return <LoginPage />
//  * 
//  * @description
//  * This component provides:
//  * - Email-based authentication with domain suffix
//  * - Password and OTP verification
//  * - Form validation and error handling
//  * - Loading state during submission
//  * - Success/error feedback via toast notifications
//  * - Automatic redirection upon successful login
//  * - Remember me functionality
//  * - Password recovery link
//  * 
//  * @state {string} username - User's email prefix (before @domain)
//  * @state {string} password - User's password
//  * @state {string} otp - One-time password for 2FA
//  * @state {string} error - Error message to display
//  * @state {boolean} isLoading - Loading state during submission
//  * 
//  * @hooks
//  * - useRouter: For programmatic navigation
//  * - useState: For managing component state
//  * 
//  * @dependencies
//  * - axios: For HTTP requests
//  * - sonner: For toast notifications
//  * - UI components: Button, Input
//  */
// function LoginPage() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState<string>('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const domain = '@manuo.com';

//     const router = useRouter();

//     /**
//      * Handles form submission for login
//      * 
//      * @async
//      * @param {React.FormEvent} e - Form submission event
//      * 
//      * @description
//      * - Prevents default form submission
//      * - Sets loading state
//      * - Constructs full email with domain
//      * - Makes authenticated POST request to login endpoint
//      * - Stores JWT token in sessionStorage on success
//      * - Shows toast notification based on result
//      * - Redirects to profile page on success
//      * - Handles and displays errors appropriately
//      */
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             // const { data: { publicKey } } = await axios.get(`${BACKEND_URL}/key/generate/public`);

//             // const encryptedPassword = await encryptWithPublicKey(publicKey, password);

//             const response = await axios.post(
//                 LOGIN_ENDPOINT,
//                 {
//                     email: `${username}${domain}`,
//                     password: password,
//                     otp: otp
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             const data = response.data;

//             if (response.status === 200) {
//                 sessionStorage.setItem('token', data.token);
//                 toast.success('Login successful!');
//                 router.push('/home/profile');
//             } else {
//                 setError(data.message || 'Login failed. Please check your credentials.');
//                 toast.error('Login failed');
//             }
//         } catch (error: any) {
//             if (error.response) {
//                 // if (error.response.status === 403 &&
//                 //     error.response.data?.message?.includes("locked")) {
//                 //     toast.error("Your account is locked. Please contact support.");
//                 if (error.response.status === 401) {
//                     toast.warning("Your account is locked. Please contact support. admin@manuo.com");
//                 } else {
//                     toast.error(error.response.data?.message ||
//                         "Registration failed. Please try again.");
//                 }
//             } else if (error.request) {
//                 toast.error("Network error. Please check your connection.");
//             } else {
//                 toast.error("Registration error. Please try again.");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <Toaster position="top-center" />
//             <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//                 <div className="text-center">
//                     <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//                 </div>

//                 {error && (
//                     <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
//                         {error}
//                     </div>
//                 )}

//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
//                     <div className="rounded-md shadow-sm space-y-4">
//                         <div>
//                             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                                 Username
//                             </label>
//                             <div className="mt-1 relative rounded-md shadow-sm">
//                                 <Input
//                                     id="username"
//                                     name="username"
//                                     type="text"
//                                     required
//                                     className="block w-full pr-10"
//                                     placeholder="yourname"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value.replace(/@.*$/, ''))}
//                                     aria-describedby="email-description"
//                                 />
//                                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                                     <span className="text-gray-500 sm:text-sm">{domain}</span>
//                                 </div>
//                             </div>
//                             <p id="email-description" className="mt-1 text-xs text-gray-500">
//                                 Your full email will be: {username}{domain}
//                             </p>
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <div className="mt-1">
//                                 <Input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     autoComplete="current-password"
//                                     required
//                                     className="block w-full"
//                                     placeholder="••••••••"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                                 OTP Code
//                             </label>
//                             <div className="mt-1">
//                                 <Input
//                                     id="otp"
//                                     name="otp"
//                                     type="text"
//                                     inputMode="numeric"
//                                     pattern="[0-9]*"
//                                     autoComplete="one-time-code"
//                                     required
//                                     className="block w-full"
//                                     placeholder="123456"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <input
//                                 id="remember-me"
//                                 name="remember-me"
//                                 type="checkbox"
//                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                             />
//                             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                                 Remember me
//                             </label>
//                         </div>

//                         <div className="text-sm">
//                             <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
//                                 Forgot your password?
//                             </a>
//                         </div>
//                     </div>

//                     <div>
//                         <Button
//                             type="submit"
//                             className="w-full flex justify-center"
//                             disabled={isLoading}
//                             aria-busy={isLoading}
//                         >
//                             {isLoading ? (
//                                 <span className="flex items-center">
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Signing in...
//                                 </span>
//                             ) : (
//                                 'Sign in'
//                             )}
//                         </Button>
//                     </div>
//                 </form>

//                 {error === 'locked' && <LockedAccountError />}

//                 <div className="text-center text-sm text-gray-500">
//                     <p>© {new Date().getFullYear()} Kryosette. All rights reserved.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;