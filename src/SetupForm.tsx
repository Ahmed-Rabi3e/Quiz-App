import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="w-[90vh] my-16 mx-auto shadow-2xl bg-white rounded-lg p-12 max-w-lg">
        <form className="">
          <h2 className="mb-10 text-black font-bold text-center">setup quiz</h2>
          {/* amount */}
          <div className="mb-8">
            <label
              className="capitalize font-medium text-black mb-2"
              htmlFor="amount"
            >
              number of questions
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="rounded-md border-none bg-neutral-100 py-1 px-2 w-full focus:outline-none"
              min={1}
              max={50}
            />
          </div>
          {/* category */}

          <div className="mb-8">
            <label
              className="capitalize font-medium text-black mb-2"
              htmlFor="category"
            >
              category
            </label>
            <select
              name="category"
              id="category"
              className="rounded-md border-none bg-neutral-100 py-1 px-2 w-full focus:outline-none" 
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
            </select>
          </div>
          {/* difficulty */}

          <div className="mb-8">
            <label
              className="capitalize font-medium text-black mb-2"
              htmlFor="difficulty"
            >
              select difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              className="rounded-md border-none bg-neutral-100 py-1 px-2 w-full focus:outline-none"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          {error && (
            <p className="text-red-600 capitalize font-semibold">
              Can't generate questions, please try different options
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="w-full font-semibold mt-12 bg-blue-500 text-white py-2 uppercase rounded-lg hover:bg-blue-400">
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
