import AuthBox from "@/component/authbox";
import {Toaster} from "react-hot-toast";
import TelegramLink from "@/component/telegram";
import LnbNoticeBoard from "@/component/lnbNoticeBoard";

export default function LeftNavigationBar() {
    return (
        <aside className="md:col-span-1 pl-2 py-2 pr-1">
            <Toaster position="top-center" reverseOrder={false} />
            <ul className="space-y-3">
                <li>
                    <AuthBox />
                </li>
                <li>
                    <TelegramLink />
                </li>
                <li>
                    <LnbNoticeBoard />
                </li>
            </ul>
        </aside>
    );
}