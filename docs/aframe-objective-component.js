AFRAME.registerComponent('objective', {

	schema: {
		r: {type: 'number', default: 2},
		position: {type: 'vec3'}
	},

	init: function () {
		this.el.removeAttribute('wasd-controls');
	},

	tick: function (time, timeDelta) {

		const data = this.data;
		const object3D = this.el.object3D;

		// 
		const position = object3D.position;
		const rotation = object3D.rotation;

		const x = data.position.x + data.r * Math.cos(rotation.x) * Math.sin(rotation.y);
		const z = data.position.z + data.r * Math.cos(rotation.x) * Math.cos(rotation.y);
		const y = data.position.y - data.r * Math.sin(rotation.x);

		position.set(x, y, z);

	}

});
