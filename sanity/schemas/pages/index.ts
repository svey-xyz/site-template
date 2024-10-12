import { page } from './page';
import { archive } from './archive'
import { section } from './section'
import BLOCKS from './blocks';


const Pages = [page, archive, section, ...BLOCKS];

export default Pages;