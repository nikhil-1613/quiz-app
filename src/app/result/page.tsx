"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "Player";
  const score = searchParams.get("score") || "0";
  const correct = searchParams.get("correct") || "0";
  const incorrect = searchParams.get("incorrect") || "0";

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed! 🎉</h2>
        
        <p className="text-lg font-semibold text-gray-600 mb-2">Well done, <span className="text-blue-500">{name}</span>! Here is your result:</p>
        
        <p className="text-3xl font-bold text-blue-500">{score} Points</p>

        <div className="mt-4">
          <p className="text-green-600 font-semibold">✅ Correct Answers: {correct}</p>
          <p className="text-red-600 font-semibold">❌ Incorrect Answers: {incorrect}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function Result() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const score = searchParams.get("score") || "0";
//   const correct = searchParams.get("correct") || "0";
//   const incorrect = searchParams.get("incorrect") || "0";

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed! 🎉</h2>
        
//         <p className="text-lg font-semibold text-gray-600 mb-2">Here is your result:</p>
//         <p className="text-3xl font-bold text-blue-500">{score} Points</p>

//         <div className="mt-4">
//           <p className="text-green-600 font-semibold">✅ Correct Answers: {correct}</p>
//           <p className="text-red-600 font-semibold">❌ Incorrect Answers: {incorrect}</p>
//         </div>

//         <div className="mt-6">
//           <button
//             onClick={() => router.push("/index")}
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Restart Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }