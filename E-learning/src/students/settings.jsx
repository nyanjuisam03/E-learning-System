import React, { useState, useEffect } from 'react';
import DarkModeToggle from './components/darktoggle';

const Settings = () => {
 

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <h2>Change appearance</h2>
        <DarkModeToggle/>
      </div>
    </div>
  );
};

export default Settings;
