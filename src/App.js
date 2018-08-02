import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Sobre from './Sobre';
import Produtos from './Produtos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
  }

  loadCategorias = () => {
    this.props.api.loadCategorias().then(res => {
      this.setState({
        categorias: res.data
      });
    });
  };

  removeCategoria = categoria => {
    this.props.api.deleteCategorias(categoria.id).then(res => {
      this.loadCategorias();
    });
  };

  createCategoria = categoria => {
    this.props.api.createCategoria(categoria).then(res => {
      this.loadCategorias();
    });
  };

  editCategoria = categoria => {
    this.props.api.editCategoria(categoria).then(res => {
      this.loadCategorias();
    });
  };

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a href="/" className="navbar-brand">
                Gerenciador de Produtos
              </a>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item ">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/produtos">
                      Produtos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sobre">
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <br />
          <br />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/sobre" component={Sobre} />
            <Route
              path="/produtos"
              render={props => {
                return (
                  <Produtos
                    {...props}
                    loadCategorias={this.loadCategorias}
                    createCategoria={this.createCategoria}
                    removeCategoria={this.removeCategoria}
                    editCategoria={this.editCategoria}
                    categorias={this.state.categorias}
                  />
                );
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
