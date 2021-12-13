/// <reference types="types-for-adobe/AfterEffects/2018"/>

const extendscriptPath = (fn) => {
  return {
/**
    * @param { number} flag}
    * @param { number} length}
    * @return {void}
    */
      
    makeFade:(flag, length) => fn(`makeFade(${flag}, ${length})`),
    /**
    * @param { number} flag}
    * @param { number} length}
    * @return {null | undefined}
    */
      
    currentFade:(flag, length) => fn(`currentFade(${flag}, ${length})`),
    /**
    * @param { number} length}
    * @return {null | undefined}
    */
      
    endsFade:(length) => fn(`endsFade(${length})`),
    /**
    * @param { AVLayer} layer}
    * @param { number} position}
    * @param { number} length}
    * @param { number} startOpacity}
    * @param { number} endOpadity}
    * @return {void}
    */
      
    videoFade:(layer, position, length, startOpacity, endOpadity) => fn(`videoFade(${layer}, ${position}, ${length}, ${startOpacity}, ${endOpadity})`),
    /**
    * @param { AVLayer} layer}
    * @param { number} position}
    * @param { number} length}
    * @param { number} startVolume}
    * @param { number} endVolume}
    * @return {void}
    */
      
    audioFade:(layer, position, length, startVolume, endVolume) => fn(`audioFade(${layer}, ${position}, ${length}, ${startVolume}, ${endVolume})`),
  }
}

module.exports = extendscriptPath
