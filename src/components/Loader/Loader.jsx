import React, { Component } from 'react';
import { Circles } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <Circles
        height="80"
        width="80"
        color="#0a1897"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }
}
