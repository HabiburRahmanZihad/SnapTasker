import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const UserDetails = () => {
    const { user, signOutUser } = useContext(AuthContext);

    if (!user) {
        return (
            <div className='flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100'>
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    const photoURL =
        user.photoURL ||
        (user.providerData && user.providerData[0]?.photoURL) ||
        'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4 py-10">
            <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-purple-300 rounded-3xl shadow-2xl p-8 text-center space-y-6 transition duration-300 hover:shadow-purple-400/40">
                <div className="flex justify-center">
                    <img
                        src={photoURL}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-md object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';
                        }}
                    />
                </div>

                <h2 className="text-3xl font-semibold text-purple-800">Hi, {user.displayName || 'Beluga'} 👋</h2>
                <p className="text-lg text-gray-700">📧 {user.email}</p>

                <button
                    onClick={signOutUser}
                    className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-full shadow-lg overflow-hidden group hover:bg-red-700 transition-all"
                >
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                    <span className="relative z-10">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default UserDetails;