"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import {
  findModulesForCourse,
  createModuleForCourse,
  deleteModule as deleteModuleServer,
  updateModule as updateModuleServer,
} from "../../../courses/client";

interface Lesson {
  _id: string;
  name: string;
}

interface CourseModule {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const modulesState = useSelector((state: RootState) => state.modulesReducer);
  const modules = (modulesState as unknown as { modules: CourseModule[] })
    .modules;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchModules = async () => {
      const serverModules = await findModulesForCourse(cid as string);
      dispatch(setModules(serverModules));
    };
    fetchModules();
  }, [cid, dispatch]);

  const handleAddModule = async () => {
    const newModule = await createModuleForCourse(cid as string, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule({ name: newModule.name, course: newModule.course }));
    const serverModules = await findModulesForCourse(cid as string);
    dispatch(setModules(serverModules));
    setModuleName("");
  };

  const handleDeleteModule = async (moduleId: string) => {
    await deleteModuleServer(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const handleUpdateModule = async (module: CourseModule) => {
    await updateModuleServer(module._id, module);
    dispatch(updateModule(module));
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: CourseModule) => module.course === cid)
          .map((module: CourseModule) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value }),
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={handleDeleteModule}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
