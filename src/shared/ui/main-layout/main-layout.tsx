import { Flex } from "antd"
import type { ReactNode } from "react"

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Flex vertical style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <div
                style={{
                    width: "100%",
                    margin: "0 auto",
                    padding: "24px 0px",
                    flex: 1,
                }}
            >
                {children}
            </div>
        </Flex>
    )
}
