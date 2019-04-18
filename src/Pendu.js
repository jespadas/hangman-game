import React from 'react';

const PenduSchema = ({guesses}) => {
    const path = "./img/" + guesses + ".jpg";
    return (
        <div className="pendu-img">
            <div className="col-md-4"></div>
            <div>
                <img src={path} alt="pendu" />
            </div>
        </div>
    );
};

export default PenduSchema;