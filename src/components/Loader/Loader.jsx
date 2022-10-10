/**
 * @file Loader.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';
// import { useProgress } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';

import { useWindowSize } from '@/hooks/useWindowSize';
import styles from './Loader.module.css';

// Globals.assign({
//   frameLoop: 'always',
// })

const Loader = ({
  className = '',
  variant,
  children,
  visible = true,
  loadingComplete = false,
}) => {
  // const { active, progress } = useProgress();
  const { height } = useWindowSize();
  const baseClassName =
    'fixed inset-0 flex flex-col items-center justify-center w-full h-full text-black origin-top transform pointer-events-none z-loader bg-gray-e3 md:h-screen md:min-h-screen';

  console.log('loadingComplete', loadingComplete);
  console.log('visible', visible);
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro-scene"
          className="fixed inset-0 flex flex-col items-center justify-center w-full h-full text-black origin-top transform pointer-events-none z-loader bg-gray-e3 md:h-screen md:min-h-screen"
          initial={{
            // scaleY: 1,
            opacity: 0,
          }}
          animate={{
            // scaleY: 1,
            opacity: 1,
            transition: {
              duration: 1,
              ease: 'easeInOut',
            },
          }}
          exit={{
            // scaleY: 0,
            opacity: 0,
            transition: {
              delay: 1,
              duration: 0.65,
              ease: [0, 0.7, 0.29, 0.97],
            },
          }}
          style={{
            height,
          }}
        >
          <p>Loading...</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

Loader.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

Loader.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
};

export default Loader;
