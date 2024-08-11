import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    const handleClickBarChart = () => {
        console.log("Button clicked!");
        navigate('/barchart');
    }
    const handleClickScatterplot = () => {
        console.log("Button clicked!");
        navigate('/scatterplot');
    }
    const handleClickLinechart = () => {
        console.log("Button clicked!");
        navigate('/linechart');
    }
    return (
        <div className="h-max w-full bg-slate-100  ">

            <div className="flex justify-between">

                {/* triangle */}
                <div className="h-28 w-36 md:h-52 md:w-60 xl:h-96 xl:w-96 overflow-hidden">
                    <svg viewBox={'0 0 400 400'}>
                        <polygon points={'0,0 400,0 0,400'} className="fill-red-700" />
                    </svg>
                </div>

                {/* title and buttons */}
                <div className="flex flex-col items-center justify-center antialiased">

                    <div className="max-w-2xl mx-auto ">
                        <h1 className="relative z-10 text-lg sm:text-3xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                            Data Canvas
                        </h1>

                        <p></p>
                        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                            This project creates a dynamic data visualization tool using colorful arrays and hex values. By leveraging SVG and TypeScript, it transforms complex data into engaging, easy-to-understand visual graphics, helping users quickly grasp insights and trends.
                        </p>

                        {/* buttons */}
                        <div className="p-4 flex justify-around">
                            <button onClick={handleClickBarChart}
                                className="px-2 py-1 sm:px-8 sm:py-2 rounded-md border-slate-800 mr-2 bg-citrine text-white font-semibold sm:font-bold transition duration-200 hover:bg-white hover:text-black border-2 hover:border-citrine relative z-10 ">
                                Barchart
                            </button>
                            <button onClick={handleClickScatterplot}
                                className="px-2 py-1 sm:px-8 sm:py-2 rounded-md border-slate-800 mr-2 bg-african_violet text-white font-semibold sm:font-bold transition duration-200 hover:bg-white hover:text-black border-2 hover:border-african_violet relative z-10 ">
                                Scatterplot
                            </button>
                            <button onClick={handleClickLinechart}
                                className="px-2 py-1 border-slate-800 mr-2 sm:px-8 sm:py-2 rounded-md bg-carrot_orange text-white font-semibold sm:font-bold transition duration-200 hover:bg-white hover:text-black border-2 hover:border-carrot_orange relative z-10 ">
                                Linechart
                            </button>
                        </div>
                    </div>
                </div>

                {/* triangle */}
                <div className="h-28 w-36 mt-32 md:h-52 md:w-60 xl:h-96 xl:w-96 overflow-hidden rotate-180">
                    <svg viewBox={'0 0 400 400'}>
                        <polygon points={'0,0 400,0 0,400'} className="fill-black" />
                    </svg>
                </div>
            </div>

            {/* paragraphs for user */}
            <div className="h-max w-full relative md:px-48 justify-center">

                {/* line */}
                <hr className="py-4 mt-9 border-border_gray" />

                <div className="mx-16 grid md:grid-rows-3 md:grid-cols-2 md:gap-7 md:mx-1">
                    {/* 1st paragraph  */}
                    <div className="border-4 border-slate-900 rounded-2xl p-4 w-fit bg-lime-400 mb-2  md:col-start-1">
                        <div className=" relative z-10 text-2xl md:text-5xl text-slate-900 font-sans font-bold pb-2">
                            Clean your data
                        </div>
                        <p className="text-black max-w-lg  my-2 text-sm ">
                            This is the most important step. Make sure your data is clean so that Data Canvas can provide the expected visualization for you.
                        </p>
                    </div>

                    {/* 2nd paragraph  */}
                    <div className="md:row-span-3 antialiased">
                        <div className="border-4 border-slate-900 rounded-2xl p-4 w-fit bg-lime-400 mb-2">
                            <div className="relative z-10 text-2xl md:text-5xl text-slate-900 font-sans font-bold pb-2">
                                Paste your CSV link
                            </div>
                            <p className="text-black max-w-lg  my-2 text-sm  ">
                                Get a CSV link of your dataset and paste it in the input field. Make sure your data is relevant to the visualization. Here's what Data Canvas expects the data types for each visualization to be:- <br></br><br></br>
                            </p>
                            <ul className="text-black max-w-lg  my-2 text-sm ">
                                <li>1)Barchart: Categorical and Quantitative(discrete). eg- Sales and Year or Countries and Population etc.</li><br></br>
                                <li>2)Scatterplot: Quantitative(continuous) and Quantitative(continuous) and Categorical(optional). eg- Length and Width etc</li><br></br>
                                <li>3)Linechart: Quantitative(continuous) and Quantitative(continuous). eg- Temperature and Timestamp etc</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3rd paragraph  */}
                    <div className="border-4 border-slate-900 rounded-2xl p-4 w-fit bg-lime-400 mb-2">
                        <div className="relative z-10 text-2xl md:text-5xl text-slate-900 font-sans font-bold pb-2">
                            Finally-
                        </div>
                        <p className="text-black max-w-lg  my-2 text-sm ">
                            If you followed the above steps properly then just sit back and relax and let your dataset come to life!
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Landing;