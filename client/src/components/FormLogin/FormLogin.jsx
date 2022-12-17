import { useState } from "react";
import s from "./FormLogin.module.scss";
import * as Api from "../../api/Api";
import FormFilter from "../../components/FormFilter/FormFilter";

function FormLogin() {
  const [showLeads, setShowLeads] = useState(!1);
  const [errorLogin, setErrorLogin] = useState("");
  const [hash, setHash] = useState("");

  const handleSubmitLogin = (e) => {
    let form = e.target,
      username = form.querySelector("#username").value,
      password = form.querySelector("#password").value;

    e.preventDefault();
    Api.get(
      "verify",
      { username, password },
      (e) => {
        setHash(e.hash);
        setShowLeads(!0);
        setErrorLogin("");
      },
      function (e) {
        setErrorLogin(e);
      }
    );
  };

  return (
    <div className={`${s.flex} ${s.leadsContainer}`}>
      {!showLeads ? (
        <form className={s.flex} onSubmit={handleSubmitLogin}>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Usuario"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
          />
          <button type="submit" className={s.btnDownloadLeads}>
            Validar
          </button>
        </form>
      ) : (
        <FormFilter addClass={`${s.flex} ${s.leadsContainer}`} hash={hash} />
      )}
      {errorLogin && <div className={s.errorLogin}>{errorLogin}</div>}
    </div>
  );
}

export default FormLogin;
