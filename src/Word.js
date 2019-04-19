import React from 'react'
import PropTypes from 'prop-types'

import './Word.css'

const HIDDEN_SYMBOL = '_';

const Word = ({ letter, feedback }) => (
    <div className="word">
        {feedback === 'hidden' ? HIDDEN_SYMBOL : letter}
    </div>
);

Word.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible',
    ]).isRequired,
};

export default Word;
