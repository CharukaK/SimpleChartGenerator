import React from 'react';
import PropTypes from 'prop-types';
// import Topographies from './Topographies';
// import Topography from './Topography';
import Projection from './Projection';

// import ProjectionConfig from './ProjectionConfig';

class Map extends React.Component {
    constructor(props) {
        super(props);

    }

    projection(width, height, config) {
        return Projection(width, height, config);
    }

    render() {

        return (
            <svg width={this.props.width} height={this.props.height}
                 viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
                {/*{React.cloneElement(this.props.children[0], {*/}
                    {/*projection: this.projection(this.props.width, this.props.height, this.props.config)*/}

                {/*})}*/}

                {
                    Array.isArray(this.props.children) ?
                        this.props.children.map((child, i) => (
                            React.cloneElement(child, {
                               projection: this.projection(this.props.width, this.props.height, this.props.config),
                               key:'mapchild-'+i
                            })
                        )) :

                        React.cloneElement(this.props.children, {
                            projection: this.projection(this.props.width, this.props.height, this.props.config)

                        })

                }

            </svg>
        );
    }
}


Map.defaultProps = {
    width: 800,
    height: 450
};

Map.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children:PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element
    ]).isRequired,
    config:PropTypes.array

};


export default Map;