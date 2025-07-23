import { FaCubes, FaLightbulb, FaRocket } from "react-icons/fa";

const SnapTaskerFeatures = () => {
    return (
        <div className="relative bg-base-100 px-6 md:px-16 py-16 overflow-hidden">
            {/* Background decorations using themed colors */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-20 rounded-full hidden md:block"></div>
            <div className="absolute bottom-10 left-72 w-6 h-6 bg-primary opacity-20 rounded-full hidden lg:block"></div>
            <div className="absolute bottom-8 left-96 w-10 h-10 bg-primary opacity-20 rounded-full hidden lg:block"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-br-full hidden lg:block"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
                {/* Left side */}
                <div className="flex-1">
                    <h2 className="text-5xl font-bold text-base-content mb-4">Our Core Values</h2>
                    <p className="text-base-content opacity-80 text-xl max-w-md">
                        At Snaptask, our values define how we connect people. We prioritize trust, efficiency, and creative collaboration to make task outsourcing simple and successful—for everyone.
                    </p>
                </div>

                {/* Right side cards */}
                <div className="flex-1 space-y-6">
                    <ValueCard
                        icon={<FaCubes size={28} className="text-primary" />}
                        title="Trust & Reliability"
                        description="Snaptask ensures every connection is built on transparency, accountability, and mutual respect."
                    />
                    <ValueCard
                        icon={<FaRocket size={28} className="text-primary" />}
                        title="Efficiency First"
                        description="We’re focused on speed and simplicity, helping users find the right freelancer or task without delays."
                    />
                    <ValueCard
                        icon={<FaLightbulb size={28} className="text-primary" />}
                        title="Smart Solutions"
                        description="By combining technology and creativity, we help users solve problems and complete tasks more effectively."
                    />
                </div>
            </div>
        </div>
    );

};

const ValueCard = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 border-2 border-primary rounded-2xl p-5 bg-base-100 shadow-[4px_6px_0px_rgba(110,17,176,0.4)]">
        <div>{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-base-content">{title}</h3>
            <p className="text-sm text-base-content opacity-80">{description}</p>
        </div>
    </div>
);

export default SnapTaskerFeatures;
