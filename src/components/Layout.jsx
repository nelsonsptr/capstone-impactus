import {Header} from "./Header";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <>
            <Header />
            <main className="container mx-auto p-5">
                <Outlet />
            </main>
        </>
    )
}