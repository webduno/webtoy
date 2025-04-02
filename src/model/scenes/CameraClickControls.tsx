import { useEffect } from 'react'
import { Group, Mesh, Raycaster, Vector2 } from 'three'
import { OrbitControls } from '@react-three/drei'
import { saveObjects } from '@/scripts/helpers/sceneHelpers'


export const CameraClickControls = ({sceneRef, mapControlsRef, deleteMode, mainkey}: {
  sceneRef: React.RefObject<Group>, 
  mapControlsRef: React.RefObject<typeof OrbitControls>, 
  deleteMode: boolean,
  mainkey: string
}) => {
  const handleClick = (event: MouseEvent) => {
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      // @ts-ignore
      raycaster.setFromCamera(mouse, mapControlsRef.current?.object)
      // @ts-ignore
      const intersects = raycaster.intersectObjects(sceneRef.current?.children, true)
      if (intersects.length > 0) {
        const object = intersects[0].object
        if (object instanceof Mesh) {
          // console.log('object is a mesh', deleteMode)
          // if isdeleting then delete the object
          if (deleteMode) {
            object.parent?.remove(object)
            // console.log('object is a mesh', object)
            // Save the scene after deletion
            if (sceneRef.current) {
              saveObjects(sceneRef, mainkey);
            }
          }
        }
      }
    }
  }
  
  //add raycaster to detect clicks on the canvas
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('click', handleClick)
      
      // Clean up the event listener when component unmounts or deleteMode changes
      return () => {
        canvas.removeEventListener('click', handleClick)
      }
    }
  }, [deleteMode])  
  return null
} 