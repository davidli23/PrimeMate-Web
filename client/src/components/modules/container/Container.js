import React from 'react';

import './_container.scss';

const Container = (props) => {
	return <div className="container">{props.children}</div>;
};

export default Container;
