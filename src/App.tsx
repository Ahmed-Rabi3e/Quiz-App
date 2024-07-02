import { useGlobalContext } from "./context";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className="w-[90vh] my-16 mx-auto bg-white rounded-md p-12">
        <p className="text-xl mb-8 text-right capitalize tracking-wider text-green-500">
          correct answers : {correct}/{index}
        </p>
        <article>
          <h2
            className="mb-8 text-center leading-10"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <div>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="block w-full my-3 mx-auto bg-blue-500 rounded-md border-none text-white tracking-wider text-xl cursor-pointer py-2 px-0 hover:bg-blue-400"
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button
          className="rounded bg-black p-2 text-white text-center block w-2/6 ml-auto mt-3 capitalize font-bold tracking-wider cursor-pointer hover:bg-neutral-800"
          onClick={nextQuestion}
        >
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
