import React, { useState } from 'react';
import '../Styles/DefaultLayout.css'

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className={`logo ${isSidebarOpen ? 'open' : ''}`}>
            CASHIE
        </div>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <span class="open">{isSidebarOpen ? '<' : '>'}</span>
        </div>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </div>
      <div className="content">
        <h1>Dashboard Content</h1>
        {/* Place your dashboard content here */}
      </div>
    </div>
  );
};

export default DefaultLayout;