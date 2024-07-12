import { Icons } from "../../assets/icons/icons.tsx";
import s from "./404.module.scss";
import { Button } from "../ui/button/button.tsx";
import { useNavigate } from "react-router-dom";
import {Path} from "../../routes/pathRoute.tsx";

export const NotFound = () => {
  const navigate = useNavigate();

  const onClickGoHome = () => {
    navigate(Path.Movies);
  };

  return (
    <div className={s.root}>
      <div className={s.icon}>
        <Icons iconId={"sidebar"} />
        <span className={s.sidebarTitle}>ArrowFlicks</span>
      </div>
      <div className={s.content}>
        <Icons
          viewBox={"0 0 656 196"}
          height={"196"}
          width={"656"}
          iconId={"404"}
        />
        <p className={s.title}>We can’t find the page you are looking for</p>
        <Button children={"Go Home"} onClick={onClickGoHome} />
      </div>
    </div>
  );
};
