/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Pie from "./Pie";
import Bar from "./Bar";
import Line from "./Line";
import Area from "./Area";

function App() {

  var [measures, setMeasures] = useState([]);
  var [dimensions, setDimensions] = useState([]);
  var [filters, setFilters] = useState([]);
  var [filterDimension, setFilterDimension] = useState("Select Dimension");
  var [filterOperator, setFilterOperator] = useState("Select Operator");
  var [filterValue, setFilterValue] = useState("");

  const add = (e) => {
    if(e.target.name === "measures") {
      if(!measures.includes(e.target.innerText)) {
        setMeasures((prevItems) => ([...prevItems, e.target.innerText]));
      }
    }
    else if(e.target.name === "dimensions"){
      if(!dimensions.includes(e.target.innerText)) {
        setDimensions((prevItems) => ([...prevItems, e.target.innerText]));
      }
    }
    else {
      setFilterDimension(e.target.innerText);
    }
  }

  const changeOperator = (e) => {
    setFilterOperator(e.target.innerText);
  } 

  const changeFilterValue = (e) => {
    setFilterValue(e.target.value);
  }

  const addFilter = () => {
    const filter = {
      dimension: filterDimension,
      operator: filterOperator,
      values: [filterValue]
    }
    setFilters((prevItems) => ([...prevItems, filter]));
    setFilterDimension("Select Dimension");
    setFilterOperator("Select Operator");
    setFilterValue("");
  }

  const createMeasure = (props, index) => {
    const remove = () => {
      var temp = [...measures];
      var index = temp.indexOf(props);
      if(index !== -1) {
        temp.splice(index, 1);
        setMeasures(temp);
      }
    }
    return <div className="container top" key={index}>
      <li> 
        <span className="right"> {props} </span>
        <button onClick={remove}> Delete </button>
      </li>
    </div>
  }

  const createDimension = (props, index) => {
    const remove = () => {
      var temp = [...dimensions];
      var index = temp.indexOf(props);
      if(index !== -1) {
        temp.splice(index, 1);
        setDimensions(temp);
      }
    }
    return <div className="container top" key={index}>
      <li> 
      <span className="right"> {props} </span>
        <button onClick={remove}> Delete </button>
      </li>
    </div>
  }

  const createFilter = (props, index) => {
    const remove = () => {
      var temp = [...filters];
      var index = temp.indexOf(props);
      if(index !== -1) {
        temp.splice(index, 1);
        setFilters(temp);
      }
    }
    return <div className="container top" key={index}>
      <li> 
        <span className="right"> {props.dimension} </span>
        <span className="right"> {props.operator} </span>
        {props.values.map((value) => {return <span className="right"> {value} </span>})}
        <button onClick={remove}> Delete </button>
      </li>
  </div>
  }

  return (<div className="container">
    <div className="dropdown top">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select Measures
      </button>
      <div
        className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" name="measures" onClick={add}> ProductsPrices.cost </a>
          <a className="dropdown-item" href="#" name="measures" onClick={add}> ProductsPrices.numberOfOrders </a>
      </div>
      {measures.map(createMeasure)}
    </div>
    <div className="dropdown top">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select Dimensions
      </button>
      <div
        className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" name="dimensions" onClick={add}> Products.name </a>
          <a className="dropdown-item" href="#" name="dimensions" onClick={add}> ProductsPrices.city </a>
      </div>
      {dimensions.map(createDimension)}
    </div>
    <h6 className="top">Filters: </h6>
    <span className="dropdown top right">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {filterDimension}
      </button>
      <div
        className="dropdown-menu right" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" name="filters" onClick={add}> ProductsPrices.cost </a>
          <a className="dropdown-item" href="#" name="filters" onClick={add}> ProductsPrices.numberOfOrders </a>
          <a className="dropdown-item" href="#" name="filters" onClick={add}> Products.name </a>
          <a className="dropdown-item" href="#" name="filters" onClick={add}> ProductsPrices.city </a>
      </div>
    </span>
    <span className="dropdown top right">
      <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {filterOperator}
      </button>
      <div
        className="dropdown-menu right" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> equals </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> notEquals </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> set </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> notSet </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> gt </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> gte </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> lt </a>
          <a className="dropdown-item" href="#" name="filters" onClick={changeOperator}> lte </a>
      </div>
    </span>
    <span>
      <input type="search" onChange={changeFilterValue}/>
    </span>
    <span>
    <button onClick={addFilter}> add filter </button>
    </span>
    {filters.map(createFilter)}
    <div className="space center">
      <h2> Area Chart </h2>
      <Area
        key = {4}
        measures = {measures}
        dimensions = {dimensions}
        filters = {filters}
      />
    </div>
    <div className="space center">
      <h2> Bar Chart </h2>
      <Bar
        key = {2}
        measures = {measures}
        dimensions = {dimensions}
        filters = {filters}
      />
    </div>
    <div className="space center">
      <h2> Line Chart </h2>
      <Line
        key = {3}
        measures = {measures}
        dimensions = {dimensions}
        filters = {filters}
      />
    </div>
    <div className="space center">
      <h2> Pie Chart </h2>
      <Pie
      key = {4}
        measures = {measures}
        dimensions = {dimensions}
        filters = {filters}
      />
    </div>
  </div>);
}
  

export default App;