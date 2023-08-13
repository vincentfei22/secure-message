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
    // Initial state for window size
    const initialState: WindowSize = {
        width: undefined,
        height: undefined,
    };

    const [windowSize, setWindowSize] = useState<WindowSize>(initialState);

    useEffect(() => {
        // Handle window resize
        const handleResize = () => {
            const newSize: WindowSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            setWindowSize(newSize);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

const SmallScreen: React.FC<SmallScreenProps> = ({ children }) => {
    // Get window size
    const size = useWindowSize();

    // Return null if size is not defined
    if (!size) return null;

    // Check for small screen
    const isSmallScreen = size.width! < 770;

    if (isSmallScreen) {
        const logoSrc = `${process.env.PUBLIC_URL}/logo.png`;
        const logoAlt = "Logo";

        return (
            <div className="h-screen w-screen items-center justify-center flex">
                <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex-shrink-0 flex justify-center">
                        <a href="/" className="inline-flex">
                            <span className="sr-only">{APP_NAME}</span>
                            <img
                                className="h-16 w-auto rounded"
                                src={logoSrc}
                                alt={logoAlt}
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
