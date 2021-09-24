import React from 'react';
import Logo from '../Logo.png';

const LogoComponent: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <img src={Logo} alt="Logo" />
    </div>
  );
};

export default LogoComponent;
