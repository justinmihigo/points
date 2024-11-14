import Navbar from '@/components/Navbar'
import React from 'react'

const About = () => {
    return (
        <div>
            <Navbar />
            <div className='flex flex-row justify-center items center'>
                <div className='flex flex-col gap-y-8'>
                    <h1 className='font-bold text-lg text-[2rem] text-secondary text-center'>About us</h1>
                    <p className='text-justify w-[80%] leading-relaxed m-auto'>
                        The co-creation between Fitbeat Concert and ApertaCura brings
                        together wellness and technology to inspire healthier lifestyles
                        across Kenya. As the lead innovation partner, ApertaCura, through
                        its wellness platform BimaFlow, integrates its four pillars— community,
                        activity, rewards, and wellness—into the Fitbeat experience.
                        <br/><br/>
                            This
                            collaboration expands user engagement, offering attendees
                            exciting ways to stay active, earn rewards, and connect with a
                            community focused on health. Together, Fitbeat and ApertaCura are
                            redefining wellness with a fun, data- driven approach that empowers
                            individuals to take charge of their health journey.

                    </p>

                </div>
            </div>
        </div>
    )
}

export default About