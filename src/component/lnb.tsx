import AuthBox from "@/component/authbox";

export default function LeftNavigationBar() {
    return (
        <div className="bg-[#212121]">
            <ul className="space-y-5">
                <li>
                    <AuthBox />
                </li>
            </ul>
        </div>
    );
}