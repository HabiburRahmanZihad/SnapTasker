import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const UserDetails = () => {
    const { user, signOutUser } = useContext(AuthContext);

    if (!user) return <div className='flex justify-center items-center h-screen'>
        <progress className="progress w-56"></progress>
    </div>;

    // Try to find a valid photo URL
    const photoURL =
        user.photoURL ||
        (user.providerData && user.providerData[0]?.photoURL) ||
        'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-base-200">
            <div className="card w-[400px] bg-white shadow-xl border-2 border-[#4B0082]">
                <div className="card-body items-center text-center">
                    <img
                        src={photoURL}
                        alt="Beluga"
                        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#4B0082] p-2"
                        onError={(e) => {
                            // Handle broken image URLs
                            e.target.onerror = null;
                            e.target.src = 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';
                        }}
                    />

                    <h2 className="card-title text-[#4B0082] text-2xl">Name: {user.displayName || 'Beluga'}</h2>
                    <p className="text-gray-600 text-2xl">Email: {user.email}</p>
                    <div className="card-actions mt-4">
                        <button className="btn btn-error text-xl" onClick={signOutUser}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
