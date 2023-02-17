import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GraphicsView } from 'expo-graphics';
import { AR } from 'expo';

export default function ARViewer() {
  const [arInitialized, setArInitialized] = useState(false);
  const [text, setText] = useState('Initializing AR...');

  useEffect(() => {
    (async () => {
      AR.onSessionWasInterrupted(() => {
        setText('Session was interrupted');
      });
      AR.onSessionInterruptionEnded(() => {
        setText('Session interruption ended');
      });
      AR.onAnchorsDidUpdate(() => {
        setText('Anchors did update');
      });
      AR.onDidFailWithError((error) => {
        setText(`Error: ${error}`);
      });

      await AR.initializeAsync();
      setArInitialized(true);
    })();

    return async () => {
      AR.removeAllAnchors();
      AR.reset();
      setArInitialized(false);
    };
  }, []);

  function onContextCreate({ gl, scale, width, height }) {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    AR.setWorldOriginAsync([0, 0, 0]);

    const camera = new AR.Camera(width, height, 0.01, 1000);

    const renderer = new AR.GLViewRenderer(gl);
    renderer.render = () => {
      gl.endFrameEXP();
    };

    const scene = new AR.Scene();

    const objLoader = new AR.OBJLoader();
    objLoader.initWithFile('../../assets/bugatti.obj', '../../assets/bugatti.mtl', (err, objNode) => {
      if (err) {
        console.log('Error loading obj:', err);
        return;
      }

      scene.root.addChildNode(objNode);
    });

    AR.setIsPlaneDetectionEnabled(false);
    AR.setPlaneDetection(AR.PlaneDetectionTypes.None);

    AR.setRenderPipeline({
      render: (input) => {
        renderer.render(scene, camera);
      },
    });
  }

  return (
    <View style={styles.container}>
      <GraphicsView
        onContextCreate={onContextCreate}
        style={styles.graphicsView}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  graphicsView: {
    flex: 1,
  },
  text: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#FFFFFF',
  },
});
