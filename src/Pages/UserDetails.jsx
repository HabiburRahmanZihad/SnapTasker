import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';
import { MdEmail, MdLogout } from 'react-icons/md';
import Loading from '../Components/Loading';

const UserDetails = () => {
    const { user, signOutUser } = useContext(AuthContext);

    if (!user) {
        return <Loading />;
    }

    const photoURL =
        user.photoURL ||
        user.providerData?.[0]?.photoURL ||
        'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-4 py-10">
            <div className="w-full max-w-md bg-base-100/60 backdrop-blur-xl border border-primary/30 rounded-3xl shadow-2xl p-10 text-center space-y-8 relative overflow-hidden transition-all duration-300 hover:shadow-primary/40">

                {/* Background glow effect */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-2xl z-0"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-2xl z-0"></div>

                {/* Avatar */}
                <div className="relative z-10 flex justify-center">
                    <img
                        src={photoURL}
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-4 border-primary shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp';
                        }}
                    />
                </div>

                {/* User info */}
                <div className="relative z-10">
                    <h2 className="text-4xl font-extrabold text-primary font-rancho tracking-wide">
                        Hello, {user.displayName || 'Beluga'} 👋
                    </h2>
                    <p className="text-lg text-base-content mt-2 flex items-center justify-center gap-2">
                        <MdEmail className="text-primary" size={20} />
                        {user.email}
                    </p>
                </div>

                {/* Logout Button */}
                <div className="relative z-10">
                    <button
                        onClick={signOutUser}
                        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-error to-error-content hover:from-error-content hover:to-error rounded-full shadow-md transition-all duration-300"
                    >
                        <MdLogout size={22} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;