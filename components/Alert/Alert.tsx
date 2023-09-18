import { motion } from "framer-motion";

const AnimateVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const Alert: React.FC<{ type: "success" | "danger" }> = ({ type }) => {
  return (
    <>
      {type === "success" ? (
        <>
          <motion.div
            variants={AnimateVariant}
            initial="hidden"
            exit="exit"
            animate="visible"
            className="alert w-[80%] fixed top-[10px] right-[10%] alert-success shadow-lg"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">Your post added successfully!</span>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            variants={AnimateVariant}
            initial="hidden"
            exit="exit"
            animate="visible"
            className="alert w-[80%] fixed top-[10px] right-[10%] alert-error shadow-lg"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">Error! Title are required.</span>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Alert;
