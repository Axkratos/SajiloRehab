import { CheckCircle, FitnessCenter, Healing, Timer } from "@mui/icons-material";
import rehabImg from "../../assets/bb.webp"; // Assuming you have a suitable image for rehabilitation
import { checklistItems } from "../../constants";

const Workflow = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Accelerate your{" "}
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          rehabilitation journey.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <img src={rehabImg} alt="Rehabilitation" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                {index === 0 ? <Healing /> : null} {/* Healing for injury recovery */}
                {index === 1 ? <FitnessCenter /> : null} {/* Fitness for exercise */}
                {index === 2 ? <Timer /> : null} {/* Timer for progress tracking */}
                {index > 2 ? <CheckCircle /> : null} {/* Generic icon for other checklist items */}
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
