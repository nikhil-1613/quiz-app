"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/app/components/ProgressBar";

interface Answer {
  id: number;
  description: string;
  question_id: number;
  is_correct: boolean;
}

interface Question {
  id: number;
  question_text: string;
  options: Answer[];
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(""); // NEW: Store Username
  const [hasStarted, setHasStarted] = useState(false); // NEW: Track if quiz has started
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX");
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data.questions)) {
          const formattedQuestions = data.questions.map((q: any) => ({
            id: q.id,
            question_text: q.description || q.question_text || "Question not available",
            options: q.options || [],
          }));

          setQuestions(formattedQuestions);
        } else {
          console.error("Invalid questions format:", data.questions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selectedAnswer: Answer) => {
    if (selectedAnswer.is_correct) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push(
        `/result?score=${score + (selectedAnswer.is_correct ? 1 : 0)}&correct=${correctAnswers + (selectedAnswer.is_correct ? 1 : 0)}&incorrect=${incorrectAnswers + (selectedAnswer.is_correct ? 0 : 1)}`
      );
    }
  };

  if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;

  // NEW: Username Input Screen
//   if (!hasStarted) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your Name</h2>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your name"
//             className="w-full p-3 border rounded-lg text-lg mb-4"
//           />
//           <button
//             onClick={() => setHasStarted(true)}
//             disabled={!username.trim()} // Disable if empty
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
//           >
//             Start Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Quiz</h2>
        <h3 className="text-lg font-semibold text-center">Player: {username}</h3>

        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">{questions[currentQuestionIndex].question_text}</h3>

            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-3 text-left bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {option.description}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <h3 className="text-xl font-semibold text-center">Quiz Completed! 🎉</h3>
        )}

        <div className="mt-6">
          <ProgressBar progress={(currentQuestionIndex / questions.length) * 100} />
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ProgressBar from "@/app/components/ProgressBar";

// interface Answer {
//   id: number;
//   description: string;
//   question_id: number;
//   is_correct: boolean;
// }

// interface Question {
//   id: number;
//   question_text: string;
//   options: Answer[];
// }

// export default function Quiz() {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [incorrectAnswers, setIncorrectAnswers] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch("https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX");
//         const data = await response.json();
//         console.log("API Response:", data);

//         if (Array.isArray(data.questions)) {
//           const formattedQuestions = data.questions.map((q: any) => ({
//             id: q.id,
//             question_text: q.description || q.question_text || "Question not available",
//             options: q.options || [],
//           }));

//           setQuestions(formattedQuestions);
//         } else {
//           console.error("Invalid questions format:", data.questions);
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleAnswer = (selectedAnswer: Answer) => {
//     if (selectedAnswer.is_correct) {
//       setScore(score + 1);
//       setCorrectAnswers(correctAnswers + 1);
//     } else {
//       setIncorrectAnswers(incorrectAnswers + 1);
//     }

//     if (currentQuestionIndex + 1 < questions.length) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       router.push(
//         `/result?score=${score + (selectedAnswer.is_correct ? 1 : 0)}&correct=${correctAnswers + (selectedAnswer.is_correct ? 1 : 0)}&incorrect=${incorrectAnswers + (selectedAnswer.is_correct ? 0 : 1)}`
//       );
//     }
//   };

//   if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">Quiz</h2>

//         {questions.length > 0 && currentQuestionIndex < questions.length ? (
//           <div>
//             <h3 className="text-lg font-semibold mb-4">{questions[currentQuestionIndex].question_text}</h3>

//             <div className="space-y-3">
//               {questions[currentQuestionIndex].options.map((option) => (
//                 <button
//                   key={option.id}
//                   onClick={() => handleAnswer(option)}
//                   className="w-full p-3 text-left bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                 >
//                   {option.description}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <h3 className="text-xl font-semibold text-center">Quiz Completed! 🎉</h3>
//         )}

//         <div className="mt-6">
//           <ProgressBar progress={(currentQuestionIndex / questions.length) * 100} />
//         </div>
//       </div>
//     </div>
//   );
// }

