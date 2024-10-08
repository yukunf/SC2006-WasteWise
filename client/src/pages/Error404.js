import React from "react";

const Error404 = () => {
    return (
      <div className="flex flex-col justify-center h-screen bg-green-100" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
        <div>
          <h1 className="text-8xl font-bold text-rose-800">
            404
          </h1>
          <h2 className="mt-2 text-4xl font-semibold font-serif italic">
            Uh Oh! Could this BE any more lost?
          </h2>
          <p className="mt-4 text-gray-600 font-mono">
            Something's wrong, but don't worry, we will get you back on the right page!
          </p>
            <button
              onClick={() => window.location.href = "/"}
              className="px-6 py-3 bg-green-500 font-mono mt-10 text-white rounded-2xl hover:bg-green-600 transition duration-300">
              Come Back to Home
            </button>
        </div>
      </div>
    )
}

export default Error404; 