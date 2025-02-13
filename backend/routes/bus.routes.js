import { handleSocketEvents } from "../controllers/bus.controller.js";

const busRoutes = (io) => {
    handleSocketEvents(io);
};

export default busRoutes;