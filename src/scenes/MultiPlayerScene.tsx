"use client"
import SimpleScene from '@/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group, Raycaster, Vector2, Color, ColorRepresentation, Vector3 } from 'three'
import { MapControls, OrbitControls, TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/sceneHelpers'
import { getObjectsFromSupabase, saveObjectsToSupabase } from '../../scripts/service'
import { useSession } from 'next-auth/react'
import { useThree } from '@react-three/fiber'

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export interface MultiPlayerSceneHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => Object3D
  saveObjects: () => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
  autorotate: () => void
  getSceneObjects: () => Object3D[]
}

const CONST_HOUSE = [
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[2,2,2],"color":"ffffff"},
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[5.912293923443534,0.145726403683075,5.912293923443534],"color":"00ff00"},
  {"position":[0,0.8961489054206201,0],"rotation":[0,0,-0.738686876404],"scale":[1.4903938669662014,1.2279975985060276,1.4903938669662014],"color":"ff9900"},
  {"position":[0,0,0.7606092665102162],"rotation":[0,0,0],"scale":[0.6488370605796285,1.3001379183262618,0.6488370605796285],"color":"333333"}
]

type TransformMode = 'move' | 'scale' | 'rotate';

interface MultiPlayerSceneProps {
  selectedObject: Object3D | null
  setSelectedObject: (object: Object3D | null) => void
  transformMode?: TransformMode
  color: string
  isAdding?: boolean
  setIsAdding: (isAdding: boolean) => void
  friends?: Friend[]
  deleteMode?: boolean
}

const STORAGE_KEY = 'multiplayer_scene'
const MultiPlayerScene = forwardRef<MultiPlayerSceneHandle, MultiPlayerSceneProps>((props, ref) => {
  const { isAdding = false, setIsAdding, selectedObject, setSelectedObject, transformMode = 'move', color, friends = [], deleteMode = false } = props
  const sceneRef = useRef<Group>(null)
  const mapControlsRef = useRef<typeof OrbitControls>(null)
  const { data: session } = useSession()
  const [autoRotating, setAutoRotating] = useState(false)

  const getStorageKey = () => {
    if (friends.length > 1) {
      const otherFriends = friends.slice(1);
      const friendIds = otherFriends.map(f => f.id).sort().join(',');
      // if session then email, else ip
      const myid = session ? session.user?.email : friends[0].id;
      return `${STORAGE_KEY}>>>${myid},${friendIds}`;
    }
    // console.log('no friends, using storage key', STORAGE_KEY);
    return STORAGE_KEY;
  };

  const loadSupabaseObjects = async (sceneRef: React.RefObject<Group>) => {
    const objects = await getObjectsFromSupabase(getStorageKey());
    // console.log('objects', objects);
    const objectsData = objects.data;
    // load objects into scene
    objectsData.forEach((object: any) => {
      const mesh = createObject(object.position, object.scale, object.rotation, "#"+object.color, sceneRef, setIsAdding, setSelectedObject, isAdding);
      // Ensure shadows are enabled
      if (mesh instanceof Mesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    setSelectedObject(null);
    setIsAdding(false);
  }

  // Load objects when the component mounts and scene is ready
  useEffect(() => {
    // Flag to prevent double loading
    let hasLoaded = false;
    
    // Check if the scene is available now
    if (sceneRef.current) {
      // Clear existing objects first
      while (sceneRef.current.children.length > 1) { // Keep the floor
        const child = sceneRef.current.children[1];
        sceneRef.current.remove(child);
      }
      // Reset selected object
      setSelectedObject(null);
      setIsAdding(false);
      // Load objects with the new storage key
      loadSupabaseObjects(sceneRef);
      hasLoaded = true;
    } else {
      // Use requestAnimationFrame for a more efficient approach than setTimeout
      const checkSceneReady = () => {
        if (sceneRef.current && !hasLoaded) {
          // Clear existing objects first
          while (sceneRef.current.children.length > 1) { // Keep the floor
            const child = sceneRef.current.children[1];
            sceneRef.current.remove(child);
          }
          loadSupabaseObjects(sceneRef);
          hasLoaded = true;
        } else if (!hasLoaded) {
          requestAnimationFrame(checkSceneReady);
        }
      };
      requestAnimationFrame(checkSceneReady);
    }
    
    return () => {
      hasLoaded = true; // Prevent loading if unmounted
    };
  }, [friends]);
  
  // Create object wrapper to use shared function
  const handleCreateObject = (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => {
    return createObject(
      position, 
      scale,
      rotation,
      color, 
      sceneRef, 
      setIsAdding, 
      setSelectedObject, 
      isAdding
    );
  }

  // Save objects wrapper to use shared function
  const handleSaveObjects = async () => {
    const objects = saveObjects(sceneRef, getStorageKey());
    // also save to supabase
    const res = await saveObjectsToSupabase(objects, getStorageKey());
    // console.log('res', res);
  }
  const handleResetScene = () => {
    // clear scene
    sceneRef.current?.clear();
  }
  const handleCopyContent = () => {
    // copy content
    // console.log('copy content') 
    // copy json but like they are saved to supabase content to clipboard
    const objects = saveObjects(sceneRef, getStorageKey());
    const json = JSON.stringify(objects);
    navigator.clipboard.writeText(json);
  }

  const handlePasteContent = async () => {
    // Reset the scene first
    // handleResetScene();
    
    try {
      // Check if we have a selected template
      const selectedTemplate = localStorage.getItem('selectedTemplate');
      
      if (selectedTemplate) {
        // Clear localStorage item
        localStorage.removeItem('selectedTemplate');
        
        // Load the predefined template based on the name
        let templateData;
        
        switch (selectedTemplate) {
          case 'const_house':
            templateData = [
              {"position":[0,0,0],"rotation":[0,0,0],"scale":[2,2,2],"color":"ffffff"},
              {"position":[0,0,0],"rotation":[0,0,0],"scale":[5.912293923443534,0.145726403683075,5.912293923443534],"color":"00ff00"},
              {"position":[0,0.8961489054206201,0],"rotation":[0,0,-0.738686876404],"scale":[1.4903938669662014,1.2279975985060276,1.4903938669662014],"color":"ff9900"},
              {"position":[0,0,0.7606092665102162],"rotation":[0,0,0],"scale":[0.6488370605796285,1.3001379183262618,0.6488370605796285],"color":"333333"}
            ]
            break;
            
          case 'garden_parkour':
            templateData = [{"position":[0,0,0],"rotation":[0,0,0],"scale":[2,2,2],"color":"ffffff"},{"position":[0,0,0],"rotation":[0,0,0],"scale":[5.912293923443534,0.145726403683075,5.912293923443534],"color":"00ff00"},{"position":[0,0.8961489054206201,0],"rotation":[0,0,-0.738686876404],"scale":[1.4903938669662014,1.2279975985060276,1.4903938669662014],"color":"ff9900"},{"position":[0,0,0.7606092665102162],"rotation":[0,0,0],"scale":[0.6488370605796285,1.3001379183262618,0.6488370605796285],"color":"333333"},{"position":[0,-0.7356989341079678,2.4017767992152743],"rotation":[0,0,0],"scale":[10.703530107589339,1.509683239543188,8.084563274153474],"color":"199a44"},{"position":[0,-0.9311828651699345,8.660382139830945],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"},{"position":[-2.839680508664305,-2.147064302365713,10.907028190676948],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"},{"position":[-6.553917521398665,-2.909515688359245,10.755747939395269],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"},{"position":[-8.821817165585376,-3.9185418522769293,8.303923837322905],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"},{"position":[-7.857036579331503,-4.704602219767867,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"},{"position":[0,0.7401775158267299,5.878612584596645],"rotation":[0.14620855273283584,0.06691540315452627,0.015981981844789984],"scale":[0.3817835073872652,1.9938676057696134,0.3817835073872652],"color":"a26825"},{"position":[0,1.6969866469557457,6.031281377643768],"rotation":[0,0,0],"scale":[1.1541476468586622,1.1541476468586622,1.588230490681298],"color":"70a225"},{"position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"0000ff"},{"position":[-9.974146483358634,-3.7606440572785997,4.089751196527242],"rotation":[0,0,0],"scale":[1,1,1],"color":"0000ff"},{"position":[-9.247837183429137,-4.269706439861943,5.251169513072078],"rotation":[0,0,0],"scale":[1,1,1],"color":"0000ff"},{"position":[-6.748728697492558,-5.950463790528658,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"72ac2a"},{"position":[-3.7721442388426816,-4.884143240012141,-4.483297396217591],"rotation":[-2.4525771739319406,0.9715599535573657,2.6297609895997587],"scale":[2.9747315271840256,2.9747315271840256,14.149132124662621],"color":"72ac2a"},{"position":[-7.383490830656415,-6.1767416902987256,1.996539109297205],"rotation":[0,0,0],"scale":[0.7887055245800305,0.5230260368408406,0.7887055245800305],"color":"ff006f"},{"position":[-1.9122150713904271,-0.20835759177290125,-5.863918624093314],"rotation":[0,0,0],"scale":[1,5.3322192661873125,1],"color":"a5651d"},{"position":[-5.557772000321055,-1.9548201702244743,-3.1190937245612798],"rotation":[0,0,0],"scale":[1.6046255543234111,5.654619246273854,1.6046255543234111],"color":"a5651d"},{"position":[-5.786092008179452,2.5475953603947383,-3.1289606442495934],"rotation":[-0.0969720765487077,0.029436045916196096,-0.08152744758727472],"scale":[2.7597546897345304,4.568076429885781,2.7597546897345304],"color":"1e7b46"},{"position":[-1.7541682894281148,2.4041666721347843,-5.8306859851015815],"rotation":[-0.0036311157368923903,0.5237977552553248,-0.33254551283626554],"scale":[2.730187975450844,3.7432318373818925,2.730187975450844],"color":"1e7b46"},{"position":[0,-1.02012500526454,-3.9312412755540858],"rotation":[-0.34117551994524165,0,0],"scale":[1,1,1],"color":"a6ff00"}]
            break;
            
          case 'mountain_view':
            templateData = [{"position":[-5.25,3,-9],"rotation":[0,0,0],"scale":[4.5,6,4.5],"color":"888888"},{"position":[-5.25,3,-9],"rotation":[0,0,0],"scale":[4.5,6,4.5],"color":"888888"},{"position":[5.25,4.5,-10.5],"rotation":[0,0,0],"scale":[3.75,9,3.75],"color":"999999"},{"position":[0,5.25,-13.5],"rotation":[0,0,0],"scale":[6.75,10.5,6.75],"color":"777777"},{"position":[-7.5,4,-11],"rotation":[0.1,0.2,0],"scale":[2,8,2],"color":"7a7a7a"},{"position":[-3,6,-14],"rotation":[0.15,-0.1,0.05],"scale":[2.5,7,1.8],"color":"838383"},{"position":[3,7,-15],"rotation":[-0.1,0.15,0.1],"scale":[1.8,9,1.5],"color":"767676"},{"position":[7,3,-12],"rotation":[0.05,0.1,-0.05],"scale":[2.2,6,1.7],"color":"828282"},{"position":[-2,8,-11.5],"rotation":[0.2,0,-0.1],"scale":[1.5,4,1.3],"color":"6a6a6a"},{"position":[4,5.5,-9.5],"rotation":[-0.1,-0.15,0],"scale":[1.7,5,1.4],"color":"858585"},{"position":[2.25,0.75,-1.5],"rotation":[0,0,0],"scale":[1.5,0.375,1.5],"color":"b9a184"},{"position":[4.5,1.5,-3],"rotation":[0,0.2,0],"scale":[1.125,0.3,1.125],"color":"b9a184"},{"position":[3,2.25,-5.25],"rotation":[0,0,0.1],"scale":[0.9,0.3,0.9],"color":"b9a184"},{"position":[0,3,-6.75],"rotation":[0,0,0],"scale":[1.125,0.3,1.125],"color":"b9a184"},{"position":[-3,3.75,-6],"rotation":[0,0,-0.1],"scale":[0.9,0.225,0.9],"color":"b9a184"},{"position":[-4.5,5.25,-4.5],"rotation":[0,0,0],"scale":[0.75,0.225,0.75],"color":"b9a184"},{"position":[-2.25,6,-3],"rotation":[0,0,0],"scale":[0.9,0.225,0.9],"color":"b9a184"},{"position":[0.75,7.5,-3.75],"rotation":[0,0,0],"scale":[0.75,0.225,0.75],"color":"b9a184"},{"position":[3.75,1.875,-4.125],"rotation":[0,0,0],"scale":[0.15,0.75,0.15],"color":"643200"},{"position":[3.75,2.625,-4.125],"rotation":[0,0,0],"scale":[0.75,0.75,0.75],"color":"2d6a4f"},{"position":[-3,4.5,-5.25],"rotation":[0.2,0,0],"scale":[0.15,1.125,0.15],"color":"643200"},{"position":[-3.75,4.2,-6],"rotation":[0,0,0],"scale":[0.3,0.3,0.3],"color":"ffcc00"},{"position":[-1.5,6.45,-3],"rotation":[0,0,0],"scale":[0.375,0.375,0.375],"color":"ffcc00"},{"position":[-0.375,4.875,-3.75],"rotation":[0,0.5,0.1],"scale":[2.25,0.15,0.375],"color":"8d6e63"},{"position":[-3.375,5.55,-3.75],"rotation":[0,0.2,0.05],"scale":[1.5,0.15,0.3],"color":"8d6e63"},{"position":[2.25,3,-8.25],"rotation":[0.3,0.2,0.1],"scale":[1.125,0.75,1.125],"color":"57534e"},{"position":[-1.5,4.5,-9],"rotation":[-0.1,-0.2,0.1],"scale":[0.9,0.6,0.9],"color":"57534e"},{"position":[0.75,6.75,-6.75],"rotation":[0.2,0.3,0.1],"scale":[0.6,0.45,0.6],"color":"57534e"},{"position":[0,9,-6],"rotation":[0,0,0],"scale":[1.5,0.375,1.5],"color":"90caf9"},{"position":[0,9.6,-6],"rotation":[0,0,0],"scale":[0.375,0.75,0.375],"color":"ffcc00"},{"position":[0,0,0],"rotation":[0,0,0],"scale":[1.6064627981569832,1.6064627981569832,1.6064627981569832],"color":"d6d6ff"},{"position":[0,0,0],"rotation":[0,0,0],"scale":[7.293430777555192,1,7.40871325740744],"color":"ffffff"},{"position":[3.007786805650126,0.6451367499975595,-3.4659097483133943],"rotation":[0,0,0],"scale":[1,2.634357385891563,1],"color":"9e7f29"},{"position":[2.5994180927491657,2.173198563820751,-7.021735367846275],"rotation":[0,0,0],"scale":[1,1,1],"color":"9090a2"},{"position":[-2.340315884527245,2.9125966618396752,-6.215930454897527],"rotation":[0,0,0],"scale":[0.6451487024106918,0.6451487024106918,0.6451487024106918],"color":"aa9e55"},{"position":[-5.294931950277659,4.650406474236801,-4.8978913282845955],"rotation":[0,0,0],"scale":[1,0.22125167502101625,1],"color":"f9d77b"},{"position":[-0.3344402389136385,7.498801597040584,-5.390612100345711],"rotation":[0.23747679157238372,0,0],"scale":[0.5415100664804049,0.2805372707317362,5.387673038565984],"color":"c26814"},{"position":[-0.40743516212775877,2.734910764527899,3.309078465049014],"rotation":[0,0,0],"scale":[2.583707499974447,1.695605268815565,0.16139559489483885],"color":"ffdac2"},{"position":[-1.4125585526710362,1.1529809942649227,3.300083198685026],"rotation":[0,0,0],"scale":[0.09627738874589405,1.9869103516505875,0.09627738874589405],"color":"ffdac2"},{"position":[0.7426729464018558,1.172562569336541,3.315556519260766],"rotation":[0,0,0],"scale":[0.06194815863728011,1.8635702318031748,0.06194815863728011],"color":"ffdac2"},{"position":[1.604823582268245,8.701745969660916,-7.472449913973698],"rotation":[0,0,0],"scale":[0.500992122567206,0.17724036352128494,0.500992122567206],"color":"a3f3f5"},{"position":[1.4064457443615048,8.298802342536375,-7.208933238224936],"rotation":[0,0,0],"scale":[0.47160188515869966,0.47160188515869966,0.47160188515869966],"color":"a1c4b8"},{"position":[3.471217115092584,5.841759900743868,-10.020600138380939],"rotation":[0.005912201652498055,-0.09063193519210996,-0.06477456787091264],"scale":[1.487075520021273,10.020326464265825,1.487075520021273],"color":"858593"},{"position":[-2.6664597900009746,1.685735711704476,-9.870013913634569],"rotation":[0,0,0],"scale":[1.1271377070446211,5.016814168705493,1.1271377070446211],"color":"858593"},{"position":[-2.8660796556340182,1.41758965070298,-8.726470145787204],"rotation":[0.4020646434799646,0.03241309769871829,0.05775280501309669],"scale":[1.0610646209389731,3.9862973195137816,1.0610646209389731],"color":"858593"}]
            break;
            
          case 'city_block':
            templateData = [
              { position: [0, 0, 0], scale: [20, 0.1, 20], rotation: [0, 0, 0], color: "aaaaaa" }, // street
              { position: [-5, 2, -5], scale: [3, 4, 3], rotation: [0, 0, 0], color: "6688aa" }, // building
              { position: [5, 3, -5], scale: [3, 6, 3], rotation: [0, 0, 0], color: "bb9988" }, // building
              { position: [-5, 4, 5], scale: [3, 8, 3], rotation: [0, 0, 0], color: "dddddd" }, // skyscraper
              { position: [5, 1.5, 5], scale: [3, 3, 3], rotation: [0, 0, 0], color: "99aa88" }, // building
            ];
            break;
            
          default:
            // If no valid template, fall back to clipboard paste
            templateData = null;
        }
        
        // If we have template data, use it
        if (templateData && sceneRef.current) {
          // Clear existing objects
          while (sceneRef.current.children.length > 1) { // Keep the floor
            const child = sceneRef.current.children[1];
            sceneRef.current.remove(child);
          }
          
          // Create objects from the template
          templateData.forEach((object: any) => {
            createObject(
              object.position, 
              object.scale, 
              object.rotation, 
              "#" + object.color, 
              sceneRef, 
              setIsAdding, 
              setSelectedObject, 
              isAdding
            );
          });
          
          // Save the imported objects
          handleSaveObjects();
          
          // Reset selection
          setSelectedObject(null);
          setIsAdding(false);
          
          return; // Exit early
        }
      }
      
      // If no template or template data, fall back to clipboard paste
      const clipboardText = await navigator.clipboard.readText();
      const objects = JSON.parse(clipboardText);
      
      // Clear existing objects
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 1) { // Keep the floor
          const child = sceneRef.current.children[1];
          sceneRef.current.remove(child);
        }
        
        // Import objects from clipboard
        objects.forEach((object: any) => {
          createObject(
            object.position, 
            object.scale, 
            object.rotation, 
            "#" + object.color, 
            sceneRef, 
            setIsAdding, 
            setSelectedObject, 
            isAdding
          );
        });
      }
      
      // Save the imported objects
      handleSaveObjects();
      
      // Reset selection
      setSelectedObject(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error pasting content:', error);
    }
  }
  
  const handleAutorotate = () => {
    setAutoRotating(prevState => !prevState);
  }

  // Enable/disable autorotation when the autoRotating state changes
  useEffect(() => {
    if (mapControlsRef.current) {
      // @ts-ignore - OrbitControls does have the autoRotate property
      mapControlsRef.current.autoRotate = autoRotating;
      // @ts-ignore - Set a slow rotation speed
      mapControlsRef.current.autoRotateSpeed = 1.0;
    }
  }, [autoRotating]);
  
  if (selectedObject && selectedObject instanceof Mesh && selectedObject.material instanceof MeshStandardMaterial) {
    selectedObject.material.color.set(color);
  }
  
  useImperativeHandle(ref, () => ({
    createObject: handleCreateObject,
    saveObjects: handleSaveObjects,
    resetScene: handleResetScene,
    copyContent: handleCopyContent,
    pasteContent: handlePasteContent,
    autorotate: handleAutorotate,
    getSceneObjects: () => {
      if (!sceneRef.current) return []
      return [...sceneRef.current.children]
    }
  }))
  
  
  
  
  
  
  

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <SimpleScene>
        <CameraClickControls sceneRef={sceneRef} mapControlsRef={mapControlsRef} deleteMode={deleteMode} />
        {/* @ts-ignore */}
        <MapControls enablePan={!isAdding} minDistance={0.1} maxDistance={50} ref={mapControlsRef} />
        {/* <OrbitControls enableRotate={!isAdding} ref={mapControlsRef} /> */}
        <group ref={sceneRef}>
          {selectedObject && (
            <TransformControls 
              object={selectedObject} 
              mode={getTransformMode(transformMode)} 
              onPointerDown={(e) => {
                e.stopPropagation()
              }}
            />
          )}
        </group>
      </SimpleScene>
    </div>
  )
})

MultiPlayerScene.displayName = 'MultiPlayerScene'

export default MultiPlayerScene 


const CameraClickControls = ({sceneRef, mapControlsRef, deleteMode}: {sceneRef: React.RefObject<Group>, mapControlsRef: React.RefObject<typeof OrbitControls>, deleteMode: boolean}) => {
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
          console.log('object is a mesh')
          // if isdeleting then delete the object
          if (deleteMode) {
            object.parent?.remove(object)
            console.log('object is a mesh', object)
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

