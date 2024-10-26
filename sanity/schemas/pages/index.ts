import { page } from './page';
import { archive } from './archive'
import BLOCKS from './blocks';


const Pages = [page, archive, ...BLOCKS];

export default Pages;