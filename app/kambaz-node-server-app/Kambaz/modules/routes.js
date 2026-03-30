import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const findAllModules = (req, res) => {
    res.json(dao.findAllModules());
  };

  const findModuleById = (req, res) => {
    const { mid } = req.params;
    const module = dao.findModuleById(mid);
    if (!module) {
      res.status(404).json({ message: "Module not found" });
      return;
    }
    res.json(module);
  };

  const updateModule = (req, res) => {
    const { mid } = req.params;
    const updated = dao.updateModule(mid, req.body);
    if (!updated) {
      res.status(404).json({ message: "Module not found" });
      return;
    }
    res.json(updated);
  };

  const deleteModule = (req, res) => {
    const { mid } = req.params;
    const deleted = dao.deleteModule(mid);
    if (!deleted) {
      res.status(404).json({ message: "Module not found" });
      return;
    }
    res.json(deleted);
  };

  app.get("/api/modules", findAllModules);
  app.get("/api/modules/:mid", findModuleById);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}
