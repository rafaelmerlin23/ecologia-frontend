import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function WarningComponent({isActive}) {
  if(!isActive) return null
    return (
    <>
      <style>
        {`
          .warning-container {
            position: relative;
          }

          .warning-message {
            width: 100%;
            background-color: #8B0000; /* Red-800 */
            padding: 16px 24px;
            position: fixed;
            bottom: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            border-radius: 8px 8px 0 0; /* Añadir esquinas redondeadas */
          }

          .warning-icon {
            font-size: 24px;
            color: #FFD700; /* Yellow-600 */
          }

          .warning-text {
            font-size: 24px;
            color: white;
          }
        `}
      </style>

      <div className="warning-container">
        <motion.div
          className="warning-message"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }} 
           
          transition={{ duration: 0.7 }}         >
          <FontAwesomeIcon className="warning-icon" icon={faWarning} />
          <p className="warning-text">Error, La imagen ya existente</p>
        </motion.div>
      </div>
    </>
  );
}

export default WarningComponent;
