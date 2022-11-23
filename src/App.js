import './App.css';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('')
  const [screen, setScreen] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [scoreGrade, setScoreGrade] = useState(0);

  const submitAnswer = ()=>{
    if(quizData[questionIndex].correctAnswerIndex === userAnswer){
      setCorrectAnswers(correctAnswers+1);
    }
    if(quizData.length === questionIndex+1){
      setScreen(3);
      setScorePercentage((correctAnswers/quizData.length) * 100);
      if(scorePercentage >= 90){
        setScoreGrade('A+')
      }else if(scorePercentage >= 80){
        setScoreGrade('A')
      }else if(scorePercentage >= 70){
        setScoreGrade('B')
      }else if(scorePercentage >= 60){
        setScoreGrade('C')
      }else if(scorePercentage >= 50){
        setScoreGrade('D')
      }else{
        setScoreGrade('F')
      }
    }else{
      setQuestionIndex(questionIndex+1)
    }
  };
  const quizData = [
    {
      'question':'Inside which HTML element do we put the JavaScript?',
      'answers': [
        '<javascript>',
        '<scripting>',
        '<js>',
        '<script>'
      ],
      'correctAnswerIndex':3,
    },
    {
      'question':'What is the correct JavaScript syntax to change the content of the this HTML? {<p id="demo">This is a demonstration.</p>}',
      'answers': [
        'document.getElement("p").innerHTML = "Hello World!";',
        'document.getElementByName("p").innerHTML = "Hello World!";',
        '#demo.innerHTML = "Hello World!";',
        'document.getElementById("demo").innerHTML = "Hello World!";'
      ],
      'correctAnswerIndex':3,
    },
    {
      'question':'Where is the correct place to insert a JavaScript?',
      'answers': [
        'The <head> section',
        'The <body> section',
        'Both the <head> section and the <body> section are correct'
      ],
      'correctAnswerIndex':2,
    },
    {
      'question':'What is the correct syntax for referring to an external script called "xxx.js"?',
      'answers': [
        '<script name="xxx.js">',
        '<script src="xxx.js">',
        '<script href="xxx.js">'
      ],
      'correctAnswerIndex':1,
    },
    {
      'question':'The external JavaScript file must contain the <script> tag.',
      'answers': [
        'False',
        'True',
      ],
      'correctAnswerIndex':0,
    },
  ]
  const startQuiz = ()=>{
    if(!userName){
      alert('Please enter your name to begin!')
    }else{
      setScreen(2)
    }
  }
  return (
    <div className='bg-dark vh-100 pt-5'>
      {/* Initial Screen */}
      {
      (
        screen == 1 &&
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-12'>
              <h1 className='text-center text-white'>Welcome to Javascript Quiz App</h1> 
            </div>
            <div className='offset-md-3 col-md-6 mt-4'>
                <input className='form-control' value={userName} placeholder='Enter Your Name' required onChange={(event)=>{setUserName(event.target.value)}}/>
                <button type='submit' className='btn btn-success w-100 mt-3' onClick={()=>{startQuiz()}}>Start</button>
            </div>
          </div>
        </div> 
      )
      }
      {/* Questions Screens */}
      {
      (
        screen == 2 &&
        <div className='container pt-5'>
          <div className='row'>
            <div className='offset-md-3 col-md-6 bg-white mb-4'>
              <p className='mb-0 p-2 question rounded'>{quizData[questionIndex].question}</p>
              <div className='answers mt-3 p-2'>
                {quizData[questionIndex].answers.map((item,index)=>{
                  return <div className="form-check" key={index}>
                  <label className="form-check-label"> 
                  <input className="form-check-input" type="radio" name="answer" onClick={()=>{setUserAnswer(index)}}/>{item}</label>
                </div>
                })}
              </div>
              <div className='mb-2 p-2 text-end'>
                <button type="button" className='btn btn-success' onClick={()=>{submitAnswer()}}>Next <i className="fa-solid fa-angle-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      )
      }
      {/* Final Screen */}
      {
        (
          screen == 3 &&
          <div className='container pt-5'>
            <div className='row'>
              <div className='offset-md-3 col-md-6 mb-4'>
                <h2 className='text-white text-center'> Dear {userName}, You scored {correctAnswers} out of {quizData.length}.</h2>
                <p className='text-white text-center'>Your percentage is {scorePercentage}% & your grade is {scoreGrade}</p> 
                <div className='mb-2 p-2 text-center'>
                  <button type="button" className='btn btn-success' onClick={()=>{setScreen(2);setQuestionIndex(0);setCorrectAnswers(0)}}>Restart <i className="fa-solid fa-repeat"></i></button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  );
}

export default App;
