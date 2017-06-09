import React from 'react';
import { connect } from 'dva';
import CountryList from "../components/content/area.content";

function IndexContentPage({dispatch,data,loading,params}) {
  return (
    <CountryList 
      dispatch={dispatch} 
      id={params.id} 
      options={data.areaOptions || null} 
      defaultValues={data.defaultAreaValues || null}
      defaultInput = {data.defaultAreaInput || null}
      countryReport = {data.countryReport || null}
    />
  );
}

IndexContentPage.propTypes = {};

export default connect(({data,loading})=>{return {data,loading};})(IndexContentPage);