import s from "./Leads.module.scss";
import FormLogin from "../../components/FormLogin/FormLogin";

function Leads() {
  return (
    <div className={s.leadsContainer}>
      <FormLogin />
    </div>
  );
}

export default Leads;
