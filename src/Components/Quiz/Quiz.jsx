import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import questions from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(questions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result,setResult]=useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];
  const check = (e, ans) => {
    if (lock === false) {
      if (question.answer === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((c) => c + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const next =()=>{
    if (lock===true) {
      if(index===questions.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(questions[index]);
      setLock(false);
      option_array.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
      
    }
  }
  const reset=()=>{
    setIndex(0);
    setQuestion(questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr></hr>
      {result?<></>:<>
        <h2>
        {index + 1}.{question.question}
      </h2>
      <ul>
        <li ref={option1} onClick={(e) => check(e, 1)}>
          {question.option1}
        </li>
        <li ref={option2} onClick={(e) => check(e, 2)}>
          {question.option2}
        </li>
        <li ref={option3} onClick={(e) => check(e, 3)}>
          {question.option3}
        </li>
        <li ref={option4} onClick={(e) => check(e, 4)}>
          {question.option4}
        </li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">
        {index + 1}of {questions.length} questions
      </div> </>}
      {result?<><h2>You scored {score} out of {questions.length}</h2>
      <button onClick={reset}>Reset</button></>:<></>}
      
    </div>
  );
};

export default Quiz;
