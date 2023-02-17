import React, { useRef } from 'react';
import { GLView } from 'expo-gl';
import { Renderer, Scene, PerspectiveCamera } from 'expo-three';
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


export default function ARViewer() {
  const renderer = useRef();
  const scene = useRef();
  const camera = useRef();
  const model = useRef();

  const onContextCreate = async (gl) => {
    renderer.current = new Renderer({ gl });
    renderer.current.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    scene.current = new THREE.Scene();

    camera.current = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    camera.current.position.z = 5;

    const objLoader = new OBJLoader();
    objLoader.load('models/my-model.obj', (loadedModel) => {
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const mesh = new THREE.Mesh(loadedModel, material);
      scene.current.add(mesh);
    });
  };

  const onRender = () => {
    renderer.current.render(scene.current, camera.current);
  };

  return (
    <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} onRender={onRender} />
  );
}
