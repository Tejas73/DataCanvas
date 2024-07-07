import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { BackgroundBeamCurveDown } from "./ui/curve-right-down";
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
        <div className="h-max w-full bg-neutral-950  ">

            <div className=" py-64 flex flex-col items-center justify-center antialiased">
                <div className="max-w-2xl mx-auto">
                    <h1 className="relative z-10 text-lg sm:text-3xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                        Data Canvas
                    </h1>

                    <p></p>
                    <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                        This project creates a dynamic data visualization tool using colorful arrays and hex values. By leveraging SVG and TypeScript, it transforms complex data into engaging, easy-to-understand visual graphics, helping users quickly grasp insights and trends.
                    </p>
                    <div>

                    </div>
                    <div className="p-4 flex justify-around">
                        <button onClick={ handleClickBarChart} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                            Barchart
                        </button>
                        <button onClick={ handleClickScatterplot} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                            Scatterplot
                        </button>
                        <button onClick={ handleClickLinechart} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                            Linechart
                        </button>
                    </div>
                    
                </div>
            </div>

            <div className="h-max w-full bg-neutral-950 relative p-28">
                <div>
                    <h3 className="relative z-10 text-lg sm:text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600   font-sans font-bold">
                        Clean your data
                    </h3>
                    <p className="text-neutral-500 max-w-lg  my-2 text-sm  relative z-10">
                        This is the most important step. Make sure your data is clean so that Data Canvas can provide the expected visualization for you.
                    </p>
                </div>

                <div className="flex flex-row-reverse antialiased">
                    <div>
                        <h3 className="relative z-10 text-lg sm:text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600   font-sans font-bold">
                            Paste your CSV link
                        </h3>
                        <p className="text-neutral-500 max-w-lg  my-2 text-sm  relative z-10">
                            Get a CSV link of your dataset and paste it in the input field. Make sure your data is relevant to the visualization. Here's what Data Canvas expects the data types for each visualization to be:- <br></br><br></br>
                        </p>
                        <ul className="text-neutral-500 max-w-lg  my-2 text-sm  relative z-10">
                            <li>1)Barchart: Categorical and Quantitative(discrete). eg- Sales and Year or Countries and Population etc.</li><br></br>
                            <li>2)Scatterplot: Quantitative(continuous) and Quantitative(continuous) and Categorical(optional). eg- Length and Width etc</li><br></br>
                            <li>3)Linechart: Quantitative(continuous) and Quantitative(continuous). eg- Temperature and Timestamp etc</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="relative z-10 text-lg sm:text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600   font-sans font-bold">
                        Reap what you saw
                    </h3>
                    <p className="text-neutral-500 max-w-lg  my-2 text-sm  relative z-10">
                        If you followed the above steps properly then just sit back and relax and let your dataset come to life!
                    </p>
                </div>
                <BackgroundBeamCurveDown></BackgroundBeamCurveDown>
            </div>
            <BackgroundBeams />

        </div>
    );
}

export default Landing;