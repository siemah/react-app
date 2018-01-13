import React, { Component } from 'react';

export class Form extends Component {

  loading (e) {
    e.preventDefault()
    const target = e.target;
    this.props.onLoadData(target.location.value, target.action);
  }

  render () {
    const dataProps = this.props.data;
    return (
      <form action={dataProps.action} method="" onSubmit={ e => this.loading(e)} >
        <input type="text" name="location" placeholder="Location" />
        <button type="submit">{dataProps.status}</button>
      </form>
    );
  }

}
