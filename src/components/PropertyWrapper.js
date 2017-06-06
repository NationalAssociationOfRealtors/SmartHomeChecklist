import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import _ from 'lodash';

class PropertyWrapper extends Component {
  state = {}

  constructor(props) {
    super(props);

    const property = this.getProperty();

    if (property) {
      this.state = {
        editing: false,
        propertyName: property.name
      };
    };
  }

  getProperty() {
    const { params: { propertyId }, properties } = this.props;

    return properties[propertyId];
  }

  componentWillMount() {
    if (!this.getProperty()) {
      browserHistory.push('/');
    };
  }

  isChecklistRoute() {
    // Checks URL to see if its /property/:propertyId
    let {pathname} = this.props.location;
    let count = (pathname.match(/\//g) || []).length;

    if (count === 2) {
      return true;
    }

    return false;
  }

  editProperty() {
    this.setState({
      editing: true
    });
  }

  handleNameChange(event) {
    this.setState({
      propertyName: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const {propertyId} = this.props.params;
    const {methods} = this.props;
    const {propertyName} = this.state;

    methods.renameProperty(propertyId, propertyName, () => {
      this.setState({
        editing: false
      });
    });
  }

  render() {
    const propertyId = this.props.params.propertyId;
    const property = this.getProperty();

    if (!property) {
      return null;
    };

    const propsForChildren = {...this.props, propertyId, property};
    const containerClass = this.state.editing ? 'editing' : '';

    if (!_.isEmpty(this.props.products)) {
      const childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, propsForChildren);
      });

      return (
        <div>
          <div className="PropertyWrapper-header">
            <div className="container">
              <div className="inner">
                {this.isChecklistRoute() &&
                  <form onSubmit={(e) => this.onSubmit(e)} className={`RenameProperty ${containerClass}`}>
                    <a className="onBlur editable" onClick={() => { this.editProperty()}}>{property.name}</a>

                    <input type="text"
                      value={this.state.propertyName}
                      onChange={(e) => this.handleNameChange(e)}
                      className="onFocus"
                      required
                      />

                    <input type="submit" className="onFocus" value="Save" />
                  </form>
                }

                {!this.isChecklistRoute() &&
                  <Link to={`/property/${propertyId}`}>{property.name}</Link>
                }
              </div>
            </div>
          </div>

          {childrenWithProps}
        </div>
      );
    } else {
      return (
        <div className="App-connection-error">
          No internet connection detected.
          <br />
          <a href="/">Refresh page</a>
        </div>
      );
    }
  }
}

export default PropertyWrapper;
