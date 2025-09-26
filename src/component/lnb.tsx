import Login from "@/component/login";

export default function LeftNavigationBar() {
    return (
        <div className="bg-[#212121]">
            <ul className="space-y-5">
                <li>
                    <Login />
                </li>
                <li>
                    lnb2
                </li>
            </ul>
        </div>
    );
}