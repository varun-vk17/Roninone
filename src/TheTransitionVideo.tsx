import LazyVideo from './LazyVideo';

export default function TheTransitionVideo() {
    return (
        <section className="w-full py-32 md:py-44 px-4 md:px-6 relative z-10 flex flex-col items-center">
            <div className="w-full max-w-[800px] mx-auto rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] relative bg-black">
                <LazyVideo
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-[3/1] object-cover mix-blend-screen"
                />
            </div>
        </section>
    );
}

