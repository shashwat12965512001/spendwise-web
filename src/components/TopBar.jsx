export default function TopBar() {
    return (
        <>
            <div className={`w-full bg-white border-b shadow px-4 py-5`}>
                <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                    <h1 className={`text-xl font-semibold text-gray-900`}>
                        <img className="w-50" src={`/assets/img/app_logo_dark.png`} alt="Spendwise" />
                    </h1>
                </div>
            </div>
        </>
    );
}
