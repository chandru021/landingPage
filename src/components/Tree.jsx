import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const Tree = () => {
  const containerRef = useRef(null);
  let scene, camera, renderer, bridge;

  function load(path){
    const loader = new GLTFLoader();
    var a = new THREE.Group();
    loader.load(path,(gltf)=>{
    while(gltf.scene.children.length != 0){
            let x = gltf.scene.children[0];
            x.castShadow = true;
            a.add(x)    
        }
    })
    return a;
}

  useEffect(() => {
   
      const sizes = {
          width: window.innerWidth,
          height: window.innerHeight
        }
        let scroll = {
            x : -3,
            y : 0
        }
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 5;
        camera.lookAt(new THREE.Vector3(1,-1,-3))
        
    
    window.addEventListener('scroll',()=>{
        scroll.x = window.scrollX / window.innerWidth;
        scroll.y = window.scrollY / window.innerHeight;
        console.log(scroll)
    })
        window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0xffffff)
    containerRef.current.appendChild(renderer.domElement);


    renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMappingExposure = 3

   

const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2)
pointLight.position.set(1.8, - 0.6, -4)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 1, 10, 2)
pointLight2.position.set(1.8, - 0.6, -4.6)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 1, 10, 2)
pointLight3.position.set(1.8, - 0.9, -3)
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight(0xffffff, 1, 10, 2)
pointLight4.position.set(1.8, - 0.9, -8)
scene.add(pointLight4)

    bridge = load("bridge3.glb")
    bridge.rotation.y = Math.PI / 2;
    bridge.scale.set(0.2,0.2,0.2)
    bridge.position.set(2,-2,-2)
    scene.add(bridge);
   
  

    
    
    const temp = new THREE.AmbientLight(0xffffff,0.8)
    scene.add(temp)
    
    const animate = () => {

        
        if(scroll.y < 1.5){
            camera.position.x = Math.min(2.1 , scroll.y * 1.5)
            camera.position.y = Math.max(scroll.y * -0.7 , -0.9)
        }
        camera.position.z = Math.max(-9, scroll.y*-2)
        requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up functionfencod
    return () => {
      containerRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};

export default Tree;
