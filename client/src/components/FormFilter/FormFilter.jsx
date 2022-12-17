import { useState } from "react";
import s from "./FormFilter.module.scss";
import CsvDownloadButton from "react-json-to-csv";
import * as Api from "../../api/Api";

function FormFilter({ addClass, hash }) {
  const [jsonToCSV, setJSONToCSV] = useState([]);
  const [isEmpty, setIsEmpty] = useState(!1);
  const handleSubmit = async (e) => {
    let form = e.target,
      start = form.querySelector("#filterStart").value,
      end = form.querySelector("#filterEnd").value,
      hash = form.querySelector("#hash").value;

    e.preventDefault();

    Api.read(
      "leads",
      { start, end, hash },
      (e) => {
        console.log(e);
        setJSONToCSV(e);
        setIsEmpty(!1);
      },
      (e) => {
        setIsEmpty(!0);
      }
    );
  };
  const handleChange = () => {
    setJSONToCSV([]);
    setIsEmpty(!1);
  }

  return (
    <div className={addClass}>
      <h1>Descargar leads</h1>
      <form className={`${s.flex} ${s.formFilterContainer}`} onSubmit={handleSubmit}>
        <label className={s.filterText}>
          Fecha inicial:
          <input id="filterStart" className={s.filterItem} type="date" onChange={handleChange}/>
        </label>
        <label className={s.filterText}>
          Fecha final:
          <input id="filterEnd" className={s.filterItem} type="date" onChange={handleChange}/>
        </label>
        <input id="hash" type="hidden" name="hash" value={hash} />
        <button type="submit" className={s.btnDownloadLeads}>
          Preparar Excel
        </button>
        {jsonToCSV.length > 0 && (
          <CsvDownloadButton type="button" data={jsonToCSV} delimiter={","}>Descargar</CsvDownloadButton>
        )}
      </form>
      {isEmpty && <div className={s.isEmpty}>¡Sin resultados!</div>}
    </div>
  );
}

export default FormFilter;
