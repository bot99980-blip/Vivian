import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="notfound">
      <Link className="notfound__text" to="/">
        {" "}
        Эта страница не существует, либо не готова
      </Link>
    </div>
  );
};
