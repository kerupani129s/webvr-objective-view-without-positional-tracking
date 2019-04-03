AFRAME.registerComponent('objective', {

	schema: {
		r: {type: 'number', default: 2},
		position: {type: 'vec3'}
	},

	init: function () {

		const cameraEl = this.el;

		cameraEl.removeAttribute('wasd-controls');

		// A-Frame バグ対策
		cameraEl.sceneEl.addEventListener('exit-vr', function () {

			// Issue: https://github.com/aframevr/aframe/issues/3401#issuecomment-370119459
			cameraEl.object3D.position.set(0, 1.6, 0); // DEFAULT_CAMERA_HEIGHT: 1.6

			// Issue: https://github.com/aframevr/aframe/issues/3884
			cameraEl.object3D.rotation.z = 0;

		});

	},

	tick: function (time, timeDelta) {

		const data = this.data;

		const cameraObject3D = this.el.object3D;
		const rigObject3D = this.el.object3D.parent;

		// 
		const rotation = cameraObject3D.rotation;

		const x = data.position.x + data.r * Math.cos(rotation.x) * Math.sin(rotation.y);
		const z = data.position.z + data.r * Math.cos(rotation.x) * Math.cos(rotation.y);
		const y = data.position.y - data.r * Math.sin(rotation.x);

		rigObject3D.position.set(x, y - 1.6, z); // DEFAULT_CAMERA_HEIGHT: 1.6

		// update
		// これがないと次のフレームまで位置が正しく反映されない
		cameraObject3D.updateMatrix(); 

	}

});
