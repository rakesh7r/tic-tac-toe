import React from "react"

function Layout({ children }: { children: React.ReactNode }) {
    return <div className="bg-purple h-[100vh] text-white flex flex-row justify-center items-center">{children}</div>
}

export default Layout
