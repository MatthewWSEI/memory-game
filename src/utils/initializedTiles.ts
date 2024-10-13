import image1 from '../assets/images/redpanda1.jpg';
import image2 from '../assets/images/redpanda2.jpg';
import image3 from '../assets/images/redpanda3.jpg';
import image4 from '../assets/images/redpanda4.jpg';
import image5 from '../assets/images/redpanda5.jpg';
import image6 from '../assets/images/redpanda6.jpg';
import image7 from '../assets/images/redpanda7.jpg';
import image8 from '../assets/images/redpanda8.jpg';

interface Tile {
    id: number;
    image: string;
    isRevealed: boolean;
    isMatched: boolean;
}

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

export const initializeTiles = (numPairs: number): Tile[] => {
    const selectedImages = images.slice(0, numPairs);

    const tiles: Tile[] = selectedImages.flatMap((image, index) => [
        {
            id: index * 2 + 1,
            image,
            isRevealed: false,
            isMatched: false,
        },
        {
            id: index * 2 + 2,
            image,
            isRevealed: false,
            isMatched: false,
        },
    ]);

    return tiles.sort(() => 0.5 - Math.random());
};
