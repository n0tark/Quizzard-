import React, { useState } from 'react';

import Layout from './components/Layout';
import Loader from './components/Loader';
import Main from './components/Main';
import Quiz from './components/Quiz/Quiz';
import Result from './components/Result/Result';
import './App.css';

import { shuffle } from './utils';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [data, setData] = useState(null);
    const [countdownTime, setCountdownTime] = useState(null);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [resultData, setResultData] = useState(null);

    const startQuiz = (data, countdownTime) => {
        setLoading(true);
        setLoadingMessage({
            title: 'Loading your quiz...',
            message: "It won't be long!",
        });
        setCountdownTime(countdownTime);

        setTimeout(() => {
            setData(data);
            setIsQuizStarted(true);
            setLoading(false);
        }, 1000);
    };

    const endQuiz = (resultData) => {
        setLoading(true);
        setLoadingMessage({
            title: 'Fetching your results...',
            message: 'Just a moment!',
        });

        setTimeout(() => {
            setIsQuizStarted(false);
            setIsQuizCompleted(true);
            setResultData(resultData);
            setLoading(false);
        }, 2000);
    };

    const replayQuiz = () => {
        setLoading(true);
        setLoadingMessage({
            title: 'Getting ready for round two.',
            message: "It won't take long!",
        });

        const shuffledData = shuffle(data);
        shuffledData.forEach((element) => {
            element.options = shuffle(element.options);
        });

        setData(shuffledData);

        setTimeout(() => {
            setIsQuizStarted(true);
            setIsQuizCompleted(false);
            setResultData(null);
            setLoading(false);
        }, 1000);
    };

    const resetQuiz = () => {
        setLoading(true);
        setLoadingMessage({
            title: 'Loading the home screen.',
            message: 'Thank you for playing!',
        });

        setTimeout(() => {
            setData(null);
            setCountdownTime(null);
            setIsQuizStarted(false);
            setIsQuizCompleted(false);
            setResultData(null);
            setLoading(false);
        }, 1000);
    };

    return (
        <Layout>
            {loading && <Loader {...loadingMessage} />}
            {!loading && !isQuizStarted && !isQuizCompleted && (
                <Main startQuiz={startQuiz} />
            )}
            {!loading && isQuizStarted && (
                <Quiz
                    data={data}
                    countdownTime={countdownTime}
                    endQuiz={endQuiz}
                />
            )}
            {!loading && isQuizCompleted && (
                <Result
                    {...resultData}
                    replayQuiz={replayQuiz}
                    resetQuiz={resetQuiz}
                />
            )}
        </Layout>
    );
};

export default App;
