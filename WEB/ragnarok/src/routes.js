import React from 'react';

import { BrowserRouter, Route} from 'react-router-dom';

import Cadastro from './pages/Cadastro';
import Main from './pages/Main';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/usuario/:id" component={Main} />
        </BrowserRouter>
    )

}