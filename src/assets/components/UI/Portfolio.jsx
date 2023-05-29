import React, { useState, useEffect } from 'react'
import data from '../../data/portfolioData'
import Modal from './Modal';

const Portfolio = () => {
    const [nextItems, setNextitems] = useState(3);
    const [portfolios, setPortfolios] = useState(data);
    const [selectTab, setSelectTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [activeID, setActiveID] = useState(null);

    const loadMoreHandler = () => {
        setNextitems(prev => prev + 3)
    }

    const showModalHandler = id => {
        setShowModal(true)
        setActiveID(id)
    }

    useEffect(() => {
        if (selectTab === 'all') {
            setPortfolios(data);
        }
        if (selectTab === 'full-stack') {
            const filteredData = data.filter(item => item.category === 'fullstack')
            setPortfolios(filteredData);
        }
        if (selectTab === 'front-end') {
            const filteredData = data.filter(item => item.category === 'frontend')
            setPortfolios(filteredData);
        }
    }, [selectTab])

    return (
        <section id='portfolio'>
            <div className='container'>
                {/* Title & Buttons */}
                <div className='flex items-center justify-between flex-wrap'>
                    <div className='mb-7 sm:mb-0'>
                        <h3 className='text-headingColor text-[2.5rem] font-[700]'>
                            Projects
                        </h3>
                    </div>

                    <div className='flex gap-4'>
                        <button onClick={() => setSelectTab('all')} className='bg-smallTextColor bg-black text-white font-[500] gap-2 hover:bg-smallTextColor
                    ease-in duration-100 py-2 px-4 rounded-[8px]'>
                            All
                        </button>
                        <button onClick={() => setSelectTab('full-stack')} className='bg-smallTextColor bg-black text-white font-[500] gap-2 hover:bg-smallTextColor
                    ease-in duration-100 py-2 px-4 rounded-[8px]'>
                            Full Stack
                        </button>
                        <button onClick={() => setSelectTab('front-end')} className='bg-smallTextColor bg-black text-white font-[500] gap-2 hover:bg-smallTextColor
                    ease-in duration-100 py-2 px-4 rounded-[8px]'>
                            Front End
                        </button>
                    </div>
                </div>

                <div className='flex items-center gap-4 flex-wrap mt-12'>
                    {
                        portfolios?.slice(0, nextItems).map((portfolio, index) => (
                            <div key={index} data-aos='fade-zoom-in' data-aos-delay='50' data-aos-duration='1000' className='group max-w-full sm:w-[48.5%] md:w-[31.8%] lg:w-[32.2%] relative z-[1]'>
                                <div className='bg-primarycolor bg-smallTextColor rounded-t-2xl'>
                                    <h2  className='text-white my-1 text-lg grid justify-items-center font-[500] gap-2 py-2 px-4'>{portfolio.name}</h2></div>
                                <figure><img  src={portfolio.imgUrl} alt='' /></figure>
                                <div className='bg-primarycolor bg-smallTextColor rounded-b-2xl'>
                                    <a href={portfolio.githubUrl} target='blank'><button onClick={() => setSelectTab('all')} className='bg-smallTextColor bg-black text-white font-[500] gap-2 hover:bg-smallTextColor
                                    ease-in duration-100 py-2 px-4 rounded-[8px]'>
                                        GitHub
                                    </button></a>
                                    <a href={portfolio.siteUrl} target='blank'><button onClick={() => setSelectTab('full-stack')} className='bg-smallTextColor absolute right-0 bg-black text-white font-[500] gap-2 hover:bg-smallTextColor
                                    ease-in duration-100 py-2 px-4 rounded-[8px]'>
                                        Live
                                    </button></a></div>
                            </div>
                        ))
                    }
                </div>

                <div className='text-center mt-6'>
                    {nextItems < portfolios.length && data.length > 6 && (
                        <button onClick={loadMoreHandler}
                            className='bg-smallTextColor bg-black text-white font-[500] gap-2 hover:bg-smallTextColor
                     ease-in duration-100 py-2 px-4 rounded-[8px]'>Load More</button>
                    )}
                </div>
            </div>
            {
                showModal && <Modal setShowModal={setShowModal} activeID={activeID} />
            }
        </section>
    );
}

export default Portfolio;
