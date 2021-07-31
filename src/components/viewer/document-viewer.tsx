import { Display } from "./Display";
import { ImageFormat } from "../ImageFormat";
import { ThumbnailView } from "./ThumbnailView";
import { useState } from "react";

export const DocumentViewer: React.FC<{ mode: 'single' | 'duo', images: string[], format: ImageFormat }> = (props) => {
    const [index, setIndex] = useState(0)
    return <div>
        <div style={{ width: '10%', float: 'left', backgroundColor: 'azure' }}>
            {props.images.length > 0 && <ThumbnailView selectedIndex={index} formatImage="base64" images={props.images} onChangePage={(index) => setIndex(index)} />}
        </div>
        <div style={{ width: '90%', float: 'right', backgroundColor: 'aliceBlue' }}>
            {props.images.length > 0 && <Display formatImage="base64" currentImage={props.images[index]} />}
        </div>
    </div>
}


