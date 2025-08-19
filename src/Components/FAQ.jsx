const FAQ = () => {
    const faqs = [
        {
            q: "How does SnapTask work?",
            a: "Simply post a task, receive bids from freelancers, and choose the right person for the job. Everything from communication to payment is handled securely in one place.",
        },
        {
            q: "Is SnapTask free to use?",
            a: "Yes! Posting tasks is free. Freelancers may pay a small service fee when they complete jobs successfully.",
        },
        {
            q: "Can I use SnapTask on mobile?",
            a: "Absolutely. SnapTask is fully responsive and works seamlessly on any device—desktop, tablet, or smartphone.",
        },
        {
            q: "How do freelancers get paid?",
            a: "Payments are securely processed through our platform. Freelancers receive funds once tasks are marked complete by the client.",
        },
    ];

    return (
        <div className="w-full bg-base-100 py-16 px-5 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

                {/* Left Side (Title + Description) */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-base-content mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-base-content/80">
                        Got questions? We’ve got answers. Here are some of the most common
                        questions about how SnapTask works for both clients and freelancers.
                    </p>
                </div>

                {/* Right Side (FAQ List) */}
                <div className="flex-1 space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group border border-base-300 rounded-lg p-4"
                        >
                            <summary className="cursor-pointer font-semibold text-base-content text-lg flex justify-between items-center">
                                {faq.q}
                                <span className="transition-transform group-open:rotate-180">⌄</span>
                            </summary>
                            <p className="mt-2 text-base-content/80">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;