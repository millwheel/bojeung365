import AuthBox from "@/component/authbox";
import {Toaster} from "react-hot-toast";

export default function LeftNavigationBar() {
    return (
        <div className="bg-[#212121]">
            <ul className="space-y-5">
                <li>
                    <Toaster position="top-center" reverseOrder={false} />
                    <AuthBox />
                </li>
            </ul>
        </div>
    );
}