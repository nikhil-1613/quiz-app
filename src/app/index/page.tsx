
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();

  const handleStart = () => {
    if (name.trim()) {
      setShowPopup(true);
      setTimeout(() => router.push(`/quiz?name=${encodeURIComponent(name)}`), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-white">
      <h1 className="text-3xl font-bold mb-4 text-black">Welcome to the Quiz!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="p-2 border rounded text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart} className="bg-blue-500 px-4 py-2 rounded mt-4">
        Start Quiz
      </button>

      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded text-black">
            <p>Hello, {name}! Get ready for the quiz!</p>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const [name, setName] = useState<string>("");
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const router = useRouter();

//   const handleStart = () => {
//     if (name.trim()) {
//       setShowPopup(true);
//       setTimeout(() => router.push(`/quiz?name=${name}`), 1500);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-white">
//       <h1 className="text-3xl font-bold mb-4 text-black ">Welcome to the Quiz!</h1>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         className="p-2 border rounded text-black"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button onClick={handleStart} className="bg-blue-500 px-4 py-2 rounded mt-4">
//         Start Quiz
//       </button>

//       {showPopup && (
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded text-black">
//             <p>Hello, {name}! Get ready for the quiz!</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
