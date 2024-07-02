import axios from "axios";
import { useState, useContext, createContext, ReactNode, ChangeEvent, FormEvent } from "react";

interface TableProps {
  sports: number;
  history: number;
  politics: number;
}

const table: TableProps = {
  sports: 21,
  history: 23,
  politics: 24,
};

interface QuizProps {
  amount: number;
  category: keyof TableProps; // Ensuring category is one of the keys of TableProps
  difficulty: string;
}

interface Question {
  // Add appropriate types based on the API response
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface AppContextProps {
  waiting: boolean;
  loading: boolean;
  questions: Question[];
  index: number;
  correct: number;
  error: boolean;
  isModalOpen: boolean;
  nextQuestion: () => void;
  checkAnswer: (value: boolean) => void;
  closeModal: () => void;
  quiz: QuizProps;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = createContext<AppContextProps | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [waiting, setWaiting] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizProps>({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchQuestions = async (url: string) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios(url);
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value: boolean) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const categoryValue = table[category];
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${categoryValue}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};

export { AppContext, AppProvider };
