import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useNavigate } from "react-router-dom";
import "./style.css";


const Quiz = () => {
    const [cards, setCards] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionData, setQuestionData] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const { courseId } = useParams();
    const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchCards(courseId);
    }, [courseId]);

    useEffect(() => {
        if (cards.length > 0) {
            setupQuestion(currentQuestion);
        }
    }, [cards, currentQuestion]);

    const fetchCards = async (courseId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
              };
            const response = await axios.get(`http://localhost:8000/cards/course/${courseId}`, config);

            setCards(response.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const setupQuestion = (questionIndex) => {
        const currentCard = cards[questionIndex];
        const correctAnswer = currentCard.value;

        const wrongAnswers = cards.filter(card => card.value !== correctAnswer).map(card => card.value);
        const shuffledWrongAnswers = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);

        const answers = [correctAnswer, ...shuffledWrongAnswers].sort(() => 0.5 - Math.random());

        setQuestionData({
            question: currentCard.key,
            answers,
            correctAnswer
        });
        setSelectedAnswer(null);
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === questionData.correctAnswer;
        const result = {
            question: questionData.question,
            selectedAnswer,
            isCorrect,
            correctAnswer: questionData.correctAnswer
        };
        setAnsweredQuestions([...answeredQuestions, result]);

        if (currentQuestion < cards.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert("Quiz completed!");
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div>
            <div className="navigation">
                <div className="navigation__logo">
                    <img src="img/cake-logo-small.png" alt="" className="navigation__logo-img" />
                    <div className="navigation__brand">Cake</div>
                </div>

                <div className="navigation__search-box">
                    <svg className="navigation__search-box-icon">
                        <use xlinkHref="img/symbol-defs.svg#icon-search"></use>
                    </svg>
                    <input className="navigation__search-box-bar" type="text" placeholder="Search for folders, tutor,.." />
                </div>

                <ul className="navigation__link">
                    <div className="navigation__dropdown">
                        <button>
                            <span>Your library</span>
                            <svg width="28" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.2862 21.923C16.3437 25.1569 11.6563 25.1569 9.71382 21.923L1.22939 7.79826C-0.772414 4.46568 1.62799 0.223642 5.51557 0.223642L22.4844 0.223642C26.372 0.223642 28.7724 4.46568 26.7706 7.79826L18.2862 21.923Z" fill="#734A4A" />
                            </svg>
                        </button>
                        <ul className="navigation__dropdown-list">
                            <div className="navigation__dropdown-button-container">
                                <button className="navigation__dropdown-button navigation__dropdown-button-1">Flash-slices</button>
                                <button className="navigation__dropdown-button navigation__dropdown-button-2">Quick-bites</button>
                            </div>
                            <div className="navigation__dropdown-item-container">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="navigation__dropdown-item">
                                        <h6>Animals</h6>
                                        <img src="img/avatar1.png" alt="" />
                                    </div>
                                ))}
                            </div>
                            <a className="navigation__dropdown-all" href="#">All</a>
                        </ul>
                    </div>

                    <li className="navigation__link-btn"><a className='navigation__link-btn-a' href='#'>Help Center</a></li>
                    <li className="navigation__link-btn"><a className='navigation__link-btn-a' href='#'>Language: VN</a></li>
                    <img className='navigation__avatar' src="img/avatar2.png" alt="" />
                </ul>
            </div>

            <section className="main">
                <div className="study__top">
                    <h1 className="study__header">Animals</h1>
                    <img src="./img/orange.png" alt="" className="study__cake" />
                    <svg className="study__pen">
                        <use xlinkHref="img/symbol-defs.svg#icon-edit-3"></use>
                    </svg>
                    <svg className="study__arrow">
                        <use xlinkHref="img/symbol-defs.svg#icon-forward"></use>
                    </svg>
                </div>

                <div className="study__stats">
                    <svg className="study__group">
                        <use xlinkHref="img/symbol-defs.svg#icon-users"></use>
                    </svg>
                    <h6 className="study__stat">30 have enrolled</h6>
                    <svg className="study__star">
                        <use xlinkHref="img/symbol-defs.svg#icon-star"></use>
                    </svg>
                    <h6 className="study__stat">5.0 (3rate)</h6>
                </div>

                <div className="quiz">
                    <div id="quiz-title" className="quiz__title">
                        <h1>{questionData ? questionData.question : "Loading..."}</h1>
                        <svg>
                            <use xlinkHref="img/symbol-defs.svg#icon-lightbulb-o"></use>
                        </svg>
                    </div>
                    <div id="quiz-answers" className="quiz__answers">
                        {questionData && questionData.answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`quiz__answer ${selectedAnswer === answer ? 'selected' : ''}`}
                                onClick={() => handleAnswerClick(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div id="quiz-count" className="quiz__count">
                        {currentQuestion + 1} / {cards.length}
                    </div>
                    <button id="next-question" onClick={handleNextQuestion}>Next</button>
                    <svg className="quiz__right" onClick={handleNextQuestion}>
                        <use xlinkHref="/img/symbol-defs.svg#icon-angle-right"></use>
                    </svg>
                    <svg className="quiz__left" onClick={handlePreviousQuestion}>
                        <use xlinkHref="/img/symbol-defs.svg#icon-angle-left"></use>
                    </svg>
                </div>

                <div className="author">
                    <div className="author__avt">
                        <img src="img/avatar1.png" alt="" />
                        <div className="avt__name">anhlenguyen</div>
                    </div>
                    <div className="author__time">created in March 13rd 2024</div>
                </div>

                <h1 className="quizzes__header">Quizzes List</h1>
                <ul id="quizzes-list" className="quizzes__list">
                    {answeredQuestions.map((answeredQuestion, index) => (
                        <li key={index} className="quizzes__item">
                            <div className="quizzes__title">{answeredQuestion.question}</div>
                            <div className="quizzes__answer">
                                {answeredQuestion.isCorrect ? "correct answer" : `wrong answer, the answer is ${answeredQuestion.correctAnswer}`}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className="footer">
                <div className="footer__img-container">
                    <img src="img/cake-logo-big.png" alt="Large Cake Logo" className="footer__logo" />
                    <h1 className="footer__brand">CAKE</h1>
                </div>
                <div className="footer__text-container">
                    <h3 className="footer__h3-author">Author</h3>
                    <h4 className="footer__h4-author-1">minh</h4>
                    <h4 className="footer__h4-author-2">minh</h4>
                    <h4 className="footer__h4-author-3">minh</h4>
                    <h4 className="footer__h4-author-4">nam</h4>
                    <h3 className="footer__h3-about">About CAKE</h3>
                    <h4 className="footer__h4-about-1">How CAKE works</h4>
                    <h4 className="footer__h4-about-2">Q&A</h4>
                    <h3 className="footer__h3-term-of-use">Terms of Use</h3>
                    <h4 className="footer__h4-term-of-use">Terms & Privacy</h4>
                </div>
                <div className="footer__text-container-1">
                    <h3 className="footer__h3-acknowledge">University Acknowledgement</h3>
                    <h4 className="footer__h4-acknowledge">A project for Hanoi University of Science and Technology's Web Subject Course</h4>
                </div>
            </footer>
        </div>
    );
};

export default Quiz;
