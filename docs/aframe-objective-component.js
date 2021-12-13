AFRAME.registerComponent('objective', {

	dependencies: ['look-controls'],

	schema: {
		r: { type: 'number', default: 2 },
		position: { type: 'vec3' }
	},

	init() {

		const cameraEl = this.el;

		cameraEl.removeAttribute('wasd-controls');

		// A-Frame バグ対策
		cameraEl.sceneEl.addEventListener('exit-vr', () => {

			// Issue: https://github.com/aframevr/aframe/issues/3401#issuecomment-370119459
			cameraEl.object3D.position.set(0, 1.6, 0); // DEFAULT_CAMERA_HEIGHT: 1.6

			// Issue: https://github.com/aframevr/aframe/issues/3884
			cameraEl.object3D.rotation.z = 0;

		});

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

		// update
		// メモ: これがないと次のフレームまで位置が正しく反映されない
		cameraObject3D.updateMatrix();

	},

});
