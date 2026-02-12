import React from 'react';
import transitionBg from '../assets/images/transition-bg.jpg';

const Transition = () => {
    return (
        <div className="relative h-[40vh] w-full overflow-hidden z-20">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${transitionBg})` }}
            />
            {/* Overlay to blend top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-dark-950" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/10 to-transparent mix-blend-overlay" />
        </div>
    );
};

export default Transition;
