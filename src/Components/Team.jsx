const Team = () => {
    const teamMembers = [
        {
            name: "Habibur Rahman Zihad",
            role: "Founder & CEO",
            image: "https://i.ibb.co/7xY4NYdf/Whats-App-Image-2025-06-09-at-13-14-46-80573a92.jpg",
            linkedin: "https://linkedin.com/in/",
            github: "https://github.com/",
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
        <div className="relative bg-white px-6 md:px-16 py-20 overflow-hidden">

            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-5xl font-bold text-black mb-4">Meet the Team</h2>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    A passionate group of builders, designers, and connectors making freelance tasks faster and smarter.
                </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, idx) => (
                    <div
                        key={idx}
                        className="bg-white border-2 border-purple-800 rounded-2xl p-5 shadow-[4px_6px_0px_rgba(128,0,128,0.4)] text-center"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-28 h-28 mx-auto rounded-full object-cover mb-4 shadow-md"
                        />
                        <h3 className="text-lg font-bold">{member.name}</h3>
                        <p className="text-sm text-gray-700 mb-3">{member.role}</p>
                        <div className="flex justify-center gap-4">
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-800 hover:text-purple-600"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                >
                                    <path d="M20.45 20.45h-3.554v-5.384c0-1.283-.024-2.935-1.788-2.935-1.79 0-2.063 1.4-2.063 2.845v5.474h-3.556V9h3.414v1.561h.05c.476-.9 1.635-1.85 3.362-1.85 3.596 0 4.259 2.366 4.259 5.445v6.294zM5.337 7.433a2.065 2.065 0 1 1 0-4.129 2.065 2.065 0 0 1 0 4.129zm1.78 13.017H3.56V9h3.557v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.206 24 24 23.226 24 22.271V1.729C24 .774 23.206 0 22.225 0z" />
                                </svg>
                            </a>
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-800 hover:text-purple-600"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.5-4-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 2.2.5 2.2.5.3-.9 1-.9 1.2-.9 1.6-.2 3.3-.8 3.3-4.1 0-.9-.3-1.6-.9-2.2.1-.2.4-1 .1-2.2 0 0-.8-.2-2.5 1 .7-.2 2.3-.4 2.3-2.5 0-1.2-.4-1.9-1.1-2.5.1-.2.5-1.1-.1-2.2 0 0-.9-.3-2.9 1 .2-.1.7-.3.7-1.3 0-.7-.3-1.2-.7-1.5.4-.1 1.4-.2 2.8 1.1 1.3-1.1 3.3-1.1 4.6 0 1.4-1.3 2.4-1.2 2.8-1.1-.4.3-.7.8-.7 1.5 0 1 .5 1.2.7 1.3-2 .3-2.9 1-2.9 1s-.3.8-.1 2.2c-.6.6-.9 1.3-.9 2.2 0 3.3 1.6 3.9 3.3 4.1.3 0 .9 0 1.2.9 0 0 1.2-.4 2.2-.5 0 0 .6-1 .7-1.1 0 0 .8.2.1.7 0 0-.7.3-1.2 1.5 0 0-.7 2.2-4 1.5v2.1c0 .3.2.7.8.6 4.9-1.6 8.3-6.1 8.3-11.4C24 5.9 18.6.5 12 .5z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;