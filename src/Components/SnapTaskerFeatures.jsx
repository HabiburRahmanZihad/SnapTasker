import { FaCubes, FaLightbulb, FaRocket } from "react-icons/fa";

const SnapTaskerFeatures = () => {
    return (
        <div className="relative bg-white px-6 md:px-16 py-16 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-800 rounded-full opacity-50 hidden md:block"></div>
            <div className="absolute bottom-10 left-72 w-6 h-6 bg-purple-800 rounded-full opacity-50 hidden lg:block"></div>
            <div className="absolute bottom-8 left-96 w-10 h-10 bg-purple-800 rounded-full opacity-50 hidden lg:block"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-br-full opacity-50 hidden lg:block"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">

                {/* Left side */}
                <div className="flex-1">
                    <h2 className="text-5xl font-bold text-black mb-4">Our Core Values</h2>
                    <p className="text-gray-700 text-xl max-w-md">
                        At Snaptask, our values define how we connect people. We prioritize trust, efficiency, and creative collaboration to make task outsourcing simple and successful—for everyone.
                    </p>
                </div>

                {/* Right side cards */}
                <div className="flex-1 space-y-6">
                    <ValueCard
                        icon={<FaCubes size={28} className="text-purple-800" />}
                        title="Trust & Reliability"
                        description="Snaptask ensures every connection is built on transparency, accountability, and mutual respect."
                    />
                    <ValueCard
                        icon={<FaRocket size={28} className="text-purple-800" />}
                        title="Efficiency First"
                        description="We’re focused on speed and simplicity, helping users find the right freelancer or task without delays."
                    />
                    <ValueCard
                        icon={<FaLightbulb size={28} className="text-purple-800" />}
                        title="Smart Solutions"
                        description="By combining technology and creativity, we help users solve problems and complete tasks more effectively."
                    />
                </div>
            </div>
        </div>
    );
};

const ValueCard = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 border-2 border-purple-800 rounded-2xl p-5 bg-white shadow-[4px_6px_0px_rgba(128,0,128,0.4)]">
        <div>{icon}</div>
        <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
        </div>
    </div>
);

export default SnapTaskerFeatures;
