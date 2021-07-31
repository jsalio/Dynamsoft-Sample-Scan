import { ImageFormat } from "../ImageFormat";
import { buildImage } from "../buildImage";
import { generateGuid } from "../generateGuid";


export const ThumbnailItem: React.FC<{ image: any; formatImage: ImageFormat; onSelectPage: () => void, isSelected: Boolean, index: number }> = (props) => {
    const image = buildImage(props.image)[props.formatImage];
    const styleSelected = {
        backgroundColor: props.isSelected && 'blue',
        border: props.isSelected && '2px solid',
        margin: '2px'
    }
    return <div style={styleSelected}>
        <input type='checkbox' style={{ float: 'left' }} />
        <img style={{ width: "150px" }} id={generateGuid()} src={image} alt={'thumb-view'} onClick={() => props.onSelectPage()} />
        <div> <span>{props.index + 1}</span></div>
    </div>;
};
