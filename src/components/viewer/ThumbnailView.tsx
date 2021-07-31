import { ThumbnailItem } from "./ThumbnailItem";
import { ImageFormat } from "../ImageFormat";
import './Thumbnail.css'

export const ThumbnailView: React.FC<{ images: string[]; formatImage: ImageFormat; onChangePage: (index: number) => void, selectedIndex: number }> = (props) => {

    return <div style={{ textAlign: 'center', margin: '5px', border: '1px solid' }}>
        <div className='tab'>
            <button className='tablinks'>x</button>
            <button className='tablinks'>y</button>
        </div>
        {props.images.map((image, index) => (<ThumbnailItem isSelected={props.selectedIndex === index} index={index} formatImage={props.formatImage} key={index} image={image} onSelectPage={() => props.onChangePage(index)} />))}
    </div>;
};
