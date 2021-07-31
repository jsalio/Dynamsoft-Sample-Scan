import { ImageFormat } from "../ImageFormat";
import { buildImage } from "../buildImage";
import { generateGuid } from "../generateGuid";


export const Display: React.FC<{ formatImage: ImageFormat; currentImage: string; }> = (props) => {
    const image = buildImage(props.currentImage)[props.formatImage];
    return <img id={generateGuid()} style={{ width: '600px' }} src={image} alt={'mage-container'} />;
};
