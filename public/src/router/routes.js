import home from '../views/home.js'
import notFound from '../views/notFound.js'
import shopPage from '../views/shopPage.js'
import paymentPage from '../views/payment.js'

const routes = [
    {
        path: '',
        template: home,
    },
    {
        path: 'product',
        template: shopPage,
    },{
        path: 'payment',
        template: paymentPage,
    },
    {
        path: '404',
        template: notFound,
    }
];


export {routes}

