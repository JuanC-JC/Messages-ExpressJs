// import home from '../views/home.js'
import {router} from './index-router.js'

const init = () => {

    router(window.location.hash);
    //con cada load se pierde este escuchado por eso se vuelve a agregar
    window.addEventListener("hashchange", () => {
      router(window.location.hash);
    });
  };


window.addEventListener('load', init);
