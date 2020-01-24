import React from 'react';
import ReactBodyMovin from 'react-bodymovin';
import ErrorAnimation from '../../assets/animations/lottie/lf30_editor_0PDKJd.json';
import './style.scss';

export default function NotFound() {

    const bodyMovinOptions = {
        loop: false,
        autoplay: true, 
        animationData: ErrorAnimation,
    };

    return (
      <div className={"loading"}>
        <div className={"animation"}>
            <ReactBodyMovin options={bodyMovinOptions} />
            <h1 style={{textAlign: 'center',fontSize: 80,color: '#f4a52f'}}>NOT FOUND</h1>
        </div>
      </div>
    );
} 