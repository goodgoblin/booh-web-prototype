import React, { useState, useEffect } from 'react';

import BatWebPlayback from './BatWebPlayback'
import Songlist from './Songlist'

function HarukiMurakami(props) {
  return (
    <div className="haruki-main-contain">
      <BatWebPlayback token={props.token} />
      <Songlist token={props.token} />
    </div>
  );
}
export default HarukiMurakami;
