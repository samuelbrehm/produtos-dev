import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria';

class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingCategoria: ''
    };
  }

  componentDidMount() {
    this.props.loadCategorias();
  }

  editCategoria = categoria => {
    this.setState({
      editingCategoria: categoria.id
    });
  };

  cancelEditing = () => {
    this.setState({
      editingCategoria: ''
    });
  }

  renderCategorias = cat => {
    return (
      <li key={cat.id}>
        {this.state.editingCategoria === cat.id && (
          <div className='input-group'>
            <div className='input-group-btn'>
              <input ref={'cat-'+cat.id} onKeyUp={this.handleEditCategoria} className='form-control' type="text"
                     defaultValue={cat.categoria}/>
              <button className='btn' onClick={this.cancelEditing}>Cancel</button>
            </div>
          </div>
        )}
        {this.state.editingCategoria !== cat.id && (
          <div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => this.props.removeCategoria(cat)}
            >
              <i className="fas fa-trash-alt"/>
            </button>

            <button
              className="btn btn btn-outline-info btn-sm"
              onClick={() => this.editCategoria(cat)}
            >
              <i className="fas fa-edit"/>
            </button>
            <Link to={`/produtos/categoria/${cat.id} `}>{cat.categoria}</Link>
          </div>
        )}
      </li>
    );
  };

  handleNewCategoria = key => {
    if (key.keyCode === 13) {
      this.props.createCategoria({
        categoria: this.refs.categoria.value
      });
      this.refs.categoria.value = '';
    }
  };

  handleEditCategoria = key => {
    if (key.keyCode === 13) {
      this.props.editCategoria({
        id: this.state.editingCategoria,
        categoria: this.refs['cat-'+this.state.editingCategoria].value
      });
      this.setState({
        editingCategoria: ''
      })
    }
  };

  render() {
    const { match, categorias } = this.props;
    return (
      <div className="row">
        <div className="col-md-2">
          <h3>Categorias</h3>
          <ul style={{ listStyle: 'none', padding: 2 }}>
            {categorias.map(this.renderCategorias)}
          </ul>

          <div className="card card-body-sm bg-light">
            <input
              onKeyUp={this.handleNewCategoria}
              type="text"
              ref="categoria"
              placeholder="Nova Categoria"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-md-10">
          <h1>Produtos</h1>
          <Route exact path={match.url} component={ProdutosHome}/>
          <Route exact path={match.url + '/categoria/:catId'} component={Categoria}/>
        </div>
      </div>
    );
  }
}

export default Produtos;
