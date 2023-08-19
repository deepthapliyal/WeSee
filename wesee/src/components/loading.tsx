import React from 'react';
import Image from 'next/image';


const Loading: React.FC = () => {
  return (
    <>
      <div className='h-screen flex items-center justify-center'>
          <Image
            className='cursor-wait'
            src="/assets/loading.gif"
            alt="loading"
            width={200}
            height={200}
          />
      </div>
    </>
  );
};

export default Loading;
