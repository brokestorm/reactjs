import React from 'react';
import PropTypes from 'prop-types';
import './Search.css'

class Search extends React.Component {
  
  render() {

    const { symbolInput, searchList } = this.props;
    return (
      <div className={"search-container"}>
        <form onSubmit={this.props.handleSubmit.bind(this)}>
          <input 
              type="text"
              list="data"
              required
              autoFocus
              placeholder="Type Here..."
              onChange={this.props.handleChange.bind(this)}
              value={symbolInput}
          />
          <datalist id="data">
            {searchList.map((data) =>
              <option key={data.symbol} value={data.symbol} onSubmit={this.props.handleSubmit.bind(this)}> {data.name} </option> )
            }
          </datalist>
        </form>
      </div>

    );
  }
}

Search.propTypes = {
  sym: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  searchList: PropTypes.array,
};

export default Search;