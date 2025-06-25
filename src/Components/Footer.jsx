import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-[#E5E4E2] to-white text-[#4B0082] pt-20 pb-10 px-6 sm:px-10 lg:px-20 overflow-hidden">
            {/* Wave Decoration */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-full h-[100px]"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                >
                    <path
                        d="M0,0V46.29c47.67,22.58,103.92,29,158.58,17,70.3-15.48,136.3-57.61,207.84-59.17C461.7,1.42,518,41.79,580,57.16c70,17.51,140.84,0,210-24.32C875.33,7.85,943.4-7.34,1009,5.7c55.34,10.92,108,35.47,161,57.89V0Z"
                        opacity=".25"
                        className="fill-purple-800"
                    ></path>
                    <path
                        d="M0,0V15.81C65.71,35.33,149.28,64.9,236,68.57c89.63,3.82,175.53-26.71,263-45.11C586.57,2,679.34-4.23,763,8.74c95.58,15.29,177.23,53.58,266,67.15,61.68,9.58,123.07,6.87,171-6.73V0Z"
                        opacity=".5"
                        className="fill-purple-500"
                    ></path>
                    <path
                        d="M0,0V5.63C58.55,30.37,123.34,64.07,195,70.49c82,7.28,168.73-19.93,250-38.77C571.58,8.33,650.93-3.51,728,8.6c95,14.88,172.06,60.86,261,73.53,58.71,8.48,113.69,6.41,169-1.9V0Z"
                        className="fill-purple-300"
                    ></path>
                </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-gray-800">
                {/* Brand Info */}
                <div className="space-y-4">
                    <Link to='/'><img src="/assets/fav.png" alt="Snaptask Logo" className="w-24" /></Link>
                    <p className="font-semibold text-[#4B0082]">Post It. Bid It. Done Fast.</p>
                    <div className="flex gap-4 mt-2">
                        <a href="https://x.com/xihad_xihad" target="_blank" rel="noreferrer" className="hover:text-purple-600">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://www.youtube.com/@xihadxone" target="_blank" rel="noreferrer" className="hover:text-purple-600">
                            <FaYoutube size={20} />
                        </a>
                        <a href="https://www.facebook.com/habiburrahmanzihad.zihad" target="_blank" rel="noreferrer" className="hover:text-purple-600">
                            <FaFacebook size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-3 text-purple-800">Explore</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/addtask" className="hover:underline">Add Task</Link></li>
                        <li><Link to="/browseTasks" className="hover:underline">Browse Tasks</Link></li>
                        <li><Link to="/postedTasks" className="hover:underline">Posted Tasks</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold mb-3 text-purple-800">Contact</h3>
                    <div className="flex items-start gap-2">
                        <MdContactMail size={20} />
                        <a href="mailto:md134habu@gmail.com" className="underline text-sm">
                            md134habu@gmail.com
                        </a>
                    </div>
                    <Link to="/terms" className="flex items-center gap-2 mt-3 hover:underline">
                        <IoAlertCircle size={18} />
                        Terms & Conditions
                    </Link>
                </div>

                {/* Newsletter / CTA */}
                <div>
                    <h3 className="text-lg font-bold mb-3 text-purple-800">Stay Updated</h3>
                    <p className="text-sm text-gray-600">Get platform updates and tips in your inbox.</p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // Handle subscription logic here
                            Swal.fire({
                                title: 'Subscribed!',
                                text: 'Thank you for subscribing to our newsletter.',
                                icon: 'success',
                                confirmButtonText: 'OK',
                                customClass: {
                                    confirmButton: 'bg-purple-800 text-white hover:bg-purple-700 transition-all',
                                },
                            });
                        }}
                        className="mt-4 flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="p-2 rounded-l-md border border-purple-400 focus:outline-none focus:ring w-full"
                        />
                        <button type="submit" className="bg-purple-800 text-white px-4 rounded-r-md hover:bg-purple-700 transition-all">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
                © {new Date().getFullYear()} Snaptask. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;