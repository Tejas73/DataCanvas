import { useDataWorldmap } from "../hook/useData";
import { WorldmapMarks } from "../utils/Marks";

const width = 960;
const height = 550;

const Worldmap = () => {
    const data = useDataWorldmap();
    // console.log("data ",data)
    if (!data) {
        return <h1>Loading...</h1>
    }
    return <svg width={width} height={height}>
        <WorldmapMarks data={data} />
    </svg>
}

export default Worldmap;