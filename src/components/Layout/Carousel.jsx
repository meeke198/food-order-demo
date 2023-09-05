import React, {useEffect, useState} from 'react';
import classes from "./Carousel.module.css"
import banh_dap from "../../assets/banh_dap.jpg";
import banh_mi from "../../assets/banh_mi.jpg";
import banh_xeo from "../../assets/banh_xeo.jpg";
import banh_team from "../../assets/banh_team.jpg";
import bun_cha from "../../assets/bun_cha.jpg";


const Carousel = () => {
    const images = [banh_dap, banh_team, banh_xeo, bun_cha]
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselInfiniteScroll = () => {
        if(currentIndex === images.length - 1){
            return setCurrentIndex(0)
        }
        return setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            carouselInfiniteScroll()
        }, 10000)
        return () => clearInterval(interval)
    })

    return (
      <div className={classes["carousel-container"]}>
        {images.map((imgage, index) => {
          return <img className={classes["carousel-item"]} src={imgage} style={{transform: `translate(-${currentIndex * 100}%)`}} key={index}/>;
        })}
      </div>
    );
}

export default Carousel;