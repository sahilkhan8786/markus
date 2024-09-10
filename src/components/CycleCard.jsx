import { Html } from "@react-three/drei";
import cycleIamge from '../assets/cycle.jpeg';



function CycleCard({ setShowOverlay, id }) {
    function showOverlayHandler(id) {
        setShowOverlay(id)
    }

    return (
        <mesh position={[-60, 13, 70]} rotation={[0, Math.PI / 1.5, 0]} scale={[5, 5, 5]}

        >
            <group>
                <Html transform >
                    <div
                        className="  rounded-xl w-[200px] shadow-xl select-none flex flex-col gap-2 text-xs bg-white cursor-pointer hover:scale-110 transition overflow-hidden"
                        onClick={() => showOverlayHandler(id)}

                    >
                        <img src={cycleIamge} alt="" className="object-cover w-full" />
                        <h1 className="p-2 rounded-xl text-xs">Wir fahren mit dem Fahrrad!
                            Kleine VR Tour mit dem Fahrrad. Umweltfreundlich, gesund und gut für die Luft!</h1>

                    </div>
                </Html>
            </group>
        </mesh>
    )
}

export default CycleCard
