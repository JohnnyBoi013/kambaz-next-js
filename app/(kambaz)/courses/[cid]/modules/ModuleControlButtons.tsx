import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <FaCheckCircle className="text-success me-2" />
      <FaPlus className="me-2" />
      <FaEllipsisV className="me-2" />
    </div>
  );
}
