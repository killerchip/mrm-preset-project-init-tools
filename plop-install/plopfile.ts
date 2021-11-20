import { NodePlopAPI } from 'plop';

import plopCommand from './plops/plopCommand';
//--plop imports--

export default function (plop: NodePlopAPI) {
  plopCommand(plop);
  //--plop commands--
}
