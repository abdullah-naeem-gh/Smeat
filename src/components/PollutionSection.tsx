import React from 'react'
import brushStrokeSvg from '../assets/brush-stroke-banner-7.svg?url'

const PollutionSection = () => {
    return (
        <section
            id="pollution-section"
            className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
        >
            <div className="relative z-20 w-full flex flex-col items-center justify-center gap-10 px-6">

                {/* Headline band: polluted text behind, paint stroke + clean text on top */}
                <div className="relative w-full flex items-center justify-center" style={{ height: '96px' }}>
                    {/* Polluted headline — sits behind stroke, same position; gets "covered" by clean message */}
                    <h2
                        className="absolute text-center font-semibold px-4 pointer-events-none"
                        style={{
                            left: '18vw',
                            width: '64vw',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: 'clamp(18px, 2.6vw, 34px)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.15,
                            color: '#000000',
                            textShadow: '0 0 1px rgba(255,255,255,0.95), 0 0 4px rgba(255,255,255,0.7), 0 0 8px rgba(255,255,255,0.4)',
                        }}
                    >
                        Our cities have been built on dirty air.
                    </h2>

                    {/* Paint stroke + clean headline — on top, reveals "cleaner" message */}
                    <div
                        id="pollution-stroke"
                        className="absolute flex items-center justify-center"
                        style={{
                            left: '18vw',
                            width: '64vw',
                            top: 0,
                            bottom: 0,
                            clipPath: 'inset(0 100% 0 0 round 8px)',
                        }}
                    >
                        {/* Rough brush stroke — SVG mask uses alpha so path shape is visible, not luminance */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: '#000000',
                                WebkitMaskImage: `url(${brushStrokeSvg})`,
                                maskImage: `url(${brushStrokeSvg})`,
                                WebkitMaskSize: 'cover',
                                maskSize: 'cover',
                                WebkitMaskPosition: 'center',
                                maskPosition: 'center',
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                                WebkitMaskMode: 'alpha',
                                maskMode: 'alpha',
                                boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
                            } as React.CSSProperties}
                        />
                        {/* Clean headline inside stroke */}
                        <h2
                            className="relative z-10 text-center text-white font-semibold px-4"
                            style={{
                                fontFamily: 'Manrope, sans-serif',
                                fontSize: 'clamp(18px, 2.6vw, 34px)',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.15,
                            }}
                        >
                            Clean air should be built into our cities.
                        </h2>
                    </div>
                </div>

                {/* Supporting paragraph */}
                <p
                    className="text-center text-black max-w-xl"
                    style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: 'clamp(14px, 1.25vw, 18px)',
                        lineHeight: 1.75,
                        fontWeight: 500,
                        textShadow: '0 0 1px rgba(255,255,255,0.95), 0 0 4px rgba(255,255,255,0.65), 0 0 10px rgba(255,255,255,0.45), 0 1px 2px rgba(0,0,0,0.08)',
                    }}
                >
                    SMEAT integrates air-purifying technology directly into concrete and coatings,
                    transforming passive infrastructure into active environmental protection.
                </p>

            </div>
        </section>
    )
}

export default PollutionSection
