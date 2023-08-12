import { APP_NAME } from "config";
import React, { useEffect, useState } from "react";

interface SmallScreenProps {
    children: React.ReactNode;
}

interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

const SmallScreen: React.FC<SmallScreenProps> = ({ children }) => {
    const size = useWindowSize();

    if (!size) return null;

    if (size.width! < 770) {
        return (
            <div className="h-screen w-screen items-center justify-center flex">
                <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex-shrink-0 flex justify-center">
                        <a href="/" className="inline-flex">
                            <span className="sr-only">{APP_NAME}</span>
                            <img
                                className="h-16 w-auto rounded"
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt="Logo"
                            />
                        </a>
                    </div>
                    <div className="py-16">
                        <div className="text-center">
                            <h1 className="mt-2 text-4xl font-extrabold th-color-for tracking-tight">
                                Please use a larger screen.
                            </h1>
                            <p className="mt-2 text-base th-color-for">
                                Sorry, this page is not yet optimized for mobile.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return <>{children}</>;
};

export default SmallScreen;
