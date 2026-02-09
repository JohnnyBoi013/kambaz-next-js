import { FaCheckCircle } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";

export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <FaCheckCircle className="text-success me-2" />
      <FaEllipsisV />
    </div>
  );
}
