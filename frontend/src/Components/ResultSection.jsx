import React, { useContext } from 'react';
import { WebDataContext } from '../context/dataContext';
import About from './About';
function ResultSection() {
    const {data,loading,setloading} = useContext(WebDataContext);

  
    if (!data&&loading===false) {
        return <About/>
    }

   
    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <h1 className="text-2xl text-gray-600 ">Loading...</h1>
            </div>
        );
    }

  
    if (data && data.length > 0 &&
        loading === false) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center mt-5 ">Total Word's on Webpage</h1>
                <table className="md:min-w-[80%] text-slate-100 bg-slate-500 border border-fuchsia-600 shadow-lg mx-auto">
                    <thead>
                        <tr className="bg-gray-800 text-slate-50">
                            <th className="text-left py-3 px-4 font-semibold "
                            >Index</th>
                            <th
                                className="text-left py-3 px-4 font-semibold ">URL</th>
                            <th className="text-left py-3 px-4 font-semibold ">Word Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`border-t ${index % 2 === 0 ? 'bg-gray-500' : 'bg-slate-500'}`}
                            >
                                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                                <td className="py-3 px-4 text-fuchsia-100 break-all">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        {item.url}
                                    </a>
                                </td>
                                <td className="py-3 px-4 text-slate-900">
                                    {item.error ? "Can't find word count" : item.wordCount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Show a message if data exists but is empty
    if (data && data.length === 0 && loading === false) {
        return <About/>
    }

    // Default case to handle unexpected situations
    return null;
}

export default ResultSection;
