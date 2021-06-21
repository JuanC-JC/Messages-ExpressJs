
//{message:'xxxxx',type:'error,good'}
const cModalInfo = (message,type,callback) =>{


    console.log('jodido papa')
    const cModal = document.createElement('div')
    cModal.classList.add('c-modalInfo')
    cModal.classList.add(`c-modalInfo--${type}`)

    document.body.addEventListener('keydown',preventKeys)
    
    let title; 

    switch(type){
        case 'good':
            title = 'Good!'
            break
        case 'warning':
            title = 'Warning!'
            break
        case 'error':
            title = 'Error!'
            break
    }

    const view = `  
                    <div class="l-modalInfo__container">
                        <div class="l-modalInfo__header"> 
                            <p> ${title} </p>  
                            <i id="closeModal" class="fas fa-times" ></i>
                        </div>

                        <div class="l-modalInfo__content"> 

                            <p class="c-modalInfo__message">${message}</p>

                            <div id="acceptModal" class="c-modalInfo__buttonOk c-button c-button--small">OK</div>

                        </div>


                    </div>`


    cModal.innerHTML = view

    const btnCloseModal = cModal.querySelector('#closeModal')
    const btnAcceptModal = cModal.querySelector('#acceptModal')


    btnCloseModal.addEventListener('click',closeModal)
    btnAcceptModal.addEventListener('click',closeModal)

        
    //hide the elements in the window
    document.body.style.overflow = 'hidden'


    //prevent all of keys except esc and enter
    function preventKeys(e){

        e.preventDefault()

        if(e.key == 'Escape' || e.key == 'Enter'){
            closeModal()
        }

    }

    function closeModal(){


        document.body.removeEventListener('keydown',preventKeys)
        document.body.style = ''
        cModal.remove()

        if(callback){
            callback()
        }
    }

    return cModal

}


export {cModalInfo}


