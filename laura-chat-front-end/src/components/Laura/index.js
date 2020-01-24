import React from 'react';
import ReactBodyMovin from 'react-bodymovin';
import NotFound from '../../assets/animations/lottie/lf30_editor_0PDKJd.json';
import './style.scss';

export default function Laura() {

    const bodyMovinOptions = {
        loop: true,
        autoplay: true, 
        animationData: NotFound,
    };

    return (
      <div className={"loading"}>
        <div className={"animation"}>
            <ReactBodyMovin options={bodyMovinOptions} />
        </div>
      </div>
    );
} 