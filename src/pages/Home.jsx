import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Process from '../sections/Process';
import Showcase from '../sections/Showcase';

import VideoLoop from '../sections/VideoLoop';
import Contact from '../sections/Contact';
import PageTransition from '../components/PageTransition';

const Home = () => {
    return (
        <PageTransition>
            <Hero />
            <Showcase />
            <VideoLoop />
            <Services />

            <Process />
            <Contact />
        </PageTransition>
    );
};

export default Home;
