// my-app/src/components/WorkerPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { grid } from "@assets/index";
import { Button, HeaderTitle } from "@shared/components";
import { GetJWTToken } from "@utils/index";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  ButtonLINKClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

import { Schedule } from "./types/scheduler.types";
import { fetchWorkers } from "@features/WorkerPage/stores/workerSlice";

const TableHeaders = ({ className }: any) => {
  return (
    <thead className={className}>
      <tr className="">
        <th className={className}>ID</th>
        <th className={className}>NAME</th>
        <th className={className}>RESTAURANT ID</th>
      </tr>
    </thead>
  );
};

const TableRowComponent = ({ worker }: { worker: Schedule }) => {
  return (
    <tr key={worker.id}>
      <td>{worker.id}</td>
      <td>{worker.name}</td>
      <td className="text-center">{worker.restaurantId}</td>
    </tr>
  );
};

const SchedulerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const workers = useSelector((state: any) => state.workers.workers);

  useEffect(() => {
    const token = GetJWTToken();
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { error: "Invalid or expired token" },
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Scheduler")}
        className={PageHeaderClasses}
        title="SCHED0ULER - OPERATIONAL TASKS"
      />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl ">
          <TableHeaders className="font-extralight border-b-2" />
          <tbody className="items-center justify-center">
            {workers &&
              workers.map((worker: Worker) => (
                <TableRowComponent key={worker.id} worker={worker} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-15 flex flex-wrap flex-col">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">
          BACK TO HOME
        </Button>
        <Button
          Icon={GetIcon("404")}
          className={ButtonLINKClasses}
          onClick={() => {
            handleError(new Error("Simulated error"));
          }}
        >
          SIMULATE ERROR
        </Button>
      </div>
    </div>
  );
};

export default SchedulerPage;
