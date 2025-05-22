import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { MdContactMail } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-[#E5E4E2] text-[#4B0082] p-10">
                <aside>
                    <img className="w-30 " src="/assets/fav.png" alt="" />
                    <p>
                        Post It. Bid It. Done Fast.
                    </p>
                </aside>

                <aside>
                    <MdContactMail size={25} />
                    <p>
                        For any queries, please Mail us at :
                        <Link to="mailto:md134habu@gmail.com" target="_blank"> Mail</Link>

                    </p>
                    <Link className="flex items-center gap-2">
                        <IoAlertCircle size={18} />
                        Terms & Conditions
                    </Link>
                </aside>

                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <Link to={'https://x.com/xihad_xihad'} target="_blank">
                            <FaTwitter size={30} />
                        </Link>
                        <Link to={'https://www.youtube.com/@xihadxone'} target="_blank">
                            <FaYoutube size={30} />
                        </Link>
                        <Link to={'https://www.facebook.com/habiburrahmanzihad.zihad'} target="_blank">
                            <FaFacebook size={30} />
                        </Link>


                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
