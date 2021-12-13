AFRAME.registerComponent('objective', {

	dependencies: ['look-controls'],

	schema: {
		r: { type: 'number', default: 2 },
		position: { type: 'vec3' }
	},

	init() {

		const cameraEl = this.el;

		cameraEl.removeAttribute('wasd-controls');

	},

	tick(time, timeDelta) {

		const data = this.data;

		const cameraObject3D = this.el.object3D;
		const rigObject3D = this.el.object3D.parent;

		// 
		const vector = new THREE.Vector3(0, 0, 2);
		const quaternion = cameraObject3D.quaternion;

		vector.applyQuaternion(quaternion);
		rigObject3D.position.copy(vector);
		rigObject3D.position.sub(cameraObject3D.position);

	},

});
