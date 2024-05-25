import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
import { useNavigate } from "react-router-dom";
import "./stylle.css";

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
            <div className="hnavigation">
                <div className="hnavigation__logo">
                    <img src="/img/cake-logo-small.png" alt="" className="hnavigation__logo-img" />
                    <div className="hnavigation__brand">Cake</div>
                </div>

                <div className="hnavigation__search-box">
                    <svg className="hnavigation__search-box-icon">
                        <use xlinkHref="/img/symbol-defs.svg#icon-search"></use>
                    </svg>
                    <input className="hnavigation__search-box-bar" type="text" placeholder="Search for folders, tutor,.." />
                </div>

                <ul className="hnavigation__link">
                    <div className="hnavigation__dropdown">
                        <button>
                            <span>Your library</span>
                            <svg width="64px" height="64px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">

                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                <g id="SVGRepo_iconCarrier">

                                    <path fill="#7a4a4a" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z" />

                                </g>

                            </svg>
                        </button>
                        <ul className="hnavigation__dropdown-list">
                            <div className="hnavigation__dropdown-button-container">
                                <button className="hnavigation__dropdown-button hnavigation__dropdown-button-1">Flash-slices</button>
                                <button className="hnavigation__dropdown-button hnavigation__dropdown-button-2">Quick-bites</button>
                            </div>
                            <div className="hnavigation__dropdown-item-container">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="hnavigation__dropdown-item">
                                        <h6>Animals</h6>
                                        <img src="/img/avatar1.png" alt="" />
                                    </div>
                                ))}
                            </div>
                            <a className="hnavigation__dropdown-all" href="#">All</a>
                        </ul>
                    </div>

                    <li className="hnavigation__link-btn"><a className='hnavigation__link-btn-a' href='#'>Help Center</a></li>
                    <li className="hnavigation__link-btn"><a className='hnavigation__link-btn-a' href='#'>Language: VN</a></li>
                    <img className='hnavigation__avatar' src="/img/avatar2.png" alt="" />
                </ul>
            </div>

            <section className="hmain">
                <div className="hstudy__top">
                    <h1 className="hstudy__header">Animals</h1>

                    <svg className="hstudy__pen">
                        <use xlinkHref="/img/symbol-defs.svg#icon-edit-3"></use>
                    </svg>
                    <svg className="hstudy__arrow">
                        <use xlinkHref="/img/symbol-defs.svg#icon-forward"></use>
                    </svg>
                </div>

                <div className="hstudy__stats">
                    <svg className='hstudy__group' width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                        <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C14.3432 6 13 7.34315 13 9C13 10.6569 14.3432 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6ZM11 9C11 6.23858 13.2386 4 16 4C18.7614 4 21 6.23858 21 9C21 10.3193 20.489 11.5193 19.6542 12.4128C21.4951 13.0124 22.9176 14.1993 23.8264 15.5329C24.1374 15.9893 24.0195 16.6114 23.5631 16.9224C23.1068 17.2334 22.4846 17.1155 22.1736 16.6591C21.1979 15.2273 19.4178 14 17 14C13.166 14 11 17.0742 11 19C11 19.5523 10.5523 20 10 20C9.44773 20 9.00001 19.5523 9.00001 19C9.00001 18.308 9.15848 17.57 9.46082 16.8425C9.38379 16.7931 9.3123 16.7323 9.24889 16.6602C8.42804 15.7262 7.15417 15 5.50001 15C3.84585 15 2.57199 15.7262 1.75114 16.6602C1.38655 17.075 0.754692 17.1157 0.339855 16.7511C-0.0749807 16.3865 -0.115709 15.7547 0.248886 15.3398C0.809035 14.7025 1.51784 14.1364 2.35725 13.7207C1.51989 12.9035 1.00001 11.7625 1.00001 10.5C1.00001 8.01472 3.01473 6 5.50001 6C7.98529 6 10 8.01472 10 10.5C10 11.7625 9.48013 12.9035 8.64278 13.7207C9.36518 14.0785 9.99085 14.5476 10.5083 15.0777C11.152 14.2659 11.9886 13.5382 12.9922 12.9945C11.7822 12.0819 11 10.6323 11 9ZM3.00001 10.5C3.00001 9.11929 4.1193 8 5.50001 8C6.88072 8 8.00001 9.11929 8.00001 10.5C8.00001 11.8807 6.88072 13 5.50001 13C4.1193 13 3.00001 11.8807 3.00001 10.5Z" fill="#7a4a4a" /> </g>

                    </svg>
                    <h6 className="hstudy__stat">30 have enrolled</h6>
                    <svg className="hstudy__star">
                        <use xlinkHref="/img/symbol-defs.svg#icon-star"></use>
                    </svg>
                    <h6 className="hstudy__stat">5.0 (3 rate)</h6>
                </div>

                <div className="hquiz">
                    <div id="quiz-title" className="hquiz__title">
                        <h1>{questionData ? questionData.question : "Loading..."}</h1>
                        <svg>
                            <use xlinkHref="/img/symbol-defs.svg#icon-lightbulb-o"></use>
                        </svg>
                    </div>
                    <div id="quiz-answers" className="hquiz__answers">
                        {questionData && questionData.answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`hquiz__answer ${selectedAnswer === answer ? 'selected' : ''}`}
                                onClick={() => handleAnswerClick(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div id="quiz-count" className="hquiz__count">
                        {currentQuestion + 1} / {cards.length}
                    </div>
                    <button id="next-question" onClick={handleNextQuestion}>Next</button>

                </div>

                <div className="hauthor">
                    <div className="hauthor__avt">
                        <img src="/img/avatar1.png" alt="" />
                        <div className="havt__name">anhlenguyen</div>
                    </div>
                    <div className="hauthor__time">created in March 13rd 2024</div>
                </div>

                <h1 className="hquizzes__header">Quizzes List</h1>
                <ul id="quizzes-list" className="hquizzes__list">
                    {answeredQuestions.map((answeredQuestion, index) => (
                        <li key={index} className="hquizzes__item">
                            <div className="hquizzes__title">{answeredQuestion.question}</div>
                            <div className="hquizzes__answer">
                                {answeredQuestion.isCorrect ? "correct answer" : `wrong answer, the answer is ${answeredQuestion.correctAnswer}`}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer className="hfooter">
                <div className="hfooter__img-container">
                    <img src="/img/cake-logo-big.png" alt="Large Cake Logo" className="hfooter__logo" />
                    <h1 className="hfooter__brand">CAKE</h1>
                </div>
                <div className="hfooter__text-container">
                    <h3 className="hfooter__h3-author">Author</h3>
                    <h4 className="hfooter__h4-author-1">minh</h4>
                    <h4 className="hfooter__h4-author-2">minh</h4>
                    <h4 className="hfooter__h4-author-3">minh</h4>
                    <h4 className="hfooter__h4-author-4">nam</h4>
                    <h3 className="hfooter__h3-about">About CAKE</h3>
                    <h4 className="hfooter__h4-about-1">How CAKE works</h4>
                    <h4 className="hfooter__h4-about-2">Q&A</h4>
                    <h3 className="hfooter__h3-term-of-use">Terms of Use</h3>
                    <h4 className="hfooter__h4-term-of-use">Terms & Privacy</h4>
                </div>
                <div className="hfooter__text-container-1">
                    <h3 className="hfooter__h3-acknowledge">University Acknowledgement</h3>
                    <h4 className="hfooter__h4-acknowledge">A project for Hanoi University of Science and Technology's Web Subject Course</h4>
                </div>
            </footer>
        </div>
    );
};

export default Quiz;
