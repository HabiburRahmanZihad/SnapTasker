import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Team = () => {
    const teamMembers = [
        {
            name: "Habibur Rahman Zihad",
            role: "Founder & CEO",
            image: "https://i.ibb.co/7xY4NYdf/Whats-App-Image-2025-06-09-at-13-14-46-80573a92.jpg",
            linkedin: "https://www.linkedin.com/in/habiburrahmanzihad/",
            github: "https://github.com/HabiburRahmanZihad",
        },
        {
            name: "Rrohit Ahemed",
            role: "CTO & Full Stack Engineer",
            image: "https://i.ibb.co/KjTSPwGY/Rohitahemed-1.jpg",
            linkedin: "https://linkedin.com/in/",
            github: "https://github.com/",
        },
        {
            name: "Saimon Uddin Imam",
            role: "Lead UI/UX Designer",
            image: "https://i.ibb.co/bRMrj8zq/Saimon-1.jpg",
            linkedin: "https://linkedin.com/in/",
            github: "https://github.com/",
        }
    ];

    return (
        <div className="relative bg-base-100 px-6 md:px-16 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-5xl font-bold text-base-content mb-4">Meet the Team</h2>
                <p className="text-xl text-base-content opacity-80 max-w-2xl mx-auto">
                    A passionate group of builders, designers, and connectors making freelance tasks faster and smarter.
                </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, idx) => (
                    <div
                        key={idx}
                        className="bg-base-100 border-2 border-primary rounded-2xl p-5 shadow-[4px_6px_0px_rgba(110,17,176,0.4)] text-center"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-28 h-28 mx-auto rounded-full object-cover mb-4 shadow-md"
                        />
                        <h3 className="text-lg font-bold text-base-content">{member.name}</h3>
                        <p className="text-sm text-base-content opacity-80 mb-3">{member.role}</p>
                        <div className="flex justify-center gap-4">
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-focus"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-focus"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Team;