import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import ExpoTHREE, { THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import { Asset } from 'expo-asset';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const Ar = () => {
  return (
    <GraphicsView
      onContextCreate={onContextCreate}
      onRender={onRender}
      onResize={onResize}
      isArEnabled
      isArRunningStateEnabled
      isArCameraStateEnabled
      isArTrackingStateEnabled
    />
  );
}

const onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
  // init renderer
  const renderer = new ExpoTHREE.Renderer({
    gl,
    pixelRatio,
    width,
    height,
  });
  renderer.setClearColor(0xffffff);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  // init scene
  const scene = new THREE.Scene();

  // init camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // init controls
  const controls = new OrbitControls(camera);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // load obj file
  const obj = await loadObjAsync();
  scene.add(obj);

  // render loop
  const render = () => {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };
  render();
}

const onRender = () => {
}

const onResize = ({ x, y, scale, width, height }) => {
}

const loadObjAsync = async () => {
  const objAsset = Asset.fromModule(require('../../assets/model.obj'));
  await objAsset.downloadAsync();
  const mtlAsset = Asset.fromModule(require('../../assets/model.mtl'));
  await mtlAsset.downloadAsync();

  const objLoader = new OBJLoader();
  const obj = objLoader.parse(objAsset.localUri);
  return obj;
}
