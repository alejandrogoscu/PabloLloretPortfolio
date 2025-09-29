import { motion } from 'framer-motion';

const Spinner = () => (
  <motion.div
    style={{
      border: '4px solid var(--orange)',
      borderTop: '4px solid. var(--orange)',
      borderRadius: '50%',
      width: 40,
      height: 40,
      margin: '2rem auto',
      display: 'block',
    }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
